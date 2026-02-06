import { proxyToApi } from "@/lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const url = new URL(req.url);

  // Check if the path ends with /faculties
  if (url.pathname.endsWith("/faculties")) {
    const res = await proxyToApi(
      req,
      BACKEND_API_ENDPOINTS.INSTITUTION_FACULTIES(code),
      {
        skipVersionPrefix: true,
      },
    );
    return res;
  }

  // Return 404 for other paths
  return new Response("Not Found", { status: 404 });
}
