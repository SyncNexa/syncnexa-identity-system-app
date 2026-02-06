import { proxyToApi } from "@/lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function POST(req: Request) {
  const res = await proxyToApi(req, BACKEND_API_ENDPOINTS.OTP_VERIFY);
  return res;
}
