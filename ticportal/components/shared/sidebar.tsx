"use client";

import React from "react";

import Logo from "./logo";
import { sidebarRoutes } from "@/constants";
import SideItem from "./sideItem";
import { usePathname } from "next/navigation";
import { teamProfile } from "@/types";
import SidebarTeamprofile from "./sidebarTeamprofile";
import ChatRoomProfile from "./chatroomprofile";
import { User } from "@prisma/client";

const Sidebar = ({ team, user }: { team: teamProfile; user: User }) => {
  const routes = sidebarRoutes();
  const pathname = usePathname();

  const date = new Date().getFullYear();
  return (
    <aside className="lg:border-r pr-4 max-w-[211px] w-full flex-between flex-col pb-4 hidden lg:flex pl-4 2xl:pl-0 h-screen sticky top-0">
      <div className="flex flex-1 flex-col gap-16">
        <div className="h-[56px] flex  items-center">
          <Logo />
        </div>
        <ul>
          {routes
            .filter(
              (route) => {
                  return !(user.role === "ADMIN" && ["/contact"].includes(route.path)) &&
                      !(user.role !== "ADMIN" && ["/manage"].includes(route.path))
              }
            )
            .map((route, index) => {
              const href =
                user.role === "ADMIN" && index === 0 ? "/panel" : route.path;
              const isActive = pathname.startsWith(href);

              return (
                <SideItem
                  name={route.name}
                  iconImage={route.icon}
                  path={href}
                  isActive={isActive}
                  key={href}
                />
              );
            })}

          {team && <SidebarTeamprofile teamProfile={team} />}

        </ul>
      </div>

      <p>
        &copy; <span>TiC Summit {date}</span>
      </p>
    </aside>
  );
};

export default Sidebar;
