import StageQuestions from "@/components/stages/stagequestions";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { userTeam } from "@/lib/userTeam";
import { StageQuestion } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const Page = async ({ params }: { params: { stageId: string } }) => {
  const content = await db.stage.findUnique({
    where: {
      id: params.stageId,
    },
    include: { StageQuestion: true },
  });

  const team = await userTeam();

  const user = await currentProfile();
  const isTeamCreator = team?.profileId === user?.id;

  const handleSubmitStage = async () => {
    if (!isTeamCreator)
      return toast.error("only the creator of this team can submit");
  };

  return (
    <div>
      <div className="space-y-2 flexcol">
        <h1 className="font-semibold lg:text-3xl text-xl">{content?.name}</h1>
        <p className="lg:text-base text-sm">{content?.description}</p>
      </div>
      <div className="my-3">
        <h2 className="text-xl font-medium">Activites</h2>
        <ul className="list-inside m-4 mt-2">
          {content?.activities.map((act) => (
            <li key={act} className="list-inside">
              {act}
            </li>
          ))}
        </ul>
      </div>
      <hr />

      <h1 className="text-center text-xl font-bold my-3">Questions</h1>
      <StageQuestions questions={content?.StageQuestion as StageQuestion[]} />

      <div className="flex flex-col center">
        {!isTeamCreator && <p>This can only be submitted by the team creator</p>}
        <button
          className="custom-button mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isTeamCreator}
          // onClick={handleSubmitStage}
        >
          Submit stage
        </button>
      </div>
    </div>
  );
};

export default Page;
