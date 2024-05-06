import TeamOverview from "@/components/teams/teamId";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { cn } from "@/lib/testcn";
import {
  allStageWithAnswers,
  useQuestionsWithAnswers,
} from "@/lib/use-questions-and-answer";
import { User } from "@prisma/client";
import React from "react";

const TeamId = async ({ params }: { params: { teamId: string } }) => {
  const team = await db.team.findFirst({
    where: {
      id: params.teamId,
    },
    select: {
      members: true,
      id: true,
      problemState: true,
      proposeSolution: true,
      profileId: true,
    },
  });
  const questionswithAnswers = await allStageWithAnswers();
  const user = await currentProfile();

  const isUserInteam = team?.members.find(
    (member) => member.profileId === user?.id
  );

  if (!team) return;

  return (
    <div className="w-full">
      <TeamOverview team={team} user={user as User} />
      <div
        className={cn("mt-5 flex-col flex gap-4 relative", {
          "before:absolute before:top-0 before:h-full before:w-full before:bg-white before:bg-opacity-50 before:backdrop-filter before:backdrop-blur-lg before:z-10":
            !isUserInteam && user?.role !== "ADMIN",
        })}
      >
        {questionswithAnswers.map((questions, index) => (
          <div key={index} className="border rounded p-3">
            <p className="text-center font-bold mb-5">
              Questions for stage {index + 1}
            </p>
            <div className="flex flex-col gap-3">
              {questions.map((question) => (
                <div key={question.id} className="border rounded p-3 fle">
                  <p className="font-semibold text-base">{question.question}</p>
                  <p className="text-sm">{question.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamId;
