/**
 * Server-side helper to proxy requests to an upstream API server.
 * Uses `process.env.API_SERVER_BASE_URL` as the upstream base URL.
 */
import { NextRequest } from "next/server";

export async function proxyToApi(req: Request | NextRequest, path: string) {
  const base = process.env.API_SERVER_BASE_URL || "";
  const target = `${base.replace(/\/$/, "")}${
    path.startsWith("/") ? path : `/${path}`
  }`;

  // Clone headers from incoming request, but avoid overwriting host
  const headers = new Headers();
  try {
    // @ts-ignore - both Request and NextRequest have headers
    for (const [k, v] of req.headers) {
      if (k.toLowerCase() === "host") continue;
      headers.set(k, v as string);
    }
  } catch (e) {
    // ignore header copying issues
  }

  // Preserve body if present
  let body: BodyInit | undefined = undefined;
  try {
    const r = req as Request;
    if (r.method !== "GET" && r.method !== "HEAD") {
      const buf = await r.arrayBuffer();
      if (buf && buf.byteLength > 0) body = buf;
    }
  } catch (e) {
    // ignore
  }

  const res = await fetch(
    target +
      (typeof (req as Request).url === "string"
        ? new URL((req as Request).url).search
        : ""),
    {
      method: (req as Request).method || "GET",
      headers,
      body,
      // keep same credentials behavior; Next.js server fetch uses same-origin by default
    }
  );

  // Build a response copying status, headers and body
  const responseHeaders = new Headers();
  res.headers.forEach((value, key) => {
    responseHeaders.set(key, value);
  });
  const arrayBuffer = await res.arrayBuffer();
  return new Response(arrayBuffer, {
    status: res.status,
    headers: responseHeaders,
  });
}
