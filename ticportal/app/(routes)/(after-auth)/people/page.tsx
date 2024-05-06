import { Metadata } from "next";
import React from "react";

import HeaderTab from "@/components/shared/header-tab";
import { db } from "@/lib/db";
import UserCard from "@/components/shared/user-card";
import { userData } from "@/types";
import {currentProfile} from "@/lib/current-profile";

export const metadata: Metadata = {
  title: "Participants",
  description: "Participants for the TiC summit",
};

const Teams = async () => {
  const authUser = await currentProfile();
  const isMentor = authUser?.role === "MENTOR"
  const participants = await db.user.findMany({
    where: {
      role: "PARTICIPANT",
    },
    select: {
      id: true,
      username: true,
      imageUrl: true,
      firstName: true,
      lastName: true,
      description: true,
      role: true,
    },
  });

  const participantsData = participants as userData[];

  return (
    <>
      <HeaderTab />
      <div className="py-6 grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {participantsData.map((participant) => (
          <UserCard user={participant} key={participant.id} isMentor={isMentor} />
        ))}
      </div>
    </>
  );
};

export default Teams;
