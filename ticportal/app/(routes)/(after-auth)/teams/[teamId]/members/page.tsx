import MembersClient from "@/components/teams/members";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const Members = async ({ params }: { params: { teamId: string } }) => {
  const team = await db.team.findFirst({
    where: {
      id: params.teamId,
    },
  });
  const user = await currentProfile();
  
  console.log(team)

  if (!team) return toast.error("Team not found");

  return <MembersClient team={team} user={user as User} />;
};

export default Members;
