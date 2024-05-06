

import { db } from "@/lib/db"

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs";

export async function GET(req: Request, { params }: { params: { stageId: string, userId: string } }) {
    try {
      const { stageId, userId } = params;
  
      if (!userId) {
        console.log(userId)
        return new NextResponse("Unauthorized", { status: 400 })
      }
  
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (user) {
        let scores = await db.quizScore.findFirst({
          where: {
            stageId: stageId,
            userId: user.id,
          },
        });
  
        if (!scores) {
          scores = await db.quizScore.create({
            data: {
              stageId: stageId,
              userId: user.id,
              score: 0,
            },
          });
        }
  
        return NextResponse.json(scores);
      }
  
      return new NextResponse("Invalid URL", { status: 404 });
    } catch (e: any) {
      console.log(e);
      return new NextResponse("Internal Server error", { status: 500 });
    }
  }