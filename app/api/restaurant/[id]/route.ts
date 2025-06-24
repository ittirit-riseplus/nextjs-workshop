import { NextRequest, NextResponse } from "next/server";

const API = "https://6847f11dec44b9f3493ee59a.mockapi.io/restaurants";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  console.log("GET /api/restaurant/[id]", id);

  const res = await fetch(`${API}/${id}`);
  if (!res.ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
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
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
