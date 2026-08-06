import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import {
  getInvitationSubdomain,
  getRequestHost,
  INVITATION_SITE_HEADER,
} from "@/lib/domain";

/** Paths that exist under /sites/[site] besides the invitation root. */
const TENANT_NESTED_ALLOWLIST = [/^\/admin(?:\/|$)/];

function buildSitePath(subdomain: string, pathname: string): string {
  const siteRoot = `/sites/${subdomain}`;

  // Wrong /sites/... on a tenant host always maps to this tenant
  if (pathname === "/sites" || pathname.startsWith("/sites/")) {
    const rest = pathname.replace(/^\/sites\/[^/]+/, "") || "/";
    if (rest === "/" || rest === "") return siteRoot;
    return `${siteRoot}${rest}`;
  }

  if (pathname === "/" || pathname === "") {
    return siteRoot;
  }

  // Allow known nested tenant routes (e.g. /admin → /sites/slug/admin)
  if (TENANT_NESTED_ALLOWLIST.some((re) => re.test(pathname))) {
    return `${siteRoot}${pathname}`;
  }

  // Unknown marketing/app paths on tenant → invitation home (avoid confusing 404)
  return siteRoot;
}

function rewriteToSite(request: NextRequest, subdomain: string, pathname: string) {
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

  // Apex / www: never expose internal /sites/* routes
  if (!subdomain && (pathname === "/sites" || pathname.startsWith("/sites/"))) {
    const home = request.nextUrl.clone();
    home.pathname = "/";
    home.search = "";
    return NextResponse.redirect(home);
  }

  // Tenant host → internal /sites/[subdomain] (browser URL stays on subdomain)
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
