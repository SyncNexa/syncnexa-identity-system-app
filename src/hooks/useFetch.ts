"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type UseFetchReturn<T> = {
  loading: boolean;
  data: T | null;
  refetch: () => Promise<void>;
};

function resolveEndpoint(endpoint: string) {
  if (!endpoint) return "/api";
  if (endpoint.startsWith("/")) return endpoint;
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://"))
    return endpoint;
  return `/api/${endpoint}`;
}

export default function useFetch<T = any>(
  endpoint: string,
  initialValue?: T
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(initialValue ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);
  const endpointRef = useRef<string>(endpoint);

  const fetchData = useCallback(async () => {
    const url = resolveEndpoint(endpointRef.current);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`);
      const json = (await res.json()) as T;
      setData(json);
    } catch (err) {
      if ((err as any)?.name === "AbortError") {
        // ignore
      } else {
        // keep silent here; consumer can handle missing data
        // but log for debugging
        // eslint-disable-next-line no-console
        console.error("useFetch error:", err);
      }
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

  return { loading, data, refetch };
}
