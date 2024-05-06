
import { db } from "@/lib/db"

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs";

export async function POST(req: Request, { params }: { params: { stageId: string } }) {
    
    try {
        const { score,userId } = await req.json();

        const { stageId } = params
        
        if (!stageId) {
            return new NextResponse("Ivalide url", { status: 404 });

        }

        const doesStageExist = await db.stage.findUnique({
            where: {
                id: stageId,
            },
        });

        if (!doesStageExist) {
            return NextResponse.json("stage not found", {status:400})
        }

        
        await db.quizScore.create({
            data: {
                score,
                userId,
              stageId
            }
        })

        return NextResponse.json("Quiz Score Submitted successfully")
        
    }
    catch (error: any) {
        console.error(error)
        return NextResponse.json("Internal Server error!!")

    }

    
}

export async function DELETE(req:Request, {params}:{params:{stageId:string}} ) {

    
    try {

        const { stageId } = params

        if (!stageId) {
            return new NextResponse("invalide url", {status:404})
        }

        const deletescore = db.quizScore.delete({
            where: {
                id: stageId,
            }
        })

        return NextResponse.json("scores deleted successfully", {status:200})


        
    } catch (error:any) {
        console.error(error)
    }
}



export async function PUT(req: Request, { params }: { params: { stageId: string } }) {
  try {
    const { score, userId } = await req.json();
    const { stageId } = params;

    if (!userId || !stageId) {
      return new NextResponse("OOPS Invalid URL", { status: 404 });
    }

    let doesScoreExist = await db.quizScore.findFirst({
      where: {
        userId: userId,
        stageId: stageId,
      },
    });

    if (!doesScoreExist) {
      doesScoreExist = await db.quizScore.create({
        data: {
          userId: userId,
          stageId: stageId,
          score: score,
        },
      });
    } else {
      await db.quizScore.update({
        where: {
          id: doesScoreExist.id,
        },
        data: {
          score,
        },
      });
    }

    return new NextResponse("Quiz Score updated successfully");
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Internal Server error ooh !!");
  }
}



export async function GET(req: Request, { params }: { params: { stageId: string } }) {
  try {
    const { stageId } = params;
    const { userId } = await auth();

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
      const scores = await db.quizScore.findFirst({
        where: {
          stageId: stageId,
          userId: user.id,
        },
      });

      if (scores) {
        return NextResponse.json(scores);
      }
      return new NextResponse("Scores not found", { status: 400 });
    }

    return new NextResponse("Invalid URL", { status: 404 });
  } catch (e: any) {
    console.log(e); // Log the error message to identify the issue
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
