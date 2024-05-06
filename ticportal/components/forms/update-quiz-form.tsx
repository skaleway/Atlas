"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from "sonner"

type Answer = {
  id: string;
  questionId: string;
  text: string[];
  createdAt: string;
  updatedAt: string;
};

type Question = {
  id: string;
  quizId: string;
  text: string;
  correctAnswer: string;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
};

type Quiz = {
  id: string;
  stageId: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
};

const UpdateQuizForm = ({ stageId }: { stageId: string }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizzesFromDB = async () => {
      const response = await axios.get(`/api/stages/${stageId}/quiz`);
      setQuizzes(response.data);
      console.log("data here",response.data)
    };

    fetchQuizzesFromDB();
  }, [stageId]);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: '',
      quizId: '',
      text: '',
      correctAnswer: '',
      createdAt: '',
      updatedAt: '',
      answers: [{
        id: '',
        questionId: '',
        text: ['', '', '', ''],
        createdAt: '',
        updatedAt: '',
      }],
    };
    setQuizzes(prevQuizzes => prevQuizzes.map(quiz => ({
      ...quiz,
      questions: [...quiz.questions, newQuestion]
    })));
  };
  const handleAnswerChange = (quizIndex: number, questionIndex: number, answerIndex: number, newValue: string) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].questions[questionIndex].answers[0].text[answerIndex] = newValue;
    setQuizzes(newQuizzes);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log('Submitting form');


    const data = {
      questions: quizzes.map(quiz => 
        quiz.questions.map(question => ({
          text: question.text,
          answers: question.answers[0].text,
          correctAnswer: question.correctAnswer,
          questionId: question.id,
        }))
      ).flat()
    };

    console.log(data)
  
    const update = await axios.put(`/api/stages/${stageId}/quiz`, data)
  
    if(update.status === 200){
      toast.success('Quiz updated successfully')
      window.location.reload()
    }else{
      toast.error('Error updating quiz, please contact super admin for help')
    }

    
  };
  // const handleInputChange = (quizIndex: number, questionIndex: number, field: string, value: string) => {
  //   const newQuizzes = [...quizzes];
  //   if (field === 'text') {
  //     newQuizzes[quizIndex].questions[questionIndex].text = value;
  //   } else if (field === 'correctAnswer') {
  //     newQuizzes[quizIndex].questions[questionIndex].correctAnswer = value;
  //   }
  //   setQuizzes(newQuizzes);
  // };

  const handleInputChange = (quizIndex: number, questionIndex: number, key: string, value: string, answerIndex?: number) => {
    setQuizzes(prevQuizzes => prevQuizzes.map((quiz, qIndex) => {
      if (qIndex === quizIndex) {
        return {
          ...quiz,
          questions: quiz.questions.map((question, qstIndex) => {
            if (qstIndex === questionIndex) {
              if (key === 'answers' && typeof answerIndex !== 'undefined') {
                const newAnswers = [...question.answers];
                newAnswers[answerIndex] = {
                  ...newAnswers[answerIndex], 
                  text: [value]
                };
                return { ...question, [key]: newAnswers };
              } else {
                return { ...question, [key]: value };
              }
            }
            return question;
          })
        };
      }
      return quiz;
    }));
  };

  const handleDeleteQuestion = async (questionId: string) => {
    const deletequestion = await axios.delete(`/api/stages/${stageId}/quiz/question/${questionId}`)

    if(deletequestion.status === 200){
      toast.success(` deleted question with id${questionId}`)
      window.location.reload()
    }else{
      toast.error('Error deleting question, please contact super admin for help')
    }
    
  };
  
  const handleUpdateQuestion = (quizIndex: number, questionIndex: number) => {
    console.log(`Updating question at index ${questionIndex} from quiz at index ${quizIndex}`);
    // Implement the logic later on
  };

  return (
    <div>

<form className="space-y-4" onSubmit={handleSubmit}>
  {quizzes.map((quiz: Quiz, quizIndex: number) => (
    quiz.questions.map((question: Question, questionIndex: number) => (
      <div key={question.id} className="bg-white p-4 rounded-lg shadow-md space-y-2">
        <input type="text" value={question.text} onChange={(e) => handleInputChange(quizIndex, questionIndex, 'text', e.target.value)} placeholder="Question" className="w-full p-2 border border-gray-300 rounded" />
        {question.answers && question.answers.length > 0 && question.answers[0].text.map((answer: string, answerIndex: number) => (
          <input
            key={answerIndex}
            type="text"
            value={answer}
            onChange={(e) =>
              handleAnswerChange(quizIndex, questionIndex, answerIndex, e.target.value)
            }
            placeholder={`Answer ${answerIndex + 1}`}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}
        <h1>correct answer</h1>
        <select value={question.correctAnswer} onChange={(e) => handleInputChange(quizIndex, questionIndex, 'correctAnswer', e.target.value)} className="w-full p-2 border border-gray-300 rounded">
          {question.answers[0].text.map((answer: string, index: number) => (
            <option key={index} value={answer}>{answer}</option>
          ))}
        </select>
        <button type="button" onClick={() => handleDeleteQuestion(question.id)} className="flex place-items-center rounded w-fit outline-none focus:outline-none px-3 py-1 bg-red-500 text-white hover:bg-red-500/90 slowmo opacity-100 text-xs cursor-pointer">Delete</button>

      </div>
    ))
  ))}
  <div className='flex flex-row items-center'>
  <button 
  type="submit" 
  disabled={isSubmitting} 
  className={`rounded w-fit outline-none focus:outline-none px-3 py-1 text-white hover:bg-background/90 slowmo opacity-100 text-xs cursor-pointer mx-auto ${isSubmitting ? 'bg-light-black' : 'bg-background'}`}
>
  Update</button>
 <button type="button" onClick={handleAddQuestion} className="rounded w-fit outline-none focus:outline-none px-3 py-1 bg-background text-white hover:bg-background/90 slowmo opacity-100 text-xs cursor-pointer mx-auto">Add Question</button>
  </div>
</form>
      
    </div>
  );
};

export default UpdateQuizForm;