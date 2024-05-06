import React from "react";
import { Skeleton } from "../ui/skeleton";

const TeamSkeleton = () => {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
      {skeletons.map((_, index) => (
        <div className="p-3 rounded-[8px] border flex flex-between" key={index}>
          <div className="flex gap-2 items-center w-full">
            <div className="border p-2 rounded-[8px]">
              <div className="h-10 w-10 center border rounded-full cursor-pointer relative overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
            <div className="flexcol gap-3">
              <Skeleton className="py-1 w-28 rounded-full " />
              <div className="flex-center gap-3">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="py-1 w-28 rounded-full " />
              </div>
            </div>
          </div>
          <div className="h-[58px] w-[34px] rounded-full border center">
            <div className="flexcol gap-1">
              <Skeleton className="h-1 w-1 rounded-full" />
              <Skeleton className="h-1 w-1 rounded-full" />
              <Skeleton className="h-1 w-1 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSkeleton;
