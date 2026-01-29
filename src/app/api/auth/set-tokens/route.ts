import { NextResponse } from "next/server";
import { authCookies } from "@/lib/authCookies";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accessToken, refreshToken, role } = body;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "Missing required tokens" },
        { status: 400 },
      );
    }

    // Set httpOnly cookies
    await authCookies.setTokens(accessToken, refreshToken, role);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to set auth cookies:", error);
    return NextResponse.json(
      { error: "Failed to set authentication cookies" },
      { status: 500 },
    );
  }
}
