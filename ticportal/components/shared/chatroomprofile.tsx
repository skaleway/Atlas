import { teamProfile } from "@/types";
import React from "react";
import Profile from "./profile";
import Link from "next/link";

const ChatRoomProfile= ({ teamProfile }: { teamProfile: teamProfile }) => {
  const fallBackText = teamProfile.name.split("")[0];
  return (
    <Link
      href={`/teams/${teamProfile.id}`}
      className="mt-10 flex-center gap-2 group"
    >
      <div className="h-8 min-w-[32px] center border rounded-full cursor-pointer relative overflow-hidden">
        <Profile
          imageUrl={teamProfile?.imageUrl!}
          fallBackText={fallBackText}
        />
      </div>
      <p className="flexcol group-hover:pl-2 slowmo">
        <span className="capitalize">{teamProfile.name}</span>
        <span className="text-[10px]">Manage members, & more</span>
      </p>
    </Link>
  );
};

export default ChatRoomProfile;
