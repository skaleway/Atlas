"use client";

import { Team, User } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { teamInfo } from "@/lib/validations";
import { TeamData, teamData } from "@/types";

const TeamOverview = ({ team, user }: { team: TeamData; user: User }) => {
  const [onClose, setOnClose] = useState(false);
  const form = useForm({
    resolver: zodResolver(teamInfo),
    defaultValues: {
      problemState: "" || team.problemState!,
      proposeSolution: "" || team.proposeSolution!,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const updateTeamProfile = async (values: z.infer<typeof teamInfo>) => {
    try {
      const { data } = await axios.put(`/api/teams/${team.id}`, values);

      if (data) {
        toast.success("updated successfull");
        setOnClose(false);
        window.location.reload();
      }
    } catch (error) {
      return toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flexcol gap-4 flex-1 ">
        <div className="border rounded p-3">
          <p className="text-base flexcol gap-2">
            <span className="font-semibold">Problem Statement</span>
            <span className="text-sm">{team.problemState || ""}</span>
          </p>
        </div>
        <div className="border rounded p-3">
          <p className="text-base flexcol gap-2">
            <span className="font-semibold">Proposed Solution</span>
            <span className="text-sm">{team.proposeSolution || ""}</span>
          </p>
        </div>
      </div>
      {team.profileId === user.id || user.role === "ADMIN" ? (
        <Dialog onOpenChange={setOnClose} open={onClose}>
          <DialogTrigger asChild>
            <button className="border w-8 h-8 center rounded-full ">
              <Pencil className="w-4 h-4" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Edit Team profile</DialogTitle>
              <DialogDescription>
                Make changes to the team profile. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(updateTeamProfile)}
                className="space-y-8"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="problemState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs text-zinc-500 ">
                          Clearly define the existing challenge your project
                          addresses, creating awareness about the problem that
                          needs solving.
                        </FormLabel>
                        <FormControl>
                          <FormControl>
                            <textarea
                              placeholder="Proposed solution"
                              className="w-full custom-input custom-input-parent py-2 input_textarea text-sm placeholder:text-sm"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proposeSolution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-bold text-xs text-zinc-500 ">
                          Outline your actionable plan to resolve the identified
                          problem, detailing the steps and methods to achieve
                          positive outcomes.
                        </FormLabel>
                        <FormControl>
                          <textarea
                            id="proposedSolution"
                            placeholder="Proposed solution"
                            className="w-full custom-input custom-input-parent py-2 input_textarea text-sm placeholder:text-sm"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <button className="custom-button py-2 px-5">Update</button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
};

export default TeamOverview;
