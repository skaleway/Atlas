"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Pencil, User } from "lucide-react";
import Link from "next/link";
import { User as UserProfile } from "@prisma/client";
import Image from "next/image";

import { getUser, useFallbackText, useUsername } from "@/constants/indexfxns";
import SearchTeam from "@/components/teams/searchteam";
import NewMessages from "@/components/messages/newmessage";
import Profile from "./profile";
import {cn} from "@/lib/utils";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const location = pathname.split("/")[1].split("-admin").join(" ");

  const fallBackText = useFallbackText(user as UserProfile);
  const username = useUsername(user as UserProfile);

  const conversations = "/inbox";

  const conversationsId = pathname.startsWith(conversations);



  const conditions = [
    {
      check:
        pathname !== "/" &&
        pathname !== `/${user?.username}` &&
        pathname !== "/faq" &&
        pathname !== "/contact" &&
        pathname !== "/inbox" &&
        pathname !== "/stages" &&
        pathname !== "/teams" &&
        pathname !== "/panel" &&
        !conversationsId &&
        pathname !== "/apply" &&
        pathname !== "/people",

      element: (
        <button
          key="backButton"
          onClick={router.back}
          className="h-8 center border rounded-full w-8 "
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      ),
    },
    {
      check: pathname === "/",
      element: (
        <p key="dashboardText" className="font-semibold capitalize">
          Dashboard
        </p>
      ),
    },
    {
      check: pathname === "/profile",
      element: (
        <p key="profileText" className="font-semibold capitalize">
          Profile
        </p>
      ),
    },
    {
      check: pathname === "/people",
      element: (
        <p key="profileText" className="font-semibold capitalize">
          People
        </p>
      ),
    },
    {
      check: pathname.startsWith("/panel") && pathname.split("/").length > 2,
      element: (
        <p
          key="profileText"
          className="font-semibold capitalize flex-center gap-2"
        >
          <span>Control Panel</span>
          <ArrowRight className="w-4 h-4" />
          <span>{pathname.split("/")[2]}</span>
        </p>
      ),
    },
    {
      check: pathname.startsWith("/settings") && pathname.split("/").length > 2,
      element: (
        <p
          key="profileText"
          className="font-semibold capitalize flex-center gap-2"
        >
          <span>Settings</span>
          <ArrowRight className="w-4 h-4" />
          <span>{pathname.split("/")[2]}</span>
        </p>
      ),
    },
    {
      check: pathname === `/${user?.username?.split("-admin").join("")}`,
      element: (
        <div className="flex-center gap-2">
          <div className="h-8 w-8 min-w-[32px] center border rounded-full cursor-pointer flex relative overflow-hidden">
            <Profile imageUrl={user?.imageUrl!} fallBackText={fallBackText} />
          </div>
          <p className="font-semibold capitalize ">{username}</p>
        </div>
      ),
    },
  ];
  const isConditionMet = conditions.some(({ check }) => check);

  // console.log(isConditionMet);
  const isManageCourseRoute = pathname.startsWith("/manage")
  return !isManageCourseRoute ?
      (<header className={cn("flex-center h-[56px] px-6 border-b  lg:flex hidden flex-between")}>
      <div className="flex-center gap-4">
        {isConditionMet ? (
          conditions.map(
            ({ check, element }, index) =>
              check && React.cloneElement(element, { key: index })
          )
        ) : (
          <p
            key="profileText"
            className="font-semibold capitalize flex-center gap-2"
          >
            {location}
          </p>
        )}
      </div>
      <div>
        {pathname === `/${user?.username}` && (
          <Link
            href="/settings/profile"
            className="flex-center border rounded-full gap-2 text-sm px-3 p-1"
          >
            <Pencil className="w-4 h-4" /> Edit Profile
          </Link>
        )}
        {pathname === "/teams" && <SearchTeam />}
        {pathname === "/inbox" && <NewMessages />}

      </div>
    </header>
  ) :
  (
      // Manage courses CMS Header
      <header>
        <div className="flex-center h-[56px] px-6 border-b  lg:flex hidden flex-between">
          {pathname === '/manage' ?
            (
                <p className="font-semibold capitalize flex-center gap-2">Content Management</p>
            ) :
            (
              <button
                  key="backButton"
                  onClick={router.back}
                  className="h-8 center border rounded-full w-8 "
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )
          }
        </div>
      </header>
  )
};

export default Navbar;
