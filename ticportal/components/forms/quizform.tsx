"use client";

import { CheckCircle2 } from "lucide-react";
import QuizSkeleton from "../skeletons/quiz-skeleton";
import { currentProfile } from "@/lib/current-profile";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

type Quiz = {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
};

const QuizForm = ({
  params,
}: {
  params: { stageId: string; userId: string | undefined | null };
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [scoreSubmitted, setScoreSubmitted] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const stagequizescore = await axios.get(`/api/stages/${params.stageId}/quizscore/${params.userId}`);

        if (stagequizescore.data) {
          setScoreSubmitted(stagequizescore.data.score);
          console.log("score",stagequizescore.data.score)
        }
        const response = await axios.get(`/api/stages/${params.stageId}/quiz`);
console.log(stagequizescore.data)
        console.log(response.data);

        if (response.data) {
          const typedQuizzes = response.data.flatMap((quizData: any) =>
            quizData.questions.map((quiz: any) => ({
              id: quiz.id,
              question: quiz.text,
              answers: quiz.answers[0].text,
              correctAnswer: quiz.correctAnswer,
            }))
          );
          setQuizzes(typedQuizzes);
        } else {
          console.error("Unexpected response data structure:", response.data);
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [params.stageId]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswers({ ...userAnswers, [event.target.name]: event.target.value });
  };



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      let correctCount = 0;
      for (const quizId in userAnswers) {
        const quiz = quizzes.find((q) => q.id === quizId);
        if (quiz && userAnswers[quizId] === quiz.correctAnswer) {
          correctCount++;
        }
      }

      
  
      if (correctCount <= quizzes.length/2){
        toast.error(`Your score is low ${correctCount}/${quizzes.length}. You must have atleast 50%, Please try again in 10s.`)
        setIsSubmitted(false);
      setTimeout(() => {
        window.location.reload()
      },10000)
        return
      }
  
      setScore(correctCount);
  
      const submitscore = await axios.put(
        `/api/stages/${params.stageId}/quizscore`,
        {
          score: correctCount,
          userId: params.userId,
        }
      );
      if (submitscore.status == 200) {
        toast.success("Quiz Submitted Successfully for " + correctCount + " points");
        setTimeout(() => {
          window.location.reload()
        
        },2000)
      }
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      toast.error("An error occurred. Please try again.");
      console.log(error);
    }
  };

const SubmittedComponent = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      <div>
        <CheckCircle2 size={200} className="text-blue-400" />
      </div>
      <br />
      <br />
      <div className="mt-1">
        Congratulations on Successfully answering the quiz for this stage
      </div>
      <br />
      <strong className="text-xl text- mt-1">
        Score: {scoreSubmitted}/{quizzes.length}
      </strong>
    </div>
  );
}

if (scoreSubmitted > 0) {

  return <SubmittedComponent />
}
  return (
    <div className="flex justify-center container mx-auto p-4">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          {loading && <div className="w-full md:w-[500px]">
  <QuizSkeleton />
</div>}
          {quizzes.length > 0 ? (
            <div>
              <div className="space-y-4">
                {quizzes.map((quiz, pos) => (
                  <div
                    key={quiz.id}
                    className="w-full md:w-[500px] p-2 rounded-lg shadow-md"
                  >
                    <h2 className="text-[16px] font-bold mb-2">
                      {`${pos + 1}: ${quiz.question}`}
                    </h2>
                    <div className="space-y-2">
                      {quiz.answers.map((answer, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name={quiz.id}
                            value={answer}
                            onChange={handleAnswerChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700">{`${
                            index + 65
                          }: ${answer}`}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center">
  <button
    type="submit"
    className="flex text-center justify-center mt-[20px] mp-[20px] p-[10px] custom-button"
    disabled={isSubmitting}
  >
    Submit
  </button>
</div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
  <div>No Quiz Available for this Stage Yet</div>
</div>
          )}
        </form>
      ) : (
        <SubmittedComponent/>
      )}
    </div>
  );
};

export default QuizForm;
