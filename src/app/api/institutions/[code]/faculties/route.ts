import { proxyToApi } from "@/lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const res = await proxyToApi(
    req,
    BACKEND_API_ENDPOINTS.INSTITUTION_FACULTIES(code),
    {
      skipVersionPrefix: true,
    },
  );
  return res;
}
