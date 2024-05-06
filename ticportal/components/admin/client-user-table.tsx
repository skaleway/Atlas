"use client";

import { UserTable } from "@/components/admin/table";
import { columns } from "@/components/admin/user-columns";

import { getStudents } from "@/constants/indexfxns";
import TableSkeleton from "../skeletons/table-skeleton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const ClientUserTable = () => {
  const { data, status } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (status === "pending") return <TableSkeleton />;
  if (status === "error") {
    toast.error("Something wrong happened");
    return <TableSkeleton />;
  }

  return <UserTable columns={columns} data={data} filterType="username" />;
};

export default ClientUserTable;
