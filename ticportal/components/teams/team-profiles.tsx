"use client";

import { Team, User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import SingleTeam from "./team";
import { teamData } from "@/types";
import TeamSkeleton from "../skeletons/team-skeleton";

const TeamProfiles = ({ user }: { user?: User }) => {
  const { inView, ref } = useInView();
  const fetchTeams = async () => {
    try {
      const { data } = await axios.get("/api/teams");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("Fire!");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <TeamSkeleton />;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="py-6 grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
      {data.pages.map((teams: teamData[]) =>
        teams.map((team) => (
          <SingleTeam team={team} innerRef={ref} user={user} key={team.id} />
        ))
      )}
    </div>
  );
};

export default TeamProfiles;
