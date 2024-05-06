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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validations";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    if (!isLoaded) {
      return null;
    }

    await signIn
      .create({
        identifier: data.email,
        password: data.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          toast.success("Logged in!");
          setActive({ session: result.createdSessionId });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.log(result);
        }
      })
      .catch((err) => toast.error(err.errors[0].longMessage));
  }

  return (
    <div className="h-full w-full">
      <p className="text_sm mb-8">Sign In</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flexcol gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="resize-none disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                    {...field}
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
                    className="resize-none disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex-between">
            <div className="flexcol gap-2">
              <Link className="underline" href="/register">
                Don&apos;t have an account?
              </Link>
              <Link className="underline" href="/forgotpassword">
                Forgot password?
              </Link>
            </div>
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 disabled:cursor-not-allowed"
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

export default Login;
