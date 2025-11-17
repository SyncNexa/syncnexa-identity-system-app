import { proxyToApi } from "../../../lib/apiProxy";

export async function POST(req: Request) {
  // forwards request to upstream `login` endpoint
  const res = await proxyToApi(req, "/login");
  return res;
}
