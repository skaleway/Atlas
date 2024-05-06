import AuthForm from "@/components/forms/authform";
import { initialProfile } from "@/lib/admin-profile";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Recover your already created user",
};

const Login = async () => {
  const profile = await initialProfile();

  if (profile) return redirect("/");

  return <AuthForm formType="Login" />;
};

export default Login;
