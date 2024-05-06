import { StageQuestion } from "@prisma/client";
import { userTeam } from "./userTeam";
import { db } from "./db";

export async function useQuestionsWithAnswers(questions: StageQuestion[]) {
  const team = await userTeam();

  const answerQuestions = questions.map(async (question) => {
    return await db.questionAnswers.findFirst({
      where: {
        stageQuestionId: question.id,
        teamId: team?.id,
      },
    });
  });

  const answers = await Promise.all(answerQuestions);

  const questionsWithAnswer = questions.map((question) => {
    const foundQuestion = answers.find(
      (answer) => answer?.stageQuestionId === question.id
    );

    if (foundQuestion) {
      return {
        ...question,
        answer: foundQuestion.answer,
        questionId: foundQuestion.id,
      };
    }

    return { ...question, answer: "", questionId: null };
  });

  return questionsWithAnswer;
}

export const allStageWithAnswers = async () => {
  const allStageId = await db.stageQuestion.findMany({
    select: { stageId: true },
  });

  const uniqueStageId = Array.from(
    new Set(allStageId.map((stage) => stage.stageId))
  );

  const questionsPerStage = uniqueStageId.map(
    async (stageId) =>
      await db.stageQuestion.findMany({
        where: {
          stageId,
        },
      })
  );

  const questions = await Promise.all(questionsPerStage);

  const dbQuestion = questions.map(async (question) => {
    const newQuestions = await useQuestionsWithAnswers(question);

    return newQuestions;
  });

  return await Promise.all(dbQuestion);
};
