import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("spotify_token")?.value;

  if (!token && pathname !== "/login" && !pathname.includes("/callback")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/login"],
};
