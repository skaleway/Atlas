import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// export async function POST(
//   req: Request,
//   { params }: { params: { stageId: string } }
// ) {
//   try {
//     const { question, answers, correctAnswer } = await req.json();

//     const { stageId } = params;

//     if (!stageId) {
//       return new NextResponse("Invalid Url", { status: 404 });
//     }

    
//     const isExistingStage = await db.stage.findUnique({
//       where: {
//         id: stageId,
//       },
//     });

//     if (!isExistingStage) {
//       return NextResponse.json("Stage not found", { status: 404 });
//     }

    
//     if (!Array.isArray(answers)) {
//       return NextResponse.json("Answers must be an array", { status: 400 });
//     }

    
//     if (answers.length < 2) {
//       return NextResponse.json("Must provide at least two answer options", {
//         status: 400,
//       });
//     }


//     await db.stageQuiz.create({
//       data: {
//         question,
//         stageId,
//         answers,
//         correctAnswer,
//       },
//     });

//     return NextResponse.json("Created", { status: 200 });
//   } catch (error: any) {
//     console.log("CREATING new StageQuiz", error.message);
//     return NextResponse.json("Internal server error!", { status: 500 });
//   }
// }


export async function GET(req: Request, { params }: { params: { stageId: string } }) {
    try {
        const stage = await db.stage.findUnique({
            where: {
                id: params.stageId
            }
        })

        if (!stage) {
            return NextResponse.json({ message: "No Stage found" }, {
                status: 404
            })
        }

        if (stage) return NextResponse.json(stage, {
            status: 200
        })

        return NextResponse.json({}, {
            status: 200
        })

    } catch (error: any) {
        console.log("[ERROR FETCHING POST]", error.message);

        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}


export async function PUT(req: Request, { params }: { params: { stageId: string } }) {
    try {
        const body = await req.json()
        const updatedStage = await db.stage.update({
            where: {
                id: params.stageId
            },
            data: {
                ...body
            }
        })

        if (!updatedStage) {
            return new NextResponse("No Stage found" , {
                status: 404
            })
        }

        if (updatedStage) return NextResponse.json(updatedStage, {
            status: 200
        })

        return NextResponse.json({}, {
            status: 200
        })

    } catch (error: any) {
        console.log("[ERROR UPDATING STAGE]", error.message);

        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}


export async function DELETE(req: Request, { params }: { params: { stageId: string} }) {
    try {

        const deletedStage = await db.stage.delete({
            where: {
                id: params.stageId
            }
        })

        if (!deletedStage)
            return new NextResponse("Stage to be deleted not found", {
                status: 404
            })

        return NextResponse.json(deletedStage, { status: 200 })
    }
    catch (error: any) {
        console.log("[ERROR DELETING STAGE]", error.message);

        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}


// export async function GET(req: Request, { params }: { params: { stageId: string } }) {

//   try {
//     const { stageId } = params;

//     if (!stageId) {
//       return new NextResponse("Invalid Url", { status: 404 });
//     }

//     const quizzes = await db.stageQuiz.findMany({
//       where: {
//         stageId,
//       },
//       data: {
//         questions,
          
//         },
//       },
//     });

//     return NextResponse.json(quizzes, { status: 200 });
//   } catch (error: any) {
//     console.log("GETTING QUIZZES FOR A STAGE", error.message);
//     return NextResponse.json("Internal server error!");
//   }
// }


// 659e85a89d2c643350a328ed