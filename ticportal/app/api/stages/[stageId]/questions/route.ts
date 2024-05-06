import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { stageId: string } }
) {
  try {
    const { question, description } = await req.json();

    const { stageId } = params;

    if (!stageId) {
      return new NextResponse("Invalid Url", { status: 404 });
    }

    const isExistingStage = await db.stage.findUnique({
      where: {
        id: stageId,
      },
    });

    if (!isExistingStage)
      return NextResponse.json("Stage not found", { status: 404 });

    await db.stageQuestion.create({
      data: {
        question,
        stageId,
        description,
      },
    });

    return NextResponse.json("Created", { status: 200 });
  } catch (error: any) {
    console.log("CREATING new Question", error.message);
    return NextResponse.json("Internal server error!");
  }
}

export async function GET(
  req: Request,
  { params }: { params: { stageId: string } }
) {
  try {
    const { stageId } = params;

    if (!stageId) {
      return new NextResponse("Invalid Url", { status: 404 });
    }

    const questions = await db.stageQuestion.findMany({
      where: {
        stageId,
      },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error: any) {
    console.log("GETTING QUESTIONS FOR A STAGE", error.message);
    return NextResponse.json("Internal server error!");
  }
}
