import { proxyToApi } from "../../../lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function POST(req: Request) {
  // forwards request to upstream `signup` endpoint
  const res = await proxyToApi(req, BACKEND_API_ENDPOINTS.SIGNUP);
  return res;
}
