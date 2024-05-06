"use client";

import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { contactInfos } from "@/lib/validations";
import axios from "axios";
import { toast } from "sonner";
import LineText from "../shared/linetext";
import { Contact } from "lucide-react";

const ContactInfo = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof contactInfos>>({
    defaultValues: {
      email: user?.email || "",
      phone: user?.phone || "",
      secondaryEmail: user?.secondaryEmail || "",
    },
  });

  //   const { userId } = user;

  const {
    formState: { isSubmitting, errors },
  } = form;

  const handleSubmit = async (values: z.infer<typeof contactInfos>) => {
    // const {email, phone, secondaryEmail} = values

    try {
      const res = await axios.put(`/api/user/${user.userId}`, values);
      if (res.status === 200) {
        toast.success("Contact updated successfull");
        return window.location.reload();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (!user) return null;

  return (
    <div className="mt-8">
      <LineText>
        <p className="flex items-center justify-center gap-2">
          <Contact className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">contact info</span>
        </p>
      </LineText>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="w-full flexcol gap-4">
            <div className="flex lg:flex-row flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <section className="flexcol">
                      <FormLabel
                        className={cn("text-xs", {
                          "border-rose-500": errors.email,
                        })}
                      >
                        email <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder={user.email!}
                          className={cn(
                            "w-full custom-input custom-input-parent py-2 text-sm my-1",
                            {
                              "border-rose-500": errors.email,
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <section className="flexcol">
                      <FormLabel
                        className={cn("text-xs", {
                          "border-rose-500": errors.email,
                        })}
                      >
                        Contact (WhatsApp){" "}
                        <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder={user.phone || "+237 679364294"}
                          className={cn(
                            "w-full custom-input custom-input-parent py-2 text-sm my-1",
                            {
                              "border-rose-500": errors.email,
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
                name="secondaryEmail"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <section className="flexcol">
                      <FormLabel
                        className={cn("text-xs", {
                          "border-rose-500": errors.email,
                        })}
                      >
                        Secondary email <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder={user.secondaryEmail || "test@gmail.com"}
                          className={cn(
                            "lg:w-1/2 w-full custom-input h-20 custom-input-parent py-2 text-sm my-1",
                            {
                              "border-rose-500": errors.email,
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

export default ContactInfo;
