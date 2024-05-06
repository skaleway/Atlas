import AuthForm from "@/components/forms/authform";
import React from "react";

import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign-in",
  description: "Sign in to reconnect with participants",
};

const Login = async () => {
  const user = await currentUser();

  if (user) {
    return redirect("/");
  }

  return (
    <div>
      <AuthForm formType="Login" />
    </div>
  );
};

export default Login;
