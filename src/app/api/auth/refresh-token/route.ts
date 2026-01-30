import { NextResponse } from "next/server";
import { proxyToApi } from "@/lib/apiProxy";
import { authCookies } from "@/lib/authCookies";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function POST(req: Request) {
  const refreshToken = await authCookies.getRefreshToken();

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token required" },
      { status: 400 },
    );
  }

  try {
    const proxyReq = new Request(req.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const res = await proxyToApi(proxyReq, BACKEND_API_ENDPOINTS.REFRESH_TOKEN);
    const text = await res.text();

    try {
      const json = JSON.parse(text);
      const accessToken = json?.data?.accessToken;
      if (res.ok && accessToken) {
        await authCookies.setAccessToken(accessToken);
      }
    } catch {
      // ignore non-json responses
    }

    return new NextResponse(text, {
      status: res.status,
      headers: res.headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to refresh access token" },
      { status: 500 },
    );
  }
}
