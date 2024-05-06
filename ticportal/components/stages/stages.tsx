"use client";

import {Stage, User} from "@prisma/client";
import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import StageProfile from "./stage";
import StageSkeleton from "../skeletons/stages-skeleton";
import {Tornado} from "lucide-react";
import LineText from "@/components/shared/linetext";


const StagesProfile = ({ user }: { user?: User }) => {
  const { inView, ref } = useInView();
  const [isAdmin,setisAdmin] = useState(false)
  const fetchTeams = async () => {
    try {
      const currentuser = await axios.get('/api/user')
console.log("user her", currentuser)

      if (currentuser && currentuser.data.role === "ADMIN"){
      setisAdmin(true)
        
      }
      const { data } = await axios.get("/api/stages");
      console.log(data)
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
    queryKey: ["stages"],
    queryFn: fetchTeams,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("Fire!");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <StageSkeleton />;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
      <>
        <LineText>
          <p className="flex items-center justify-center gap-2 px-4">
            <Tornado className="w-4 h-4" />
            <span className="text-xs uppercase font-bold">
              Total of {data.pages[0].length} stages
            </span>
          </p>
        </LineText>

        <div className="py-6 flex flex-col gap-2">
          {data.pages.map((stages: Stage[]) =>
             stages
                 .sort((stage1, stage2) => stage1.stageNumber - stage2.stageNumber)
                 .map((stage,index) => (
              <StageProfile
                key={stage.id}
                isAdmin={isAdmin}
                index={stage?.stageNumber ? stage?.stageNumber : index+1 }
                name={stage.name}
                id={stage.id}
                type="stages"
                description={stage.description}
              />
            ))
          )}
        </div>
      </>
  );
};

export default StagesProfile;
