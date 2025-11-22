import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy-style middleware replacement file.
 * Kept the same behavior as the previous `middleware.ts` but named `proxy.ts` per project update.
 * It redirects unauthenticated page requests (missing `token` cookie) to `/login`.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore Next internals and API routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public")
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
    "/dashboard",
    "/dashboard/*",
  ];
  if (publicPaths.includes(pathname)) return NextResponse.next();

  // Check for an auth cookie (named `token` here). Adjust as needed.
  const token = req.cookies.get("token")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // run for all pages except API/_next/static — keep matcher broad
    "/((?!api|_next|static|favicon.ico).*)",
  ],
};
