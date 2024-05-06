import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
  { params }: { params: { stageId: string } }
) {
  try {
    const { questions } = await req.json();
    const { stageId } = params;

    if (!stageId) {
      return new NextResponse("Invalid Url", { status: 404 });
    }

    const isExistingStage = await db.stage.findUnique({
      where: {
        id: stageId,
      },
    });

    if (!isExistingStage) {
      return NextResponse.json("Stage not found", { status: 404 });
    }

    let stageQuiz = await db.stageQuiz.findFirst({
      where: {
        stageId,
      },
    });

    if (!stageQuiz) {
      stageQuiz = await db.stageQuiz.create({
        data: {
          stageId,
        },
      });

      const users = await db.user.findMany();

  for (const user of users) {
    await db.quizScore.create({
      data: {
        stageId,
        userId: user.id,
        score: 0,
      },
    });
  }

    }

    for (const question of questions) {
      const { text, answers, correctAnswer } = question;

      const createdQuestion = await db.question.create({
        data: {
          text,
          correctAnswer,
          quizId: stageQuiz.id,
        },
      });

      await db.answer.create({
        data: {
          text: JSON.stringify(answers),
          questionId: createdQuestion.id,
        },
      });
    }

    return NextResponse.json("Quiz created or updated successfully", { status: 200 });
  } catch (error: any) {
    console.log("CREATING new StageQuiz", error.message);
    return NextResponse.json("Internal server error!", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { stageId: string } }
) {
  try {
    const { questions } = await req.json();
    const { stageId } = params;

    if (!stageId) {
      return new NextResponse("Invalid Url", { status: 404 });
    }

    const existingStageQuiz = await db.stageQuiz.findFirst({
      where: {
        stageId,
      },
    });

    if (!existingStageQuiz) {
      return NextResponse.json("StageQuiz not found", { status: 404 });
    }

    for (const question of questions) {
      const { text, answers, correctAnswer, questionId } = question;

      if (questionId) {
        const existingQuestion = await db.question.findUnique({
          where: {
            id: questionId,
          },
          include: {
            answers: true,
          },
        });

        if (existingQuestion) {
          await db.question.update({
            where: {
              id: existingQuestion.id,
            },
            data: {
              text,
              correctAnswer,
              answers: {
                update: {
                  where: { id: existingQuestion.answers[0].id },
                  data: { text: JSON.stringify(answers) }, // Serialize the array to a string
                },
              },
            },
          });
        }
      } else {
        await db.question.create({
          data: {
            text,
            correctAnswer,
            quizId: existingStageQuiz.id, // Connect to the StageQuiz
            answers: {
              create: { text: JSON.stringify(answers) }, // Serialize the array to a string
            },
          },
        });
      }
    }

    return NextResponse.json("Updated", { status: 200 });
  } catch (error: any) {
    console.log("UPDATING StageQuiz", error.message);
    return NextResponse.json("Internal server error!", { status: 500 });
  }
}



// partially working
// export async function PUT(
//   req: Request,
//   { params }: { params: { stageId: string } }
// ) {
//   try {
//     const { questions } = await req.json();
//     const { stageId } = params;

//     if (!stageId) {
//       return new NextResponse("Invalid Url", { status: 404 });
//     }

//     const existingStageQuiz = await db.stageQuiz.findFirst({
//       where: {
//         stageId,
//       },
//     });

//     if (!existingStageQuiz) {
//       return NextResponse.json("StageQuiz not found", { status: 404 });
//     }

//     for (const question of questions) {
//       const { text, answers, correctAnswer, questionId } = question;

//       const existingQuestion = await db.question.findUnique({
//         where: {
//           id: questionId,
//         },
//         include: {
//           answers: true, // Include the related answers
//         },
//       });

//       if (existingQuestion) {
//         await db.question.update({
//           where: {
//             id: existingQuestion.id,
//           },
//           data: {
//             text,
//             correctAnswer,
//             answers: {
//               // Update the existing answers and create new ones if necessary
//               upsert: answers.map((answer) => ({
//                 where: { id: existingQuestion.answers.find((a) => a.text === answer)?.id },
//                 update: { text: answer },
//                 create: { text: answer },
//               })),
//             },
//           },
//         });
//       } else {
//         return NextResponse.json("Question not found", { status: 404 });
//       }
//     }

//     return NextResponse.json("Updated", { status: 200 });
//   } catch (error: any) {
//     console.log("UPDATING StageQuiz", error.message);
//     return NextResponse.json("Internal server error!", { status: 500 });
//   }
// }

// export async function PUT( req: Request, { params }: { params: { stageId: string } }
// ) {
//   try {
//     const { questions } = await req.json();
//     const { stageId } = params;

//     if (!stageId) {
//       return new NextResponse("Invalid Url", { status: 404 });
//     }

//     const existingStageQuiz = await db.stageQuiz.findFirst({
//       where: {
//         stageId,
//       },
//     });

//     if (!existingStageQuiz) {
//       return NextResponse.json("StageQuiz not found", { status: 404 });
//     }

//     for (const question of questions) {
//       const { text, answers, correctAnswer } = question;

//       const existingQuestion = await db.question.findFirst({
//         where: {
//           text: text,
//           quizId: existingStageQuiz.id,
//         },
//       });

//       if (existingQuestion) {
//         await db.question.update({
//           where: {
//             id: existingQuestion.id,
//           },
//           data: {
//             text,
//             correctAnswer,
//           },
//         });

//         for (const answer of answers) {
//           const existingAnswer = await db.answer.findFirst({
//             where: {
//               text: answer,
//               questionId: existingQuestion.id,
//             },
//           });

//           if (existingAnswer) {
//             await db.answer.update({
//               where: {
//                 id: existingAnswer.id,
//               },
//               data: {
//                 text: answer,
//               },
//             });
//           } else {
//             await db.answer.create({
//               data: {
//                 text: answer,
//                 questionId: existingQuestion.id,
//               },
//             });
//           }
//         }
//       } else {
//         const createdQuestion = await db.question.create({
//           data: {
//             text,
//             correctAnswer,
//             quizId: existingStageQuiz.id,
//           },
//         });

//         for (const answer of answers) {
//           await db.answer.create({
//             data: {
//               text: answer,
//               questionId: createdQuestion.id,
//             },
//           });
//         }
//       }
//     }

//     return NextResponse.json("Updated", { status: 200 });
//   } catch (error: any) {
//     console.log("UPDATING StageQuiz", error.message);
//     return NextResponse.json("Internal server error!", { status: 500 });
//   }
// }


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
//       select: {
//         id: true,
//         questions: true,
//           answers: true,
//        correctAnswer:true,
//         stageId: true,
//       },
//     });

//     return NextResponse.json(quizzes, { status: 200 });
//   } catch (error: any) {
//     console.log("GETTING QUIZZES FOR A STAGE", error.message);
//     return NextResponse.json("Internal server error!", { status: 500 });
//   }
// }


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
//       include: {
//         questions: {
//           include: {
//             answers: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(quizzes, { status: 200 });
//   } catch (error: any) {
//     console.log("GETTING QUIZZES FOR A STAGE", error.message);
//     return NextResponse.json("Internal server error!", { status: 500 });
//   }
// }

export async function GET(req: Request, { params }: { params: { stageId: string } }) {
  try {
    const { stageId } = params;

    if (!stageId) {
      return new NextResponse("Invalid Url", { status: 404 });
    }

    const quizzes = await db.stageQuiz.findMany({
      where: {
        stageId,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    // Deserialize the answers lol
    for (const quiz of quizzes) {
      for (const question of quiz.questions) {
        for (const answer of question.answers) {
          answer.text = JSON.parse(answer.text);
        }
      }
    }

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error: any) {
    console.log("quizzes for different stages", error.message);
    return NextResponse.json("Internal server error!", { status: 500 });
  }
}