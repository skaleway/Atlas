import React from "react";
import { User } from "@prisma/client";
import { CloudSunRain } from "lucide-react";
import * as z from "zod";

import LineText from "@/components/shared/linetext";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { participantsInsights } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";

type fieldName =
  | "somethingDone"
  | "whyYouAttending"
  | "age"
  | "howYoulearnAboutUs";

const UserInsights = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof participantsInsights>>({
    defaultValues: {
      somethingDone: user.somethingDone ? user.somethingDone : "",
      whyYouAttending: user.whyYouAttending ? user.whyYouAttending : "",
      howYoulearnAboutUs: user.howYoulearnAboutUs
        ? user.howYoulearnAboutUs
        : "",
      age: user.age ? user.age : 0,
    },
  });

  const {
    formState: { isSubmitting, errors },
  } = form;

  const handleUpdateParticipantInfo = async (
    values: z.infer<typeof participantsInsights>
  ) => {
    if (!user) return toast.error("Unauthorized");

    const age = values.age;

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

  const strings = [
    {
      name: "somethingDone",
      question: "Tell us something impressive you have done",
      placeholder: user.somethingDone
        ? user.somethingDone
        : "From anything creative, to passing your exams, Winning an award and so on",
    },
    {
      name: "whyYouAttending",
      question: "Why are you attending the Summit",
      placeholder: user.whyYouAttending
        ? user.whyYouAttending
        : "Is there anything you plan to accomplish by attending the Summit?",
    },
    {
      name: "age",
      question: "Your age",
      placeholder: "Please enter your age",
    },
    {
      name: "howYoulearnAboutUs",
      question:
        "How did you know about TiC Summit? Give the name of the person or the Organization",
      placeholder: "Give us a name",
    },
  ];

  return (
    <div className="mt-8">
      <LineText>
        <p className="flex items-center justify-center gap-2">
          <CloudSunRain className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">
            Participant insights
          </span>
        </p>
      </LineText>
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateParticipantInfo)}>
            <div className="w-full flexcol gap-4">
              {strings.map(({ name, question, placeholder }, index) => (
                <div
                  className="flex lg:flex-row flex-col gap-3 w-full "
                  key={index}
                >
                  <FormField
                    control={form.control}
                    key={index}
                    name={name as fieldName}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <section className="flexcol">
                          <FormLabel className={cn("text-xs", {})}>
                            {question} <span className="text-rose-500">*</span>
                          </FormLabel>
                          {name === "age" ? (
                            <FormControl>
                              <input
                                placeholder={placeholder}
                                {...field}
                                className={cn(
                                  "w-full custom-input custom-input-parent py-2 text-sm my-1",
                                  {
                                    "border-rose-500": errors[name],
                                    "opacity-50 cursor-not-allowed":
                                      isSubmitting,
                                  }
                                )}
                                type="number"
                                disabled={isSubmitting}
                              />
                            </FormControl>
                          ) : (
                            <FormControl>
                              <textarea
                                placeholder={placeholder}
                                className={cn(
                                  "w-full custom-input h-20 custom-input-parent py-2 text-sm my-1 resize-none"
                                )}
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                          )}
                        </section>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <section className="w-full justify-end flex mt-4">
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserInsights;
