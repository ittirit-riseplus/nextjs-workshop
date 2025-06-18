// โฟลเดอร์: /app/api/login/route.ts
// Mock API login (POST)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  // Mock auth
  if (username === "admin" && password === "1234") {
    return NextResponse.json({ token: "mock-token-abc123" });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
