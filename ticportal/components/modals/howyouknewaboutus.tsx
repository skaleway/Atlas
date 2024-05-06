"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserInfos } from "@prisma/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const personsName = z.object({
  name: z.string().min(5, { message: "A minimum of 5 characters is requires" }),
});

const HowYouKnewAboutUs = ({ isAvail }: { isAvail: null | UserInfos }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [onClose, setOnClose] = useState(() => {
    if (isAvail) return false;

    return true;
  });

  // console.log(onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(personsName),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof personsName>) => {
    try {
      const { data } = await axios.post("/api/how", values);

      if (data) {
        setOnClose(false);
        toast.success("Thanks for the feedback!");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went Wrong");
    }
  };

  const isLoading = form.formState.isLoading;

  console.log(isLoading);

  if (!isMounted) return null;

  return (
    <Dialog open={onClose}>
      <DialogContent className="bg-white rounded text-background overflow-hidden p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl lg:text-2xl text-center font-bold">
            What person or organization told you about TiC Summit?*
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            The TiC Summit comes highly recommended by a respected source,
            emphasizing the person or organization really helps.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-4/5 mx-auto">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        className={cn({
                          "cursor-not-allowed opacity-50": isLoading,
                        })}
                        placeholder="Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter
              className={cn("bg-gray-100 py-4 px-5", {
                "cursor-not-allowed opacity-50": isLoading,
              })}
            >
              <Button disabled={isLoading} variant={"primary"}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default HowYouKnewAboutUs;
