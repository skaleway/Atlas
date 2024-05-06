import { NextResponse,NextRequest } from "next/server";
import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";


export async function GET() {
    try {
      
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized.", { status: 400 });
        }

    const paidUsers = await db.user.findMany({ where: { paid: true } });
    return new NextResponse(JSON.stringify(paidUsers), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('[ERROR GET PAID USERS]', error.message);
    return new NextResponse('Internal server error', { status: 500 });
  }
}