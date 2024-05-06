"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const HeaderTab = () => {
  const pathname = usePathname();
  const router = useRouter();
  const links = ["people", "teams"];

  return (
    <div className="flex-center px-6 absolute top-0 left-0 w-full border-b bg-white z-50">
      {links.map((link) => {
        //some code here
        const isActive = pathname === `/${link}`;

        return (
          <p
            key={link}
            className={cn(
              "capitalize px-8 py-[10px] cursor-pointer relative opacity-80",
              {
                "before:h-[3px] before:rounded-t before:rounded-r opacity-100 before:w-full before:bottom-0 before:left-0 before:bg-background before:absolute":
                  isActive,
              }
            )}
            onClick={() => router.push(`/${link}`)}
          >
            {link}
          </p>
        );
      })}
    </div>
  );
};

export default HeaderTab;
