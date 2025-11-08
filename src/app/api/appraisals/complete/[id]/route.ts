import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-api.com";

interface Params {
  id: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Params> },
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${API_BASE_URL}/api/v1/appraisals/complete/${id}`,
      {
        method: "POST",
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

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Appraisal API error:", error);

    return NextResponse.json(
      { error: "Failed to update appraisal" },
      { status: 500 },
    );
  }
}
