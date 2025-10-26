import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-api.com";

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    });

    const nextResponse = NextResponse.json({ success: true });

    const setCookieHeaders = response.headers.getSetCookie();

    setCookieHeaders.forEach((cookie) => {
      nextResponse.headers.append("Set-Cookie", cookie);
    });

    return nextResponse;
  } catch (error) {
    console.error("Logout API error:", error);

    return NextResponse.json({ success: true });
  }
}
