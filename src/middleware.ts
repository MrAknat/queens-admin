import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    try {
      const accessToken = request.cookies.get("access_token")?.value;

      if (!accessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.error("Auth verification error in middleware:", error);

      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAuthRoute) {
    try {
      const cookieHeader = request.headers.get("cookie");

      if (cookieHeader) {
        const response = await fetch(
          `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/profile`,
          {
            method: "GET",
            headers: {
              Cookie: cookieHeader,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } catch (error) {
      console.error("Auth check error in middleware:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
