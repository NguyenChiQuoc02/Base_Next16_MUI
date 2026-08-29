import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_KEYS } from "@/constants/cookies";
import { ROUTES } from "@/constants/routes";

const AUTH_PAGES: string[] = [ROUTES.LOGIN, ROUTES.REGISTER];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const isAuthenticated = Boolean(token);

  if (pathname === ROUTES.HOME) {
    return NextResponse.redirect(
      new URL(isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN, request.url)
    );
  }

  if (AUTH_PAGES.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(ROUTES.DASHBOARD)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
