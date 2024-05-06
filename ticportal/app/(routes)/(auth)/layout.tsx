import React, { ReactNode } from "react";

import Logo from "@/components/shared/logo";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const profile = await currentProfile();

  if (profile) return redirect("/");

  return (
    <main className="h-screen flex items-center justify-center flex-col gap-10">
      <Logo />
      <div className="w-[90%] h-fit rounded-lg p-10 lg:max-w-xl relative overflow-hidden">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
