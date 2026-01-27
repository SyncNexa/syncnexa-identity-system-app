import { proxyToApi } from "@/lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function GET(req: Request) {
  // This endpoint lives directly at /universities (no /api/v1 prefix)
  const res = await proxyToApi(req, BACKEND_API_ENDPOINTS.UNIVERSITIES, {
    skipVersionPrefix: true,
  });
  return res;
}
