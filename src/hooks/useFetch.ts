"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const ABORT_TIMEOUT_MS = 30_000;
const ABORT_RETRY_LIMIT = 3;

function resolveEndpoint(endpoint: string) {
  if (!endpoint) return "/api";
  if (endpoint.startsWith("/")) return endpoint;
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://"))
    return endpoint;
  return `/api/${endpoint}`;
}

export default function useFetch<T = any>(
  endpoint: string,
  initialValue?: T,
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(initialValue ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endpointRef = useRef<string>(endpoint);

  const fetchData = useCallback(async () => {
    const url = resolveEndpoint(endpointRef.current);
    abortRef.current?.abort();
    setLoading(true);
    setError(null);
    setMessage(null);

    let abortRetries = 0;

    const runFetch = async () => {
      while (true) {
        const controller = new AbortController();
        abortRef.current = controller;
        let timedOut = false;
        const timeoutId = setTimeout(() => {
          timedOut = true;
          controller.abort();
        }, ABORT_TIMEOUT_MS);

        try {
          const res = await fetch(url, {
            method: "GET",
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
          });
          clearTimeout(timeoutId);
          if (!res.ok)
            throw new Error(`Failed to fetch ${url} (${res.status})`);
          const json = await res.json();

          // Handle APIResponse structure
          if (
            json &&
            typeof json === "object" &&
            "status" in json &&
            "data" in json
          ) {
            setStatus(json.status);
            setMessage(json.message || null);
            setData(json.data as T);
          } else {
            // Fallback for non-APIResponse format
            setData(json as T);
            // eslint-disable-next-line no-console
            console.debug("useFetch fallback:", {
              endpoint: url,
              response: json,
            });
          }
          setError(null);
          return;
        } catch (err) {
          clearTimeout(timeoutId);
          if ((err as any)?.name === "AbortError") {
            if (timedOut) {
              const reason = "Request timed out after 30s.";
              setMessage(reason);
              setError(new Error(reason));
              return;
            }

            abortRetries += 1;
            if (abortRetries <= ABORT_RETRY_LIMIT) {
              continue; // retry cancelled request
            }

            const reason =
              "Request was cancelled before completion. Retried 3 times without success.";
            setMessage(reason);
            setError(new Error(reason));
            return;
          }

          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          // eslint-disable-next-line no-console
          console.error("useFetch error:", err);
          return;
        }
      }
    };

    try {
      await runFetch();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    endpointRef.current = endpoint;
    fetchData();
    return () => abortRef.current?.abort();
  }, [endpoint, fetchData]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { loading, data, error, status, message, refetch };
}
