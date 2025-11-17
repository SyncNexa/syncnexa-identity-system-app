import { proxyToApi } from "../../../lib/apiProxy";

export async function POST(req: Request) {
  // forwards request to upstream `signup` endpoint
  const res = await proxyToApi(req, "/signup");
  return res;
}
