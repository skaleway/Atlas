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
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordSchema } from "@/lib/validations";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { User } from "@prisma/client";

const PasswordForm = ({ userData }: { userData: User }) => {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    formState: { isSubmitting },
  } = form;

  async function handleChangePassword(data: z.infer<typeof passwordSchema>) {
    if (!isLoaded) {
      return null;
    }

    if (data.password !== data.confirm) {
      return toast.error("Passwords don't match");
    }
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleChangePassword)}
          className="w-full flexcol gap-4"
        >
          <div>
            <div className="flexcol gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New password"
                        disabled={isSubmitting}
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        className="pr-36"
                        type="password"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 w-36 absolute right-1 top-[40%] h-1/2"
                    >
                      Update
                    </Button>
                    <FormMessage />
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

export default PasswordForm;
