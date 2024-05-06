
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function DELETE(req:Request, { params }: { params: { quizId: string } }) {
    try {
      const { quizId } = params;
  
      if (!quizId) {
        return new NextResponse("Invalid Url", { status: 404 });
      }
  
      await db.stageQuiz.delete({
        where: {
          id: quizId,
        },
      });
  
      return NextResponse.json("Quiz deleted successfully", { status: 200 });
    } catch (error: any) {
      console.log("DELETING QUIZ", error.message);
      return NextResponse.json("Internal server error!", { status: 500 });
    }
  }