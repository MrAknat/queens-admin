import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-api.com";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/valuations/max-offer-configuration`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: request.headers.get("cookie") || "",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Max offer configuration API error:", error);

    return NextResponse.json(
      { error: "Failed to update max offer configuration" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/valuations/max-offer-configuration`,
      {
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Max offer configuration API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch max offer configuration" },
      { status: 500 },
    );
  }
}
