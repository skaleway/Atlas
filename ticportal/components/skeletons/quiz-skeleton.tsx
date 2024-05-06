import React from "react";
import { Skeleton } from "../ui/skeleton";

const QuizSkeleton = () => {
  const skeletons = Array.from({ length: 10 });

  return (
    <div className="w-full py-6 flex flex-col gap-2">
      {skeletons.map((_, index) => (
        <div className="with-full p-3 border rounded gap-2" key={index}>
          <div className="mb-4">
            <Skeleton className="py-1.5 h-[20px] rounded-full w-full" />
          </div>
          <div className="flex flex-row gap-2">
            <Skeleton className="py-1 rounded-full w-full" />
            <Skeleton className="py-1 rounded-full w-full" />
            <Skeleton className="py-1 rounded-full w-full" />
            <Skeleton className="py-1 rounded-full w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizSkeleton;
