"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema, passwordSchema } from "@/lib/validations";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";

const EmailForm = ({ userData }: { userData: User }) => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: userData.email,
      newEmail: "",
    },
  });

  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    formState: { isSubmitting, errors },
    getValues,
  } = form;

  const { email, newEmail } = getValues();

  async function handleChangeEmail(data: z.infer<typeof emailSchema>) {
    if (!isLoaded) {
      return null;
    }

    if (email === newEmail) {
      return toast.error("The emails are identical");
    }

    setTimeout(() => {
      console.log("things");
    }, 5000);
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChangeEmail)}>
          <div className="w-full flexcol gap-4">
            <div className="flexcol gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(errors.email && "text-rose-500")}>
                      Current email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={userData.email}
                        className={cn(
                          "resize-none cursor-not-allowed opacity-50",
                          errors.email && "border-rose-500"
                        )}
                        disabled={isSubmitting}
                        {...field}
                        value={userData.email}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newEmail"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel
                      className={cn(errors.newEmail && "text-rose-500")}
                    >
                      New email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`ex: ${userData.email}`}
                        className={cn(errors.newEmail && "border-rose-500", {
                          "disabled:cursor-not-allowed disabled:opacity-50":
                            isSubmitting,
                        })}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      className={cn(
                        "bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 w-36 absolute right-1 top-[40%] h-1/2",
                        {
                          "disabled:cursor-not-allowed disabled:opacity-50":
                            isSubmitting,
                        }
                      )}
                      disabled={isSubmitting}
                    >
                      Update
                    </Button>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailForm;
