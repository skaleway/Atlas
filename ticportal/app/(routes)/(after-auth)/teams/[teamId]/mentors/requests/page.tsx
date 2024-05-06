import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import Request from "@/components/teams/requests";
import { currentProfile } from "@/lib/current-profile";
import { userTeam } from "@/lib/userTeam";

const Page = async ({ params }: { params: { teamId: string } }) => {
  const team = await userTeam();
  const user = await currentProfile();

  if (!team) return toast.error("Team not found");

  if (team.profileId !== user?.id || user?.role !== "ADMIN")
    return redirect(`/teams/${team.id}`);

  return <Request user={user as User} teamId={team.id} />;
};

export default Page;
