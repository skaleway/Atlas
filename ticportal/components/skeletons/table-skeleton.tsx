import React from "react";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="border rounded flexcol gap-2 p-4">
      <Skeleton className="p-4 rounded" />
      <Skeleton className="p-4 rounded" />
      <Skeleton className="p-4 rounded" />
      <Skeleton className="p-4 rounded" />
    </div>
  );
};

export default TableSkeleton;
