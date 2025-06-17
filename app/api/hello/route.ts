
// app/api/hello/route.ts - API อย่างง่ายส่งข้อความ JSON
import { NextResponse } from 'next/server';

export async function GET() {
    // ส่งการตอบกลับเป็น JSON ด้วย NextResponse
    return NextResponse.json({ message: 'Hello, Next.js API!' });
}
