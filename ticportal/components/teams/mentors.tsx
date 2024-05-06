"use client";

import { Team, User } from "@prisma/client";
import qs from "query-string";
import React, { ChangeEventHandler, useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

type SearchedUser = {
  username: string;
  email: string;
  id: string;
  imageUrl: string;
};

const Mentors = ({ team, user }: { team: Team; user: User }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchUsers, setSearchUsers] = useState<SearchedUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const [onCloseOne, setOnCloseOne] = useState(false);

  let name = searchParams.get("username");
  const [value, setValue] = useState(name || "");

  const debouncedValue = useDebounce(value, 500);

  const getMentors = async () => {
    try {
      const { data } = await axios.get(`/api/teams/mentors/${team.id}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, status } = useQuery({
    queryKey: ["getmentors"],
    queryFn: getMentors,
  });

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          name: value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);

    const getMentors = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/user/mentor/${debouncedValue}`);
        const users: SearchedUser[] = data;
        setSearchUsers(users);

        return;
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    getMentors();
  }, [debouncedValue, router]);

  const handleFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleAddMentor = async (mentorId: string) => {
    if (!mentorId) return toast.error("User not found");

    try {
      const { data } = await axios.post("/api/user/mentor/request", {
        mentorId,
        teamId: team.id,
      });

      if (data) {
        setOnCloseOne(false);
        toast.success("Request sent!");
        name = "";
      }

      return;
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  const handleAssignMentor = async (mentorId: string) => {
    if (!mentorId) return toast.error("User not found");

    try {
      const { data } = await axios.put(`/api/teams/mentors/${team.id}`, {
        mentorId,
      });

      if (data) {
        setOnClose(false);
        toast.success("Mentor Added!");
        name = "";
      }

      return;
    } catch (error: any) {
      console.log(error);

      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  const userDivDisabled = (userId: string) => {
    const existingMentor = team.mentors.find((mentor) => mentor === userId);

    if (existingMentor) return true;

    return false;
  };

  const disabled = (userId: string) => {
    const existingMentor = userDivDisabled(userId);
    return { "disabled:cursor-not-allowed opacity-50": existingMentor };
  };

  if (status === "pending") return <TeamMentorSkeleton isHeader />;
  const mentors: userData[] = data;

  return (
    <div>
      <div>
        <div className="flex-center flex-between">
          {team.profileId === user.id && (
            <Dialog onOpenChange={setOnCloseOne} open={onCloseOne}>
              <DialogTrigger asChild>
                <button className="custom-button rounded-full">
                  Request a mentor
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Request a Mentor for your team</DialogTitle>
                  <DialogDescription>
                    Find the Mentors By their username
                  </DialogDescription>
                </DialogHeader>
                <input
                  placeholder="Username"
                  className="w-full custom-input custom-input-parent py-2 text-sm placeholder:text-sm"
                  onChange={handleFilter}
                  name="username"
                  value={value}
                />
                <div>
                  {searchUsers?.length === 0 || !searchUsers ? (
                    <p className="font-medium text-center text-sm">
                      {isLoading ? "Loading..." : "No User found"}
                    </p>
                  ) : (
                    <div className="flexcol gap-2">
                      {searchUsers.map((user) => {
                        // some code here
                        const fallbackText = user?.username?.split("")[0];
                        return (
                          <div
                            className={cn(
                              "border p-1 rounded flex-center gap-2"
                              // disabled(user.id)
                            )}
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
                                className={cn(
                                  "custom-button",
                                  disabled(user.id)
                                )}
                                onClick={() => handleAddMentor(user.id)}
                                disabled={userDivDisabled(user.id)}
                              >
                                Send request
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
          {(user.role === "ADMIN" || team.profileId === user.id) && (
            <Link
              href={`${pathname}/requests`}
              className={cn(
                "custom-button bg-transparent text-background border hover:text-white hover:border-background hover:bg-background"
              )}
            >
              Requests
            </Link>
          )}
          {user.role === "ADMIN" && (
            <Dialog onOpenChange={setOnClose} open={onClose}>
              <DialogTrigger asChild>
                <button className="custom-button rounded-full">
                  Assign Mentor
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Assign a Mentor to {team.name}</DialogTitle>
                  <DialogDescription>
                    Find the Mentors By their username
                  </DialogDescription>
                </DialogHeader>
                <input
                  placeholder="Username"
                  className="w-full custom-input custom-input-parent py-2 text-sm placeholder:text-sm"
                  onChange={handleFilter}
                  name="username"
                  value={value}
                />
                <div>
                  {searchUsers?.length === 0 || !searchUsers ? (
                    <p className="font-medium text-center text-sm">
                      {isLoading ? "Loading..." : "No User found"}
                    </p>
                  ) : (
                    <div className="flexcol gap-2">
                      {searchUsers.map((user) => {
                        // some code
                        const fallbackText = user?.username?.split("")[0];
                        return (
                          <div
                            className={cn(
                              "border p-1 rounded flex-center gap-2"
                              // disabled(user.id)
                            )}
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
                                className={cn(
                                  "custom-button",
                                  disabled(user.id)
                                )}
                                onClick={() => handleAssignMentor(user.id)}
                                disabled={userDivDisabled(user.id)}
                              >
                                Add mentor
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
        </div>
      </div>
      <div>
        {data?.length === 0 ? (
          <div>No Mentor found this team</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
            {mentors.map((mentor) => (
              <UserCard user={mentor} key={mentor.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;
