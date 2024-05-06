"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/validations";
import Verifier from "../clients/verificationinput";
import { toast } from "sonner";

const Register = () => {
  const { isLoaded, signUp } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const {
    formState: { isSubmitting },
    getValues,
  } = form;

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    if (!isLoaded) return;

    const { email, password, username } = data;

    const newName = username.split(" ").join("");

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        username: newName,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err: any) {
      return toast.error(err.errors[0].message);
    }
  }

  if (verifying) return <Verifier email={getValues().email} />;

  return (
    <div className="h-full w-full">
      <p className="text_sm mb-8">Sign Up</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flexcol gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    type="password"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex-between">
            <Link className="underline" href="/login">
              Already have an account?
            </Link>
            <div>
              <Button
                type="submit"
                className="bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
