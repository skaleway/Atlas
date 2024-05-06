import { settingsRoute } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SettingsRoutes = () => {
  const routes = settingsRoute();

  const location = usePathname();

  return (
    <ul className="h-full w-full flex flex-col gap-1 py-6">
      {routes.map((route) => {
        const isActive = location === route.path;
        return (
          <Link
            href={route.path}
            key={route.name}
            className={cn(
              "text-sm py-3 px-6 hover:bg-foreground slowmo relative",
              {
                "bg-foreground before:h-full before:w-1 before:left-0 before:top-0 before:bg-background before:absolute font-bold":
                  isActive,
              }
            )}
          >
            {route.name}
          </Link>
        );
      })}
    </ul>
  );
};

export default SettingsRoutes;
