import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-api.com";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    console.log("🚀 ~ GET ~ searchParams:", searchParams);

    const response = await fetch(
      `${API_BASE_URL}/api/v1/reports?${searchParams}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: request.headers.get("cookie") || "",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Reports API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/api/v1/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify({
        ...body,
        ...(process.env.MOCK_API === "true" ? { isMockEnabled: true } : {}),
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Reports API error:", error);

    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 },
    );
  }
}
