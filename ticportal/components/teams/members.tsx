"use client";

import { Team, User } from "@prisma/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { userData } from "@/types";
import UserCard from "@/components/shared/user-card";
import TeamMentorSkeleton from "@/components/skeletons/team-mentor-skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Profile from "@/components/shared/profile";

type SearchedUser = {
  username: string;
  email: string;
  id: string;
  imageUrl: string;
};

const MembersClient = ({ team, user }: { team: Team; user: User }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchUsers, setSearchUsers] = useState<SearchedUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [onClose, setOnClose] = useState(false);

  let name = searchParams.get("username") || "";

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        if (name.length >= 1) {
          const { data } = await axios.get(`/api/user/members/${name}`);
          const users: SearchedUser[] = data;
          setSearchUsers(users);
        }

        return;
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, [name]);

  const getMentors = async () => {
    try {
      const { data } = await axios.get(`/api/teams/members/${team.id}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, status } = useQuery({
    queryKey: ["getmembers"],
    queryFn: getMentors,
  });

  if (status === "pending") return <TeamMentorSkeleton isHeader />;
  const members: userData[] = data;

  // const isLoading = form.formState.isSubmitting;

  const handleAddUser = async (userId: string) => {
    if (!userId) return toast.error("User not found");
    

    try {
      const { data } = await axios.put(`/api/teams/members/${team.id}`, {
        memberId: userId,
      });

      if (data) {
        setOnClose(false);
        toast.success("Participant Added");
        name = "";
      }

      return;
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: key, value } = e.target;

    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div>
        <div className="flex-center flex-between">
          {(user.role === "ADMIN" || team.profileId === user.id) && (
            <Dialog onOpenChange={setOnClose} open={onClose}>
              <DialogTrigger asChild>
                <button className="custom-button rounded-full">
                  Add Participant
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Add a user to your team</DialogTitle>
                  <DialogDescription>
                    Find the user you want to add by username
                  </DialogDescription>
                </DialogHeader>
                <input
                  placeholder="Username"
                  className="w-full custom-input custom-input-parent py-2 text-sm placeholder:text-sm"
                  onChange={handleFilter}
                  name="username"
                  value={name}
                />
                <div>
                  {searchUsers?.length === 0 || !searchUsers ? (
                    <p className="font-medium text-center text-sm">
                      {isLoading ? "Loading..." : "No User found"}
                    </p>
                  ) : (
                    <div>
                      {searchUsers.map((user) => {
                        // some code
                        const fallbackText = user?.username?.split("")[0];
                        return (
                          <div
                            className="border p-1 rounded flex-center gap-2"
                            key={user.id}
                          >
                            <div className="h-8 w-8 min-w-[32px] rounded-full border">
                              <Profile
                                imageUrl={user.imageUrl ? user.imageUrl : ""}
                                fallBackText={fallbackText}
                              />
                            </div>
                            <div className="flex-center flex-between w-full">
                              <p className="flexcol">
                                <span className="font-medium text-sm">
                                  {user.username}
                                </span>
                                <span className="text-xs">{user.email}</span>
                              </p>

                              <button
                                className="custom-button"
                                onClick={() => handleAddUser(user.id)}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
          {team.profileId === user.id && (
            <Link
              href={`/api/teams/${team.id}/manage`}
              className="custom-button rounded-full"
            >
              Manage
            </Link>
          )}
        </div>
      </div>
      <div>
        {members.length === 0 ? (
          <div>No Mentor found this team</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
            {members.map((member) => (
              <UserCard user={member} key={member.id} teamId={team.id}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersClient;
