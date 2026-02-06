import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_ROUTES } from "./routes/paths";

const ACCESS_TOKEN_KEY = "syncnexa_access_token";

/**
 * Proxy-style middleware replacement file.
 * Handles authentication guard for dashboard routes.
 * Redirects unauthenticated users to login page.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore Next internals, API routes and static assets (so public/* files are served)
  // - Next internals: /api, /_next, /static
  // - favicon and any requests that look like static files (have an extension)
  const isStaticFile = /\.[a-zA-Z0-9]+$/.test(pathname);
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    isStaticFile
  ) {
    return NextResponse.next();
  }

  // Public pages that don't require auth
  const publicPaths = [
    "/login",
    "/signup",
    "/",
    "/about",
    "/signup/verify",
    "/session-expired",
  ];
  if (publicPaths.includes(pathname)) return NextResponse.next();

  // AuthGuard: Check authentication for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const accessToken = req.cookies.get(ACCESS_TOKEN_KEY)?.value;

    if (!accessToken) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      // Add redirect parameter to return user to the page they were trying to access
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // run for all pages except API/_next/static — keep matcher broad
    "/((?!api|_next|static|favicon.ico).*)",
  ],
};
