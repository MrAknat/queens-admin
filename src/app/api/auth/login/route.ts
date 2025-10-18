import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-api.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body;

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      const nextResponse = NextResponse.json({
        success: true,
        user: data.user,
      });

      const setCookieHeaders = response.headers.getSetCookie();
      setCookieHeaders.forEach((cookie) => {
        nextResponse.headers.append("Set-Cookie", cookie);
      });

      return nextResponse;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Login failed",
        },
        { status: response.status },
      );
    }
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
