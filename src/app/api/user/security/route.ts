import { proxyToApi } from "@/lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await proxyToApi(req, BACKEND_API_ENDPOINTS.USER_SECURITY);

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || "Failed to fetch security information" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Security endpoint error:", error);
    return NextResponse.json(
      { message: "Failed to fetch security information" },
      { status: 500 },
    );
  }
}
