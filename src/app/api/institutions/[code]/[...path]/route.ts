import { proxyToApi } from "@/lib/apiProxy";
import { BACKEND_API_ENDPOINTS } from "@/routes/paths";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string; path: string[] }> },
) {
  const { code, path } = await params;
  console.log("The path is here: ", path);

  // Handle /faculties endpoint
  if (path.length === 1 && path[0] === "faculties") {
    const res = await proxyToApi(
      req,
      BACKEND_API_ENDPOINTS.INSTITUTION_FACULTIES(code),
      {
        skipVersionPrefix: true,
      },
    );
    return res;
  }
  // Handle /programs endpoint
  if (path.length === 1 && path[0] === "programs") {
    const res = await proxyToApi(
      req,
      BACKEND_API_ENDPOINTS.INSTITUTION_PROGRAMS(code),
      {
        skipVersionPrefix: true,
      },
    );
    return res;
  }

  // Return 404 for other paths
  return new Response("Not Found", { status: 404 });
}
