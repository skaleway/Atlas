import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function DELETE(req:Request, { params }: { params: {  questionId:string} }) {
    try {
      const { questionId} = params;
  
      if (!questionId) {
        return new NextResponse("Invalid Url", { status: 404 });
      }
  
      await db.question.delete({
        where: {
          id: questionId,
        },
      });
  
      console.log(questionId, "questionId")

      return NextResponse.json("Quiz deleted successfully", { status: 200 });
    } catch (error: any) {
      console.log("DELETING QUIZ", error.message);
      return NextResponse.json("Internal server error!", { status: 500 });
    }
  }