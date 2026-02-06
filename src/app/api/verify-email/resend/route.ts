import { proxyToApi } from "../../../../lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function POST(req: Request) {
  // forwards request to upstream `verify-email/resend` endpoint
  const res = await proxyToApi(req, BACKEND_API_ENDPOINTS.VERIFY_EMAIL_RESEND);
  return res;
}
