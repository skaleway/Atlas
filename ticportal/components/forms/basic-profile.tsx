"use client";

import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { basicUserSchema } from "@/lib/validations";

const BasicProfile = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof basicUserSchema>>({
    defaultValues: {
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      description: user?.description!,
    },
    mode: "onChange",
  });

  // const { userId } = user;

  const {
    formState: { isSubmitting, errors },
  } = form;

  const handleChangeFirstfirstName = async (
    values: z.infer<typeof basicUserSchema>
  ) => {
    if (!user) return toast.error("Unauthorized");

    if (errors.description) {
      return toast.error("Check your fields values");
    }

    try {
      const res = await axios.put(`/api/user/${user.userId}`, values);
      if (res.status === 200) {
        toast.success("Profile updated successfull");
        // return window.location.reload();
      }
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  if (!user) return null;

  return (
    <div className="mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChangeFirstfirstName)}>
          <div className="w-full flexcol gap-4">
            <div className="flex lg:flex-row flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <section className="flexcol">
                      <FormLabel
                        className={cn("text-xs", {
                          "border-rose-500": errors.firstName,
                        })}
                      >
                        First name <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder={user.firstName!}
                          className={cn(
                            "w-full custom-input custom-input-parent py-2 text-sm my-1",
                            {
                              "border-rose-500": errors.firstName,
                              "opacity-50 cursor-not-allowed": isSubmitting,
                            }
                          )}
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                    </section>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <section className="flexcol">
                      <FormLabel
                        className={cn("text-xs", {
                          "border-rose-500": errors.firstName,
                        })}
                      >
                        Last name <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder={user.firstName!}
                          className={cn(
                            "w-full custom-input custom-input-parent py-2 text-sm my-1",
                            {
                              "border-rose-500": errors.firstName,
                              "opacity-50 cursor-not-allowed": isSubmitting,
                            }
                          )}
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                    </section>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <section className="flexcol">
                      <FormLabel
                        className={cn("text-xs", {
                          "border-rose-500": errors.firstName,
                        })}
                      >
                        Bio <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder={
                            user.description ||
                            "I'm a passionate young english speaking student from Cameroon"
                          }
                          className={cn(
                            "w-full custom-input h-20 custom-input-parent py-2 text-sm my-1 resize-none",
                            {
                              "border-rose-500": errors.firstName,
                              "opacity-50 cursor-not-allowed": isSubmitting,
                            }
                          )}
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                    </section>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full  justify-end flex">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn("custom-button", {
                  "opacity-50 cursor-not-allowed": isSubmitting,
                })}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BasicProfile;
