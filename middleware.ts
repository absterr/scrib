import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = new Set([
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
]);

const EXCLUDES = [
  "api",
  "_next/static",
  "_next/image",
  "favicon.ico",
  ".*\\.(png|jpg|jpeg|svg|gif|ico|webp|avif)$",
];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.has(pathname);

  if (!sessionCookie) {
    if (isAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [`/((?!${EXCLUDES.join("|")}).*)`],
};
