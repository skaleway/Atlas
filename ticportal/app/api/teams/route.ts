import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    if (!name || !imageUrl) {
      return new NextResponse("This fields are required", { status: 400 });
    }

    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const team = await db.team.create({
      data: {
        name,
        imageUrl,
        level: 1,
        inviteCode: uuidV4(),
        profileId: profile.id,
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(team);
  } catch (error: any) {
    console.log("[CREATE TEAM ERROR", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const teams = await db.team.findMany({
      include: {
        members: true,
      },
    });

    return NextResponse.json(teams);
  } catch (error: any) {
    console.log("[CREATE TEAM ERROR", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
