import { NextRequest, NextResponse } from "next/server";

const API = "https://6847f11dec44b9f3493ee59a.mockapi.io/restaurants";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("GET /api/restaurant/[id]", params.id);
  const { id } = params;
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return NextResponse.json(data);
}
