import { ROLE, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { StudentData } from "@/types";
import { ProfileCard } from "../shared/profile-card";


const handleChangeRole = async (userId: string, role: ROLE) => {
  try {
    // console.log(userId);

    const { data, status } = await axios.put(`/api/user/${userId}`, {
      role: role,
    });

    if (status !== 200) {
      // console.log(data);
    }

    toast.success("User role updated");
  } catch (error: any) {
    if (error.response?.data) return toast.error(error.response?.data);
    return toast.error("Something went wrong.");
  }
};

export const columns: ColumnDef<StudentData>[] = [
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
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      const body: unknown = row.original;

      const user = body as User;

      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <p className="cursor-pointer hover:underline">{user.username}</p>
          </HoverCardTrigger>
          <ProfileCard user={user} />
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <button
          className="flex-center gap-2 hover:bg-slate-100 rounded p-2 slowmo"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      // console.log(row.original);

      const roles = ["ADMIN", "MENTOR", "JUDGE"];

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Change user role</DropdownMenuLabel>

            {roles.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => handleChangeRole(user.userId, role as ROLE)}
                className="cursor-pointer"
              >
                {role}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
