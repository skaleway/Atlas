"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const TeamHeader = () => {
  const routes = ["overview", "mentors", "members"];
  const pathname = usePathname();
  const router = useRouter();

  const teamId = pathname.split("/")[2];
  return (
    <header className="flex w-full border-b">
      <ul className="flex-center w-[90%] mx-auto gap-2">
        {routes.map((route) => {
          // some code here
          const path =
            route === "overview"
              ? `/teams/${teamId}`
              : `/teams/${teamId}/${route}`;
          return (
            <li
              key={route}
              className={cn(
                "capitalize py-2 cursor-pointer flex-1 center relative slowmo",
                {
                  "before:h-[3px] before:rounded-t before:rounded-r opacity-100 before:w-full before:bottom-0 before:left-0 before:bg-background before:absolute":
                    pathname === path,
                }
              )}
              onClick={() => router.push(path)}
            >
              {route}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default TeamHeader;
