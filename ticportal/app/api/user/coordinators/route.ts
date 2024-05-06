import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const teams = await db.user.findMany({
      where: {
        NOT: {
          role: "PARTICIPANT",
        },
      },

      select: {
        username: true,
        role: true,
        email: true,
        id: true,
        userId: true,
      },
    });

    return NextResponse.json(teams, { status: 200 });
  } catch (error: any) {
    console.log("ERROR WHILE GETTING TEAMS", error.message);

    return new NextResponse("Internal server error", { status: 500 });
  }
}
