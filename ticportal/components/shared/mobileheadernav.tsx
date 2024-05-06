"use client";

import { AlignJustify, Bell, ChevronRight, LogOut, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { User as UserProfile } from "@prisma/client";
// import Image from "next/image";

import Logo from "./logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { alertRoutes, settingsRoute } from "@/constants";
import { getUser, useFallbackText } from "@/constants/indexfxns";
import Profile from "./profile";

const Mobileheadernav = () => {
  const pathname = usePathname();
  const location = pathname.split("/")[1].split("-admin").join(" ");
  const [user, setUser] = useState<UserProfile | null | undefined>();

  const [isActive, setIsActive] = useState(false);
  const fallBackText = useFallbackText(user as UserProfile);

  const { signOut } = useClerk();

  const router = useRouter();

  const leftRoutes = alertRoutes();
  const settingsRoutes = settingsRoute();

  const handleSignOut = () => {
    signOut(() => router.push("/sign-in"));
  };

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

  const changeRoute = (route: string) => {
    router.push(route);
  };

  return (
    <header className="flex-center h-[56px] sticky top-0 flex-between border-b px-10 lg:hidden ">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger>
            <div className="h-8 w-8 min-w-[32px] center border rounded-full cursor-pointer flex relative overflow-hidden">
              <Profile imageUrl={user?.imageUrl!} fallBackText={fallBackText} />
            </div>
          </SheetTrigger>
          <SheetContent className="sheet top-14" side="left">
            <ul className="flexcol gap-2 mt-5">
              {leftRoutes.map((route, index) => {
                if (!user) return;

                const href = index === 0 ? `/${user.username!}` : route.path;

                return (
                  <SheetClose asChild key={route.name}>
                    <li
                      className="w-full flex links "
                      onClick={() => changeRoute(href)}
                    >
                      {route.name} <ChevronRight className="w-4 h-4" />
                    </li>
                  </SheetClose>
                );
              })}
              <SheetClose asChild>
                <li
                  className="links text-rose-500 justify-start gap-2 font-medium"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" /> Log out
                </li>
              </SheetClose>
            </ul>
          </SheetContent>
        </Sheet>
        <p className="capitalize font-medium text-base">{location}</p>
      </div>
      {pathname === "/" && <Logo />}
      {pathname.startsWith("/settings") ? (
        <div>
          <Sheet>
            <SheetTrigger>
              <div
                className="h-8 w-8 center border rounded-full cursor-pointer flex relative z-50 "
                onClick={() => setIsActive(!isActive)}
              >
                {isActive ? (
                  <X className="w-4 h-4" />
                ) : (
                  <AlignJustify className="h-4 w-4" />
                )}
              </div>
            </SheetTrigger>
            <SheetContent className="sheet top-14" side="right">
              {settingsRoutes.map((route) => {
                return (
                  <SheetClose asChild key={route.name}>
                    <li
                      className="w-full flex links "
                      onClick={() => changeRoute(route.path)}
                    >
                      {route.name} <ChevronRight className="w-4 h-4" />
                    </li>
                  </SheetClose>
                );
              })}
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <Link
          href="/notifications"
          className="h-8 w-8 center border rounded-full cursor-pointer"
        >
          <Bell className="h-4 w-4" />
        </Link>
      )}
    </header>
  );
};

export default Mobileheadernav;
