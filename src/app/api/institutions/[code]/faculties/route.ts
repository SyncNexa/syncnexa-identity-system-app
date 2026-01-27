import { proxyToApi } from "@/lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  // This endpoint lives directly (no /api/v1 prefix)
  const res = await proxyToApi(
    req,
    BACKEND_API_ENDPOINTS.INSTITUTION_FACULTIES(code),
    {
      skipVersionPrefix: true,
    },
  );
  return res;
}
