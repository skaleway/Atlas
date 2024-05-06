import TeamHeader from "@/components/teams/team-header";
import TeamProfile from "@/components/teams/team-profile";
import NotFound from "@/components/shared/not-found";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Team, User } from "@prisma/client";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { teamId: string };
}): Promise<Metadata> {
  const team = await db.team.findUnique({
    where: {
      id: params.teamId,
    },
  });

  if (!team)
    return {
      title: "Team",
    };

  const title = team.name;

  return {
    title: title,
  };
}

const TeamLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamId: string };
}) => {
  // console.log(params.teamId);

  const team = await db.team.findUnique({
    where: {
      id: params.teamId,
    },
  });

  const user = await currentProfile();

  if (!user) return null;

  if (!team) return <NotFound contentType="team" params={params.teamId} />;

  return (
    <div className="flexcol">
      <TeamProfile team={team as Team} user={user as User} />
      <TeamHeader />
      <div className="mt-5">{children}</div>
    </div>
  );
};

export default TeamLayout;
