"use client";

import { UserTable } from "@/components/admin/table";
import { columns } from "@/components/admin/coordinators-column";

import { getCoordinators } from "@/constants/indexfxns";
import TableSkeleton from "../skeletons/table-skeleton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const ClientCoordinatorTable = () => {
  const { data, status } = useQuery({
    queryKey: ["coordinators"],
    queryFn: getCoordinators,
  });

  // console.log(data);

  if (status === "pending") return <TableSkeleton />;
  if (status === "error") {
    toast.error("Something wrong happened");
    return <TableSkeleton />;
  }
  return <UserTable columns={columns} data={data} filterType="username" />;
};

export default ClientCoordinatorTable;
