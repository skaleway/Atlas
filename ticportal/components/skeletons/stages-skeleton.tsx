import React from "react";
import { Skeleton } from "../ui/skeleton";

const StageSkeleton = () => {
  const skeletons = Array.from({ length: 5 });
  return (
    <div className="py-6 flex flex-col gap-2">
      {skeletons.map((_, index) => (
        <div className="lg:flex p-3 border rounded gap-2" key={index}>
          <div className="h-40 min-w-[160px] overflow-hidden rounded">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex-1 flex-col flex-between">
            <div className="flexcol gap-4 mt-3">
              <Skeleton className="py-1.5 rounded-full w-44" />
              <div className="flexcol gap-2">
                <Skeleton className="py-1 rounded-full w-full" />
                <Skeleton className="py-1 rounded-full w-[90%]" />
                <Skeleton className="py-1 rounded-full w-[60%]" />
                <Skeleton className="py-1 rounded-full w-48" />
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-3 lg:mt-0">
              <Skeleton className="py-3 rounded w-[75px]" />
              <Skeleton className="py-3 rounded w-[64px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StageSkeleton;
