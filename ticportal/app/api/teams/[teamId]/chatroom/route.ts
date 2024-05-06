
import { NextResponse } from "next/server";


import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";


export async function POST(req: Request, { params }: { params: { teamId: string } }) {
  try {
     const { teamId } = params;

    if (!teamId) {
      return new NextResponse("Team ID is required", { status: 400 });
    }

    const team = await db.team.findUnique({ 
      where: { id: teamId },
      include: { members: true } 
    });
      console.log(team)

    if (!team) return new NextResponse("Team not found", { status: 404 });

    const chatRoom = await db.chatRoom.create({
      data: {
        teamId,
        members: {
          create: team.members.map(member => ({
            profileId: member.profileId,
            teamId: member.teamId,
            role: member.role,
          })),
        },
      },
    });

    return NextResponse.json(chatRoom);
  } catch (error: any) {
    console.log("[CREATE CHATROOM ERROR]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const chatRooms = await db.chatRoom.findMany({
      include: { members: true, team:true , Message:true},
    });

    return NextResponse.json(chatRooms);
  } catch (error: any) {
    console.log("[GET CHATROOMS ERROR]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}