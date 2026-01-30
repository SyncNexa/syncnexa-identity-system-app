import { NextResponse } from "next/server";
import { proxyToApi } from "@/lib/apiProxy";
import { authCookies } from "@/lib/authCookies";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function POST(req: Request) {
  const refreshToken = await authCookies.getRefreshToken();
  const sessionId = await authCookies.getSessionId();

  if (!refreshToken || !sessionId) {
    await authCookies.clearTokens();
    return NextResponse.json(
      { error: "Missing session for logout" },
      { status: 400 },
    );
  }

  try {
    const proxyReq = new Request(req.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken, sessionId }),
    });

    const res = await proxyToApi(proxyReq, BACKEND_API_ENDPOINTS.LOGOUT);
    const text = await res.text();

    await authCookies.clearTokens();

    return new NextResponse(text, {
      status: res.status,
      headers: res.headers,
    });
  } catch (error: any) {
    await authCookies.clearTokens();
    return NextResponse.json(
      { error: error?.message || "Failed to logout" },
      { status: 500 },
    );
  }
}
