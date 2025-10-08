import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = new Set([
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
]);
const leadRoutes = new Set(["/", "/pricing"]);

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.has(pathname);
  const isLeadRoute = leadRoutes.has(pathname);

  if (!sessionCookie) {
    if (isAuthRoute || isLeadRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/",
    "/n",
    "/chat",
    "/invite/:id*",
    "/account",
    "/billing",
    "/pricing",
  ],
};
