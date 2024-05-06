import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const questionId = params.questionId;

    const { questionAnswer, teamId, stageId } = await req.json();

    const existingAnswer = await db.questionAnswers.findFirst({
      where: {
        teamId,
        stageQuestionId: questionId,
      },
    });

    if (existingAnswer) {
      return NextResponse.json("Team has already answered this question", {
        status: 400,
      });
    }

    const stage = await db.stage.findUnique({
      where: {
        id: stageId,
      },
    });

    if (!stage)
      return NextResponse.json("Stage not found", {
        status: 404,
      });

    const question = await db.stageQuestion.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question)
      return NextResponse.json("The question you want to answer don't exist", {
        status: 404,
      });

    const createdAnswer = await db.questionAnswers.create({
      data: {
        teamId,
        answer: questionAnswer,
        stageQuestionId: questionId,
      },
    });

    return NextResponse.json(
      { createdAnswer, message: "Created answer" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("CREATE QUESTION ANSWER", error.message);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const questionId = params.questionId;

    const answer = await db.questionAnswers.findFirst({
      where: {
        stageQuestionId: questionId,
      },
    });

    return NextResponse.json(answer, { status: 200 });
  } catch (error: any) {
    console.log("GETTING QUESTION ANSWER", error.message);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const {
      questionAnswer,
      teamId,
      // stageId,
      questionId: id,
    } = await req.json();

    const questionId = params.questionId;

    const existingAnswer = await db.questionAnswers.findFirst({
      where: {
        teamId,
        stageQuestionId: questionId,
      },
    });

    if (!existingAnswer)
      return NextResponse.json(
        "You can only update questions that you've already answered.",
        {
          status: 404,
        }
      );

    const updatedAnswer = await db.questionAnswers.update({
      where: {
        id,
        // stageQuestionId: questionId,
      },
      data: {
        answer: questionAnswer,
      },
    });

    return NextResponse.json(updatedAnswer, { status: 200 });
  } catch (error: any) {
    console.log("GETTING QUESTION ANSWER", error.message);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
