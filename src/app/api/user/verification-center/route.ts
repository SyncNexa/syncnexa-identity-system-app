import { NextRequest, NextResponse } from "next/server";
import { proxyToApi } from "@/lib/apiProxy";

export async function GET(req: NextRequest) {
  try {
    return await proxyToApi(req, "/user/verification-center");
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch verification center data" },
      { status: 500 },
    );
  }
}
