import Alerts from "@/components/shared/alerts";
import Mobileheadernav from "@/components/shared/mobileheadernav";
import MobileNav from "@/components/shared/mobilenav";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { userTeam } from "@/lib/userTeam";
import { teamProfile } from "@/types";
import { User } from "@prisma/client";
import React, { ReactNode } from "react";

const BeforeAuthLayout = async ({ children }: { children: ReactNode }) => {
  const team = await userTeam();
  const user = await currentProfile();

  return (
    <div className="min-h-screen flex ">
      <Sidebar team={team as teamProfile} user={user as User} />
      <div className="flex-1">
        <Navbar />
        <MobileNav user={user as User} />
        <Mobileheadernav />
        <main className="children">
          <ScrollArea className="w-full h-full page relative">
            {children}
          </ScrollArea>
        </main>
      </div>
      <Alerts />
    </div>
  );
};

export default BeforeAuthLayout;
