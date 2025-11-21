import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-api.com";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(`${API_BASE_URL}/api/v1/photos/upload`, {
      method: "POST",
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `API request failed: ${response.status} ${response.statusText}`,
        errorText,
      );
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Photo upload API error:", error);

    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 },
    );
  }
}
