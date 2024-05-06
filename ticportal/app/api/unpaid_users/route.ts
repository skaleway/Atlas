import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs";



export async function GET() {
  try {

    const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized.", { status: 400 });
        }

    const unpaidUsers = await db.user.findMany({ where: { paid: false } });
    return NextResponse.json(unpaidUsers, { status: 200 });
  } catch (error: any) {
    console.log("[ERROR WHILE GETTING UNPAID USERS]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
