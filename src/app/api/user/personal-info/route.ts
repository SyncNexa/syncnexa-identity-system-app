import { proxyToApi } from "@/lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await proxyToApi(
      req,
      BACKEND_API_ENDPOINTS.USER_PERSONAL_INFO,
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || "Failed to fetch personal information" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Personal info endpoint error:", error);
    return NextResponse.json(
      { message: "Failed to fetch personal information" },
      { status: 500 },
    );
  }
}
