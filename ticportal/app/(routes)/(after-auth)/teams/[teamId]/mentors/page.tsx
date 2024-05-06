import Mentors from "@/components/teams/mentors";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const Page = async ({ params }: { params: { teamId: string } }) => {
  const team = await db.team.findFirst({
    where: {
      id: params.teamId,
    },
  });
  const user = await currentProfile();

  if (!team) return toast.error("Team not found");

  // console.log(team);

  return <Mentors user={user as User} team={team} />;
};

export default Page;
