"use client";

import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import TeamMentorSkeleton from "../skeletons/team-mentor-skeleton";
import { toast } from "sonner";
import { userData } from "@/types";
import UserCard from "../shared/user-card";

const Request = ({ teamId, user }: { teamId: string; user: User }) => {
  //
  const getTeamRequestedMentors = async () => {
    try {
      const { data } = await axios.get(`/api/user/mentor/request/${teamId}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, status } = useQuery({
    queryKey: ["requestMentors"],
    queryFn: getTeamRequestedMentors,
  });

  if (status === "error") {
    toast.error("Something went wrong!");
    return <TeamMentorSkeleton />;
  }

  if (status === "pending") return <TeamMentorSkeleton />;

  const mentors: userData[] = data;

  return (
    <div>
      {mentors.length === 0 ? (
        <div>No request found for this team</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
          {mentors.map((member) => (
            <UserCard user={member} key={member.id} isMentor teamId={teamId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Request;
