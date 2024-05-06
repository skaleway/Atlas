import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    const { userId } = auth();

    if (!userId) return NextResponse.json("Unauthorize!", { status: 400 });

    if (!name) return NextResponse.json("Name required", { status: 400 });

    const user = await db.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) return NextResponse.json("User not found", { status: 404 });

    const theHow = await db.userInfos.create({
      data: {
        name,
        profileId: user?.id,
      },
    });

    return NextResponse.json("created", { status: 200 });
  } catch (error: any) {
    console.log("CREATING HOW YOU KNEW US", error.message);
    return NextResponse.json("Internal server error!");
  }
}

export async function GET(req: Request) {
  try {
    const theHows = await db.userInfos.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(theHows, { status: 200 });
  } catch (error: any) {
    console.log("GETTING HOW YOU KNEW US", error.message);
    return NextResponse.json("Internal server error!");
  }
}
