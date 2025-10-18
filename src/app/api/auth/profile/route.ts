import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-api.com";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.json(
        {
          success: false,
          message: "No authentication cookies found",
        },
        { status: 401 },
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/profile`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return NextResponse.json({
        success: true,
        user: userData.user || userData,
      });
    } else {
      const errorData = await response.json().catch(() => ({}));

      const nextResponse = NextResponse.json(
        {
          success: false,
          message: errorData.message || "Authentication failed",
        },
        { status: response.status },
      );

      const setCookieHeaders = response.headers.getSetCookie();
      setCookieHeaders.forEach((cookie) => {
        nextResponse.headers.append("Set-Cookie", cookie);
      });

      return nextResponse;
    }
  } catch (error) {
    console.error("Auth verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Authentication verification failed",
      },
      { status: 500 },
    );
  }
}
