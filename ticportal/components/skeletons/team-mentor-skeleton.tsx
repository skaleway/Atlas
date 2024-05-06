import React from "react";
import { Skeleton } from "../ui/skeleton";

const TeamMentorSkeleton = ({ isHeader }: { isHeader?: boolean }) => {
  const skeletons = Array.from({ length: 6 });
  return (
    <div>
      {isHeader && (
        <div className="flex-center flex-between">
          <Skeleton className="py-3 w-28 rounded-full " />
          <Skeleton className="py-3 w-28 rounded-full " />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        {skeletons.map((_, index) => (
          <div key={index} className="border rounded p-3 flex-1">
            <div className="flex-center flex-between">
              <Skeleton className="h-8 w-8 rounded-full border" />
              <Skeleton className="py-3 w-28 rounded-full " />
            </div>
            <div className="flexcol gap-2 mt-3">
              <Skeleton className="py-1 w-28 rounded" />
              <Skeleton className="py-1 w-full rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMentorSkeleton;
