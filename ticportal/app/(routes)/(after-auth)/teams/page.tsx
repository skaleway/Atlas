import { Metadata } from "next";
import React from "react";
import { User } from "@prisma/client";
import { redirectToSignIn } from "@clerk/nextjs";

import TeamProfiles from "@/components/teams/team-profiles";
import HeaderTab from "@/components/shared/header-tab";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Teams",
  description: "Teams for the TiC summit",
};

const Teams = async () => {
  const user = await currentProfile();

  if (
    user?.role === "PARTICIPANT" &&
    (!user?.schoolName || !user?.location || !user?.howYoulearnAboutUs)
  ) {
    return redirect("/settings/profile");
  }

  if (!user) redirectToSignIn();
  return (
    <div>
      <HeaderTab />
      <TeamProfiles user={user as User} />
    </div>
  );
};

export default Teams;
