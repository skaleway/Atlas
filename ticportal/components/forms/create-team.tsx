"use client";

import React from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { initialModalSchema } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import FileUpload from "@/components/shared/fileupload";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { toast } from "sonner";

const CreateForm = ({ user }: { user: User }) => {
  const createForm = useForm({
    resolver: zodResolver(initialModalSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const router = useRouter();

  const isLoading = createForm.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof initialModalSchema>) => {
    try {
      const { data } = await axios.post("/api/teams", values);

      if (data) {
        return router.push(`/teams/${data.id}`);
      }

      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Form {...createForm}>
      <form onSubmit={createForm.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8 px-6">
          <div className="flex items-center justify-center text-center race">
            <FormField
              control={createForm.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endPoint="teamProfile"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={createForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase font-bold text-xs text-zinc-500 ">
                  Team Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-300/50 border-0 text-background"
                    placeholder="Enter Team name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="bg-gray-100 py-4 px-5">
          <Button disabled={isLoading} variant={"primary"}>
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateForm;
