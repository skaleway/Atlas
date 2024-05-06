"use client";

import { UserTable } from "@/components/admin/table";
import { columns } from "@/components/admin/team-column";

import { getTeam } from "@/constants/indexfxns";
import TableSkeleton from "../skeletons/table-skeleton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const ClientTeamTable = () => {
  const { data, status } = useQuery({
    queryKey: ["panelteams"],
    queryFn: getTeam,
  });

  // console.log(data);

  if (status === "pending") return <TableSkeleton />;
  if (status === "error") {
    toast.error("Something wrong happened");
    return <TableSkeleton />;
  }
  return <UserTable columns={columns} data={data} filterType="name" />;
};

export default ClientTeamTable;
