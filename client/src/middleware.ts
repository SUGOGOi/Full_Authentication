import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPaths = [
  "/auth/email-verification",
  "/auth/forgot-password",
  "/auth/login",
  "/auth/register",
  "/auth/resend-email-verification-otp",
  "/auth/reset-password",
];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const isAuthenticated = request.cookies.get("is_auth")?.value;

    if (isAuthenticated) {
      if (authPaths.includes(path)) {
        return NextResponse.redirect(new URL("/user/profile", request.url));
      }
    }

    if (!isAuthenticated && !authPaths.includes(path)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/auth/:path*"],
};
