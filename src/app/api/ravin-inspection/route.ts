import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/ravin-inspection/request-link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: request.headers.get("cookie") || "",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          message:
            errorData.message || `API request failed: ${response.status}`,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Ravin Inspection API error (POST):", error);
    return NextResponse.json(
      { message: "Failed to request inspection link" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const response = await fetch(
      `${API_BASE_URL}/api/v1/ravin-inspection/check-status?${searchParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: request.headers.get("cookie") || "",
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: `API request failed: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Ravin Inspection API error (GET):", error);
    return NextResponse.json(
      { message: "Failed to check inspection status" },
      { status: 500 },
    );
  }
}
