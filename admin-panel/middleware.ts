import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  const res = NextResponse.next();
  res.cookies.set("tenant", subdomain, { path: "/" });
  return res;
}

export const config = {
  matcher: ["/((?!admin|api).*)"], // Middleware za sve osim admin i api
};
