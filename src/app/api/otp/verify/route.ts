import { proxyToApi } from "@/lib/apiProxy";

export async function POST(req: Request) {
  const res = await proxyToApi(req, "/api/auth/verify-otp");
  return res;
}
