"use client";
import { useCallback, useRef, useState } from "react";

type ResolveEndpointFn = (endpoint: string) => string;

const resolveEndpoint: ResolveEndpointFn = (endpoint) => {
  if (!endpoint) return "/api";
  if (endpoint.startsWith("/")) return endpoint;
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://"))
    return endpoint;
  return `/api/${endpoint}`;
};

const ABORT_TIMEOUT_MS = 30_000;
const ABORT_RETRY_LIMIT = 3;

export default function usePost<TRes = any, TReq = any>(
  endpoint: string,
): UsePostReturn<TRes, TReq> {
  const [data, setData] = useState<TRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endpointRef = useRef<string>(endpoint);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    abort();
    setData(null);
    setError(null);
    setStatus(null);
    setMessage(null);
    setLoading(false);
  }, [abort]);

  const post = useCallback(
    async (body?: TReq, opts?: PostOptions<TRes>) => {
      endpointRef.current = endpoint;
      const url = resolveEndpoint(endpointRef.current);

      const {
        headers = {},
        optimisticData = null,
        retry = 0,
        retryDelay = 300,
        rawResponse = false,
      } = opts || {};

      // optimistic update
      const previous = data;
      if (typeof optimisticData !== "undefined" && optimisticData !== null) {
        setData(optimisticData);
      }

      setLoading(true);
      setError(null);
      setMessage(null);

      let errorRetries = 0;
      let abortRetries = 0;
      let lastError: any = null;
      let handledError = false;

      while (true) {
        const controller = new AbortController();
        abortRef.current = controller;
        let timedOut = false;
        const timeoutId = setTimeout(() => {
          timedOut = true;
          controller.abort();
        }, ABORT_TIMEOUT_MS);

        try {
          let bodyToSend: any = undefined;
          const requestHeaders: Record<string, string> = { ...headers };

          if (body instanceof FormData) {
            bodyToSend = body as unknown as BodyInit;
            // let browser set Content-Type for FormData
          } else if (body !== undefined) {
            bodyToSend = JSON.stringify(body);
            requestHeaders["Content-Type"] =
              requestHeaders["Content-Type"] || "application/json";
          }

          const res = await fetch(url, {
            method: "POST",
            headers: requestHeaders,
            body: bodyToSend,
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`POST ${url} failed (${res.status}): ${text}`);
          }

          if (rawResponse) {
            // consumer expects raw Response but our return type is TRes | null
            // resolve as null (consumer can access response through other means if needed)
            setLoading(false);
            return null;
          }

          const contentType = res.headers.get("content-type") || "";
          let parsed: any = null;
          if (contentType.includes("application/json")) {
            parsed = await res.json();
          } else {
            parsed = await res.text();
          }

          // Handle APIResponse structure
          if (
            parsed &&
            typeof parsed === "object" &&
            "status" in parsed &&
            "data" in parsed
          ) {
            setStatus(parsed.status);
            setMessage(parsed.message || null);
            setData(parsed.data as TRes);
            setError(null);
            setLoading(false);
            return parsed.data as TRes;
          } else {
            // Fallback for non-APIResponse format
            setData(parsed as TRes);
            setError(null);
            setLoading(false);
            return parsed as TRes;
          }
        } catch (err) {
          clearTimeout(timeoutId);

          if ((err as any)?.name === "AbortError") {
            if (timedOut) {
              const reason = "Request timed out after 30s.";
              setMessage(reason);
              setError(new Error(reason));
              handledError = true;
              break;
            }

            abortRetries += 1;
            if (abortRetries <= ABORT_RETRY_LIMIT) {
              continue; // retry cancelled request
            }

            const reason =
              "Request was cancelled before completion. Retried 3 times without success.";
            setMessage(reason);
            setError(new Error(reason));
            handledError = true;
            break;
          }

          lastError = err;
          errorRetries += 1;
          if (errorRetries <= retry) {
            await new Promise((r) => setTimeout(r, retryDelay));
            continue;
          }
          break;
        }
      }

      // failed after retries
      if (!handledError) {
        setError(
          lastError instanceof Error ? lastError : new Error(String(lastError)),
        );
      }

      // rollback optimistic update
      if (typeof optimisticData !== "undefined" && optimisticData !== null) {
        setData(previous ?? null);
      }
      setLoading(false);
      return null;
    },
    [data, endpoint],
  );

  return { loading, data, error, status, message, post, reset, abort, setData };
}
