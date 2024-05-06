"use client";

import React, { ChangeEvent, useState } from "react";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import axios from "axios";
import { stageQuestionsWithAnswers } from "@/types";

type userAnswer = {
  teamId: string;
  stageId: string;
  questionAnswer: string;
  questionId: string | null;
};

const StageForm = ({
  question,
  teamId,
  canUpdate,
}: {
  question: stageQuestionsWithAnswers;
  teamId: string;
  canUpdate: boolean;
}) => {
  const pathname = usePathname();
  const location = pathname.split("/")[2];

  const [questionData, setQuestionData] = useState<userAnswer>({
    questionAnswer: question.answer,
    teamId,
    stageId: location,
    questionId: question.questionId,
  });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { questionAnswer, stageId } = questionData;

  const handleSubmit = async () => {
    try {
      if (!teamId || !stageId) return toast.error("This fields are required");

      if (questionAnswer.length === 0)
        return toast.error("This fields is not to be empty");
      const { data } = await axios.post(
        `/api/stages/${location}/questions/${question.id}`,
        { ...questionData }
      );

      if (data) {
        setQuestionData((prev) => ({
          ...prev,
          questionAnswer: data.createdAnswer.answer,
        }));

        setTimeout(() => {
          return window.location.reload();
        }, 200);

        return toast.success("Thanks for submitting your answer");
      }
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  const handleUpdate = async () => {
    try {
      if (question.questionId === null)
        return toast.error(
          "You can only update questions that you've already asnsered"
        );

      if (!teamId || !stageId) return toast.error("This fields are required");

      if (questionAnswer.length === 0)
        return toast.error("This fields is not to be empty");
      const { data } = await axios.put(
        `/api/stages/${location}/questions/${question.id}`,
        { ...questionData }
      );

      if (data) {
        setQuestionData((prev) => ({
          ...prev,
          questionAnswer: data.answer,
        }));

        return toast.success("Answer updated successfully");
      }
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <AccordionTrigger className="text-start">
        {question.question}
      </AccordionTrigger>
      <AccordionContent>
        <p>{question.description}</p>
        <textarea
          className="custom-input custom-input-parent w-full py-2 h-20 placeholder:text-background/90 mt-2"
          placeholder="Write something here... "
          //write
          name="questionAnswer"
          value={questionAnswer}
          onChange={handleChange}
        />
        <div className="flex justify-end mt-2">
          <button
            className="custom-button items-end"
            onClick={canUpdate ? handleUpdate : handleSubmit}
          >
            {canUpdate ? "Update" : "Save"}
          </button>
        </div>
      </AccordionContent>
    </div>
  );
};

export default StageForm;
