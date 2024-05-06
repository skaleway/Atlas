"use client"
import React, { useState, useEffect} from 'react';
import {toast } from "sonner"
import '../../app/globals.css'

import axios from 'axios';

type Question = {
  text: string;
  answers: string[];
  correctAnswer: string;
};

const AdminQuizForm = ({ stageId }: { stageId: string }) => {
  const [questions, setQuestions] = useState<Question[]>([
    { text: '', answers: ['', '', '', ''], correctAnswer: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (index: number, key: keyof Question, value: string | string[]) => {
    const newQuestions = [...questions];
    if (key === 'answers') {
      if (typeof value === 'string') {
        newQuestions[index][key] = [...newQuestions[index][key], value];
      } else {
        newQuestions[index][key] = value;
      }
    } else {
      if (Array.isArray(value)) {
        newQuestions[index][key] = value[0];
      } else {
        newQuestions[index][key] = value;
      }
    }
    setQuestions(newQuestions);
  };
  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleClearQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAddQuiz = () => {
    setQuestions([...questions, { text: '', answers: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`/api/stages/${stageId}/quiz`, { questions });
      toast.success('Quiz created successfully');
      window.location.reload()
    } catch (error) {
      toast.error('Error creating quiz');
    }
  };


  // Render form fields for questions, answers, and correctAnswer here...

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    {questions.map((quiz, quizIndex) => (
      <div key={quizIndex} className="bg-white p-4 rounded-lg shadow-md space-y-2 mx-auto" style={{ margin: 'auto' }}>
        <input type="text" value={quiz.text} onChange={(e) => handleInputChange(quizIndex, 'text', e.target.value)} placeholder="Question" className="w-full p-2 border border-gray-300 rounded" />
        {quiz.answers.map((answer, answerIndex) => (
          <input key={answerIndex} type="text" value={answer} onChange={(e) => handleAnswerChange(quizIndex, answerIndex, e.target.value)} placeholder={`Answer ${answerIndex + 1}`} className="w-full p-2 border border-gray-300 rounded" />
        ))}
        <select value={quiz.correctAnswer} onChange={(e) => handleInputChange(quizIndex, 'correctAnswer', e.target.value)} className="w-full p-2 border border-gray-300 rounded">
          {quiz.answers.map((answer, index) => (
            <option key={index} value={answer}>{ `${answer}`}</option>
          ))}
        </select>
        <button type="button" onClick={() => handleClearQuestion(quizIndex)} className="flex place-items-center rounded w-fit outline-none focus:outline-none px-3 py-1 bg-red-500 text-white hover:bg-red-500/90 slowmo opacity-100 text-xs cursor-pointer">Remove Question</button>
      </div>
    ))}
    <div className='flex flex-row place-items-center'>
      <button type="button" onClick={handleAddQuiz} className="rounded w-fit outline-none focus:outline-none px-3 py-1 bg-background text-white hover:bg-background/90 slowmo opacity-100 text-xs cursor-pointer mx-auto">Add Question</button>
      <button type="submit" disabled={isSubmitting} className="rounded w-fit outline-none focus:outline-none px-3 py-1 bg-background text-white hover:bg-background/90 slowmo opacity-100 text-xs cursor-pointer">Publish Quiz</button>
    </div>
  </form>
  );
};

export default AdminQuizForm;