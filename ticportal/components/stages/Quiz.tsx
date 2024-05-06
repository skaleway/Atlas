"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Question } from "@prisma/client";
import AdminQuizForm from '@/components/forms/admin-quiz-form';
import UpdateQuizForm from '@/components/forms/update-quiz-form';

const AdminForm = ({ stageId }: { stageId: string }) => {
  const [quizzes, setQuizzes] = useState<{questions: Question[]}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/stages/${stageId}/quiz`);
        console.log("data",response.data)
        setQuizzes(response.data);
      }
      catch (error: any) {
        console.log(error)
      }
      setIsLoading(false);
    }
    fetchQuizzes();
  }, [stageId])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="text-xl text-center">Add, Update and Delete Questions for free</p>
      {quizzes[0]?.questions.length === 0 || quizzes.length === 0 ? (
        <div>
          <AdminQuizForm stageId={stageId} />
        </div>
      ) : (
        <div>
          <UpdateQuizForm stageId={stageId} />
        </div>
      )}
    </div>
  );
}

export default AdminForm;