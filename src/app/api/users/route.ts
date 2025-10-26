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

    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";

    const apiUrl = new URL(`${API_BASE_URL}/api/v1/users`);

    apiUrl.searchParams.set("page", page);
    apiUrl.searchParams.set("limit", limit);

    if (search) {
      apiUrl.searchParams.set("search", search);
    }

    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      return NextResponse.json({
        success: true,
        users: data.users,
        total: data.users?.length,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      });
    } else {
      const errorData = await response.json().catch(() => ({}));

      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "Failed to fetch users",
        },
        { status: response.status },
      );
    }
  } catch (error) {
    console.error("Users API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
      },
      { status: 500 },
    );
  }
}
