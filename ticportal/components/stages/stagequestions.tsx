import { StageQuestion } from "@prisma/client";
import React from "react";
import StageForm from "../forms/stage-form";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { userTeam } from "@/lib/userTeam";
import { useQuestionsWithAnswers } from "@/lib/use-questions-and-answer";

const StageQuestions = async ({
  questions,
}: {
  questions: StageQuestion[];
}) => {
  const team = await userTeam();
  const questionsWithAnswer = await useQuestionsWithAnswers(questions);
  return (
    <Accordion
      type="single"
      collapsible
      className="flexcol gap-3 w-full flex slowmo"
    >
      {questionsWithAnswer.map((q, index) => {
        let canUpdate = true;
        if (q.answer.length === 0) {
          canUpdate = false;
        } else {
          canUpdate = true;
        }

        return (
          <AccordionItem
            value={`item-${index}`}
            key={q.question}
            className="w-full slowmo"
          >
            <StageForm
              question={q}
              teamId={team?.id || ""}
              canUpdate={canUpdate}
            />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default StageQuestions;
