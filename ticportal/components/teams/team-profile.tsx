"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import TeamProfileSkeleton from "../skeletons/team-profile";
import Profile from "../shared/profile";
import { toast } from "sonner";
import { Team, User } from "@prisma/client";
import { cn } from "@/lib/utils";

const TeamProfile = ({ team, user }: { team: Team; user: User }) => {
  const pathname = usePathname();
  const router = useRouter();

  const teamId = pathname.split("/")[2];

  const getTeamData = async () => {
    try {
      const response = await axios.get(`/api/teams/${teamId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data, status } = useQuery({
    queryKey: ["team data"],
    queryFn: getTeamData,
  });

  if (status === "pending") {
    return <TeamProfileSkeleton />;
  }

  const fallBackText = data?.name?.split("")[0];

  const handleDeleteGroup = async () => {
    try {
      const { data } = await axios.delete(`/api/teams/${teamId}`);

      if (data) {
        router.back();
        return toast.success("Team Deleted");
      }
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  return (
    <div className="h-60 center flexcol relative">
      <div className="h-20 w-20 min-w-[80px] center border rounded-full cursor-pointer flex relative overflow-hidden mx-auto">
        <Profile imageUrl={data?.imageUrl!} fallBackText={fallBackText} />
      </div>
      <p className="font-semibold text-2xl">{data?.name}</p>
      {user.role === "ADMIN" && (
        <button
          className={cn(
            "absolute top-0 right-0 custom-button bg-red-100 text-rose-500 hover:bg-red-500 hover:text-white slowmo"
          )}
          onClick={handleDeleteGroup}
        >
          Delete Team
        </button>
      )}
      <div className="border-b absolute w-full bottom-0" />
    </div>
  );
};

export default TeamProfile;
