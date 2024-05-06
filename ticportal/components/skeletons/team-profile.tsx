import React from "react";
import { Skeleton } from "../ui/skeleton";

const TeamProfileSkeleton = () => {
  return (
    <div className="h-60 center flexcol relative">
      <Skeleton className="h-20 w-20 min-w-[80px] center border rounded-full  mx-auto" />
      <Skeleton className="h-3 w-40 min-w-[80px] center border rounded  mx-auto mt-2" />

      <div className="border-b absolute w-full bottom-0" />
    </div>
  );
};

export default TeamProfileSkeleton;
