import QuizForm from "@/components/forms/quizform";
import React from 'react';
import { currentProfile } from "@/lib/current-profile";

const Page = async ({ params }: { params: { stageId: string, userId: string | undefined | null } }) => {

const user = await currentProfile()

  params.userId = user?.id
  return (
    <div>
      <QuizForm params={params} />
    </div>
  );
}

export default Page;