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

type PostOptions<TRes> = {
  headers?: Record<string, string>;
  optimisticData?: TRes | null; // set optimistic data immediately
  retry?: number; // number of retries on failure
  retryDelay?: number; // ms between retries
  rawResponse?: boolean; // if true, return Response instead of parsed json
};

type UsePostReturn<TRes, TReq> = {
  loading: boolean;
  data: TRes | null;
  error: Error | null;
  post: (body?: TReq, opts?: PostOptions<TRes>) => Promise<TRes | null>;
  reset: () => void;
  abort: () => void;
  setData: (d: TRes | null) => void;
};

export default function usePost<TRes = any, TReq = any>(
  endpoint: string
): UsePostReturn<TRes, TReq> {
  const [data, setData] = useState<TRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endpointRef = useRef<string>(endpoint);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    abort();
    setData(null);
    setError(null);
    setLoading(false);
  }, [abort]);

  const post = useCallback(
    async (body?: TReq, opts?: PostOptions<TRes>) => {
      endpointRef.current = endpoint;
      const url = resolveEndpoint(endpointRef.current);
      const controller = new AbortController();
      abortRef.current = controller;

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

      const perform = async (): Promise<TRes | null> => {
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

          setData(parsed as TRes);
          setError(null);
          return parsed as TRes;
        } catch (err) {
          if ((err as any)?.name === "AbortError") {
            // aborted
            throw err;
          }
          // rethrow to allow retry logic
          throw err;
        }
      };

      // retry loop
      let attempts = 0;
      let lastError: any = null;
      while (attempts <= retry) {
        try {
          const result = await perform();
          setLoading(false);
          return result;
        } catch (err) {
          lastError = err;
          attempts += 1;
          if (attempts > retry) break;
          // wait
          await new Promise((r) => setTimeout(r, retryDelay));
        }
      }

      // failed after retries
      setError(
        lastError instanceof Error ? lastError : new Error(String(lastError))
      );
      // rollback optimistic update
      if (typeof optimisticData !== "undefined" && optimisticData !== null) {
        setData(previous ?? null);
      }
      setLoading(false);
      return null;
    },
    [data, endpoint]
  );

  return { loading, data, error, post, reset, abort, setData };
}
