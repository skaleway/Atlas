"use client";

import React from "react";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { User } from "@prisma/client";

import Profile from "@/components/shared/profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { teamData } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";

const SingleTeam = ({
  team,
  user,
}: {
  team: teamData;
  innerRef?: React.Ref<HTMLDivElement>;
  user?: User;
}) => {
  const router = useRouter();

  const handleRequestToJoin = async () => {
    try {
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  const fallBackText = team.name.split("")[0];

  return (
    <div
      className="border rounded-[8px] p-3 group cursor-pointer flex justify-between group"
      onClick={() => router.push(`/teams/${team.id}`)}
    >
      <div className="flex gap-2 items-center">
        <div className="border p-2 rounded-[8px]">
          <div className="h-10 w-10 center border rounded-full cursor-pointer relative overflow-hidden">
            <Profile imageUrl={team.imageUrl} fallBackText={fallBackText} />
          </div>
        </div>
        <div>
          <p className="font-semibold text-sm group-hover:underline">
            {team.name}
          </p>
          <p className="truncate-text text-zinc-500 text-sm">
            {team?.members?.length} team members
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="border p-2 rounded-full cursor-pointer outline-none focus:outline-none">
            <MoreVertical className="w-4 h-4 " />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit" align="center">
          <DropdownMenuGroup>
            {team.profileId !== user?.id && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleRequestToJoin}
              >
                Request join
              </DropdownMenuItem>
            )}

            <Link href={`/teams/${team.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                View profile
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SingleTeam;
