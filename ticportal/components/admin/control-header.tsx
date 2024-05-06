"use client";

import React, { useEffect, useState } from "react";

import { AnalyticsData } from "@/types";
import { getData } from "@/constants/indexfxns";
import { toast } from "sonner";
import { Shield, User, Users } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import ControlSkeleton from "../skeletons/control-skeleton";

const ControlHeader = () => {
  // const analytics = Array.from({ length: 3 });
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const router = useRouter();
  let percentageWeekCount;
  const pathname = usePathname();

  const { data, status } = useQuery({
    queryKey: ["analytic"],
    queryFn: getData,
  });

  if (status === "pending") return <ControlSkeleton />;
  if (status === "error") {
    toast.error("Something wrong happened");
    return "something went wrong";
  }

  const thisWeek = analytics?.currentWeek;
  const lastWeek = analytics?.weekBefore;
  const totalStudents = analytics?.totalStudents;
  const totolTeams = analytics?.totolTeams;
  const totalCoordinators = analytics?.totalCoordinators;

  const currentWeekCount = thisWeek?.weekly.accounts.length;
  const weekBeforeCount = lastWeek?.weekly.accounts.length;

  if (weekBeforeCount === 0) {
    percentageWeekCount = currentWeekCount === 0 ? 0 : 100;
  }

  percentageWeekCount =
    ((currentWeekCount! - weekBeforeCount!) / weekBeforeCount!) * 100;

  const contentData = [
    {
      name: "Total Students",
      icon: User,
      count: totalStudents || data.totalStudents,
      pathname: "/panel",
    },
    {
      name: "Total Teams",
      icon: Users,
      count: totolTeams || data.totolTeams,
      pathname: "/panel/teams",
    },
    {
      name: "Total Coordinators",
      icon: Shield,
      count: totalCoordinators || data.totalCoordinators,
      pathname: "/panel/coordinators",
    },
  ];

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      {contentData.map((item) => {
        //some code here

        const isActive = pathname === item.pathname;

        return (
          <div
            key={item.name}
            className={cn(
              "p-2  border flex-1 rounded text-sm group cursor-pointer slowmo hover:bg-slate-50",
              {
                "bg-slate-100": isActive,
              }
            )}
            onClick={() => router.push(item.pathname)}
          >
            <p className="font-medium flex-center gap-2 group-hover:underline">
              <item.icon className="w-3 h-3" /> <span>{item.name}</span>
            </p>
            <h1 className="font-bold text-3xl">{item.count}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default ControlHeader;
