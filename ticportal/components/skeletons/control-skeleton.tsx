import { cn } from "@/lib/utils";
import { Shield, User, Users } from "lucide-react";
import React from "react";

const ControlSkeleton = () => {
  const contentData = [
    {
      name: "Total Students",
      icon: User,
      pathname: "/panel",
    },
    {
      name: "Total Teams",
      icon: Users,
      pathname: "/panel/teams",
    },
    {
      name: "Total Coordinators",
      icon: Shield,
      pathname: "/panel/coordinators",
    },
  ];
  return (
    <div className="flex lg:flex-row flex-col gap-4">
      {contentData.map((item) => {
        //some code here
        return (
          <div
            key={item.name}
            className={cn(
              "p-2  border flex-1 rounded text-sm group cursor-pointer slowmo hover:bg-slate-50"
            )}
          >
            <p className="font-medium flex-center gap-2 group-hover:underline">
              <item.icon className="w-3 h-3" /> <span>{item.name}</span>
            </p>
            <h1 className="font-bold text-xl">counting...</h1>
          </div>
        );
      })}
    </div>
  );
};

export default ControlSkeleton;
