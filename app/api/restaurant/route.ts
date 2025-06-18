import { NextRequest, NextResponse } from "next/server";

const API = "https://6847f11dec44b9f3493ee59a.mockapi.io/restaurants";

export async function GET() {
  const res = await fetch(API);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

// Update (PUT)
export async function PUT(req: NextRequest) {
  const { id, ...body } = await req.json();
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

// Delete (DELETE)
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return NextResponse.json(data);
}
