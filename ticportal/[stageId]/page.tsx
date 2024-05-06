"use client";

import { currentProfile } from "@/lib/current-profile";
import { useRouter } from "next/router";
import React, { useState, useEffect, FC } from "react";

type Quiz = {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
};

interface props {
  stageId: string;
}

const Quiz: FC<props> = async (params) => {
  const user = await currentProfile();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const stageId = "659e85a89d2c643350a328ed";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`/api/stages/${stageId}/quiz`);
        const data = await response.json();

        const typedQuizzes = data.map((quiz: any) => ({
          ...quiz,
          correctAnswer: quiz.answers.find(
            (answer: { answer: string }) => answer === quiz.correctAnswer
          ), //magic line lol 🤣🤣🤣
        }));
        setQuizzes(typedQuizzes);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let correctCount = 0;
    for (const quizId in userAnswers) {
      const quiz = quizzes.find((q) => q.id === quizId);
      if (quiz && userAnswers[quizId] === quiz.correctAnswer) {
        correctCount++;
      }
    }

    setScore(correctCount);
    alert(
      `You scored <span class="math-inline">\{correctCount\}/</span>{quizzes.length}`
    );
  };

  return (
    <div className="flex justify-center container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        {loading && <p className="text-center">Loading quizzes...</p>}
        {error && <p className="text-red-600 text-center">{error.message}</p>}
        {quizzes.length > 0 && (
          <div className="space-y-4">
            <h1>quize</h1>
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">{quiz.question}</h2>
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
                        index + 1
                      }: ${answer}`}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        :
        {
          <div>
            <h4>No Quiz Available for this stage yet</h4>
          </div>
        }
        <button
          type="submit"
          className="flex justify-center mt-[20px] mp-[20px] custom-button"
        >
          Submit
        </button>
        <h2>Hello here: {router.query.stageId}</h2>
        <>{params.stageId}</>
      </form>
      {score > 0 && (
        <p className="text-center text-xl font-bold mt-4">
          my score {score}/{quizzes.length}
        </p>
      )}
    </div>
  );
};

export default Quiz;
