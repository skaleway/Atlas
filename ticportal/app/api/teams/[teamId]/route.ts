import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const { teamId } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized.", { status: 400 });
    }

    if (!teamId) {
      return new NextResponse("Invalid Url", { status: 404 });
    }

    const user = await db.user.findFirst({
      where: {
        userId,
      },
    });

    const team = await db.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!team) {
      return new NextResponse("Team not found", { status: 404 });
    }

    if (user?.role === "ADMIN" || team?.profileId === user?.id) {
      await db.team.delete({
        where: {
          id: teamId,
        },
      });

      return new NextResponse("Team deleted successfully", { status: 200 });
    }

    return new NextResponse("Unauthorized.", { status: 400 });
  } catch (error: any) {
    console.error("[ERROR WHILE DELETING]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const { teamId } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized.", { status: 400 });
    }

    if (!teamId) {
      return new NextResponse("Invalid Url", { status: 404 });
    }

    const team = await db.team.findUnique({
      where: {
        id: teamId,
      },include:{
        members:true
      }
    });

    if (!team) {
      return new NextResponse("Team not found", { status: 404 });
    }

    return NextResponse.json(team, { status: 200 });
  } catch (error: any) {
    console.error("[ERROR WHILE DELETING]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const { teamId } = params;
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized.", { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        userId,
      },
    });

    if (!teamId) {
      return new NextResponse("Invalid Url", { status: 404 });
    }

    const team = await db.team.findUnique({
      where: {
        id: teamId,
      },
      select: {
        members: true,
        profileId: true,
        id: true,
      },
    });

    if (!team) {
      return new NextResponse("Team not found", { status: 404 });
    }

    const teamMembers = team.members.filter(
      (teamMember) => teamMember.role === "ADMIN"
    );

    if (user?.role === "ADMIN" || team.profileId === user?.id || teamMembers) {
      await db.team.update({
        where: {
          id: team?.id,
        },
        data: {
          ...body,
        },
      });

      return NextResponse.json("Profile Updated", { status: 200 });
    } else {
      return NextResponse.json("Unathorized", { status: 400 });
    }
  } catch (error: any) {
    console.error("[ERROR WHILE DELETING]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
