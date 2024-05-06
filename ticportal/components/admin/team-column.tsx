import { ROLE } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

export type teamData = {
  id: string;
  name: string;
  profileId: string;
};

const handleDeleteTeam = async (teamId: string, role: ROLE) => {
  try {
    const { data } = await axios.delete(`/api/teams/${teamId}`);

    if (data) {
      window.location.reload();
      // router.back();
      return toast.success("Team Deleted");
    }
  } catch (error: any) {
    if (error.response?.data) return toast.error(error.response?.data);
    return toast.error("Something went wrong.");
  }
};

export const columns: ColumnDef<teamData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Team Name",
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <button
          className="flex-center gap-2 hover:bg-slate-100 rounded p-2 slowmo"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "profileId",
    header: "Creator Id",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const team = row.original;

      const roles = ["Assign a mentor", "Delete group"];

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Change team stuffs</DropdownMenuLabel>

            {roles.map((role) => {
              //some code here
              if (role === "Assign a mentor") {
                return (
                  <DropdownMenuItem key={role} className="text-background">
                    <Link href={`/teams/${team.id}/mentors`} className="w-full">
                      {role}
                    </Link>
                  </DropdownMenuItem>
                );
              }
              return (
                <DropdownMenuItem
                  key={role}
                  onClick={() => handleDeleteTeam(team.id, role as ROLE)}
                  className="text-red-500 hover:bg-red-500 hover:text-white"
                >
                  {role}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
