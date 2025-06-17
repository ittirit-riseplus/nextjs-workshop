// app/api/users/route.ts - API Route สำหรับรายการผู้ใช้ (ดึงจาก mockapi.io)
import { NextResponse } from "next/server";

const API_URL = "https://6847f11dec44b9f3493ee59a.mockapi.io/user"; // ตัวอย่าง URL ของ mockapi.io

export async function GET() {
  // ดึงข้อมูลผู้ใช้ทั้งหมดจาก Mock API ภายนอก
  const res = await fetch(API_URL, { cache: "no-store" });
  const users = await res.json();
  return NextResponse.json(users); // ส่งรายการ users ในรูปแบบ JSON
}
