"use client";

import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { isTeamAdmin } from "@/constants/indexfxns";
import { userData } from "@/types";
import Profile from "./profile";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type statusType = "ACCEPTED" | "REJECTED";

const UserCard =  ({
  user,
  where,
  isMentor,
  teamId
}: {
  user: userData;
  where?: "members";
  isMentor?: boolean;
  teamId?: string;
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let fallbackText = "";
  const firstLetter = user?.firstName?.split("")[0];
  const lastLetter = user?.lastName?.split("")[0];


  useEffect(() => {
    const checkAdminStatus = async () => {
      if (teamId) {
        const adminStatus = await isTeamAdmin(teamId);
        setIsAdmin(adminStatus);
      }
    }
    checkAdminStatus();
  }, [teamId]);



  if (firstLetter && lastLetter) {
    fallbackText = `${firstLetter}${lastLetter}`;
  } else {
    fallbackText = user.username?.split("")[0];
  }

  const handleMemberDelete = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/api/teams/members/${teamId}`,  {
       data:{ userId: userId}
      });
      console.log("team here",userId)

      setIsLoading(false);
      if (data.status === 200) {
        toast.success("Member deleted successfully");
      } else {
        toast.error("Member deleted successfully");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  }

  // const isTeamAdmin = async (teamId: string, currentUserId: string) => {
  //   try {
  //     const { data } = await axios.get(`/api/teams/${teamId}`);
  //     const isAdmin = data.members.some((member: { profileId: string, role: string }) => 
  //       member.profileId === currentUserId && member.role === 'ADMIN'
  //     );
  //     return isAdmin;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // }


  const handleChangeRequestStatus = async (status: statusType) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(`/api/user/mentor/request/${teamId}`, {
        mentorId: user.id,
        requestId: user.requestId,
        status,
      });

      if (data) {
        toast.success("Added user");
      }
      return;
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isMentor)
    return (
      <div className="border rounded p-3 flex-1 hover:bg-foreground slowmo group flexcol gap-2">
        <div className="flex-center flex-between">
          <div className="h-8 w-8 rounded-full  overflow-hidden border">
            <Profile
              imageUrl={user.imageUrl ? user.imageUrl : ""}
              fallBackText={fallbackText}
              
            />
          </div>
          <div>
            <p className="text-xs border py-1 px-2 rounded-full bg-foreground ">
              {user.status}
              
              
            </p>
          </div>
        </div>
        <div className="flexcol gap-2">
          <div>
            <Link href={`/${user.username}`} target="_blank">
              <p className="font-semibold group-hover:underline">
                {firstLetter && lastLetter
                    ? `${user.firstName} ${user.lastName}`
                    : user.username}
              </p>
            </Link>

            <p className="text-xs truncate-text_two">
              {user.description ? user.description : ""}
            </p>
          </div>
          <div className="flex-center gap-2">
            <button
              disabled={isLoading}
              onClick={() => handleChangeRequestStatus("ACCEPTED")}
              className={cn("custom-button", {
                "opacity-50 cursor-not-allowed": isLoading,
              })}
            >
              Accept
            </button>
            <button
              disabled={isLoading}
              onClick={() => handleChangeRequestStatus("REJECTED")}
              className={cn(
                "custom-button bg-red-100 text-red-500 hover:bg-red-500 hover:text-white",
                {
                  "opacity-50 cursor-not-allowed": isLoading,
                }
              )}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="border rounded p-3 flex-1 hover:bg-foreground slowmo group">
      <div className="flex-center flex-between">
      <Link
      key={user.username}
      href={`/${user.username}`}
      className="border rounded p-3 flex-1 hover:bg-foreground slowmo group"
    >
        <div className="h-8 w-8 rounded-full  overflow-hidden border">
          
          <Profile
            imageUrl={user.imageUrl ? user.imageUrl : ""}
            fallBackText={fallbackText}
          />
        </div>
        </Link>
        <div className="flex gap-1 px-1">
          <h3 className="text-xs border py-1 px-2 rounded-full bg-foreground ">
            {user.role}
            
          </h3>{ isAdmin &&<button className={cn(
            "mx-1 custom-button bg-red-100 text-rose-500 hover:bg-red-500 hover:text-white slowmo"
          )} onClick={()=> handleMemberDelete(user.id)}>delete member</button>
}
        </div>
      </div>
      <Link
      key={user.username}
      href={`/${user.username}`}
      className="border rounded p-3 flex-1 hover:bg-foreground slowmo group"
    >
      <div className="mt-3">
        <p className="font-semibold group-hover:underline ml-4">
          {firstLetter && lastLetter
            ? `${user.firstName} ${user.lastName}`
            : user.username}
        </p>
        <p className="text-xs truncate-text_twom ml-4">
          {user.description ? user.description : ""}
          
        </p>
      </div>
      </Link>
      </div>
  );
};

export default UserCard;
