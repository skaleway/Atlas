import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from '@clerk/nextjs/server';

interface Params {
    userId: string;
}

async function updateUserInClerk(userId: string, body: any): Promise<any> {
    try {
        return await clerkClient.users.updateUser(userId, body);
    } catch (error) {
        console.error("Error updating user in Clerk:", error);
        throw new Error("Error updating user in Clerk");
    }
}

async function updateUserInDatabase(userId: string, body: any): Promise<any> {
    return await db.user.update({
        where: {
            id: userId,
        },
        data: {
            ...body,
    },
    });
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const { userId: id } = params;
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized!", {
        status: 400,
      });
    }

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    const isAdmin = await db.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return new NextResponse("No user found!", {
        status: 404,
      });
    }

    if (id !== user.id || isAdmin?.role !== "ADMIN") {
      return new NextResponse("You can only update your profile!", {
        status: 400,
      });
    }

    try {
      const updatedUser = await db.user.update({
        where: {
          id,
        },
        data: {
          paid: true,
          
        },
      });

        await updateUserInClerk(userId, body);
        await updateUserInDatabase(userId, body);

      return new NextResponse(JSON.stringify(updatedUser), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error: any) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }
  } catch (error: any) {
    console.error("ERROR WHILE UPDATING USER", error.message);
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}

