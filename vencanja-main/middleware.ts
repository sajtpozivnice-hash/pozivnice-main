import { NextResponse, type NextRequest } from "next/server";
// Relative imports only — Vercel Edge does not resolve `@/` in middleware.
import { updateSession } from "./lib/supabase/middleware";
import {
  getInvitationSubdomain,
  getRequestHost,
  INVITATION_SITE_HEADER,
} from "./lib/domain";

/** Paths that exist under /sites/[site] besides the invitation root. */
const TENANT_NESTED_ALLOWLIST = [/^\/upload(?:\/|$)/];

function buildSitePath(subdomain: string, pathname: string): string {
  const siteRoot = `/sites/${subdomain}`;

  if (pathname === "/sites" || pathname.startsWith("/sites/")) {
    const rest = pathname.replace(/^\/sites\/[^/]+/, "") || "/";
    if (rest === "/" || rest === "") return siteRoot;
    return `${siteRoot}${rest}`;
  }

  if (pathname === "/" || pathname === "") {
    return siteRoot;
  }

  if (TENANT_NESTED_ALLOWLIST.some((re) => re.test(pathname))) {
    return `${siteRoot}${pathname}`;
  }

  return siteRoot;
}

function rewriteToSite(
  request: NextRequest,
  subdomain: string,
  pathname: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = buildSitePath(subdomain, pathname);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(INVITATION_SITE_HEADER, subdomain);

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}

export async function middleware(request: NextRequest) {
  const host = getRequestHost(request.headers);
  const subdomain = getInvitationSubdomain(host);
  const { pathname } = request.nextUrl;

  if (!subdomain && (pathname === "/sites" || pathname.startsWith("/sites/"))) {
    const home = request.nextUrl.clone();
    home.pathname = "/";
    home.search = "";
    return NextResponse.redirect(home);
  }

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/auth/")
  ) {
    return updateSession(request);
  }

  if (subdomain) {
    const response = rewriteToSite(request, subdomain, pathname);
    return updateSession(request, response);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?|ttf|eot)$).*)",
  ],
};
