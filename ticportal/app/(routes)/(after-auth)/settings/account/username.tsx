"use client";

import { User } from "@prisma/client";
import { AtSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import * as z from "zod";

import LineText from "@/components/shared/linetext";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { usernameSchema } from "@/lib/validations";
import axios from "axios";
import { toast } from "sonner";

const Username = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof usernameSchema>>({
    defaultValues: {
      username: user?.username || "",
    },
    mode: "onChange",
  });

  const { userId } = user;

  const {
    formState: { isSubmitting, errors },
    watch,
  } = form;

  const username = watch("username");

  const { isLoaded } = useSignIn();

  const handleChangeUsername = async (
    values: z.infer<typeof usernameSchema>
  ) => {
    if (!isLoaded) return null;

    try {
      const res = await axios.put(`/api/user/${userId}`, values);
      if (res.status === 200) {
        return toast.success("Username updated successfull");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-full w-full">
      <LineText>
        <p className="flex items-center justify-center gap-2">
          <AtSign className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">change username</span>
        </p>
      </LineText>
      <p className="text-xs">
        You can change your username to another username that is not currently
        in use. TicPortal cannot set up redirects for links to your TicPortal
        profile that include your old username.
      </p>
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleChangeUsername)}>
            <div className="w-full flexcol gap-4">
              <div className="flexcol gap-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <section className="flexcol">
                        <FormLabel
                          className={cn("text-xs", {
                            "border-rose-500": errors.username,
                          })}
                        >
                          Username <span className="text-rose-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <input
                            placeholder={user.username!}
                            className={cn(
                              "w-3/4 custom-input custom-input-parent py-2 text-sm my-1",
                              {
                                "border-rose-500": errors.username,
                                "opacity-50 cursor-not-allowed": isSubmitting,
                              }
                            )}
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs">
                          Your TiCPortal profile URL:
                          https://ticportal.vercel.app/
                          {username}
                        </p>
                      </section>
                      <section className="w-full  justify-end flex">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn("custom-button", {
                            "opacity-50 cursor-not-allowed": isSubmitting,
                          })}
                        >
                          Update
                        </button>
                      </section>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Username;
