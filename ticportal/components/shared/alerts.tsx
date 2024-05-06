"use client";

import React from "react";
import { usePathname } from "next/navigation";

import AlertNav from "../alertnav";
import SettingsRoutes from "./settingsRoutes";
import Conversations from "@/components/messages/conversations";
import CourseDetails from "@/components/manage/course-details";

const Alerts = () => {
  const pathname = usePathname();
  const settingsConditions = [
    "/settings/profile",
    "/settings/tools",
    "/settings/invite",
    "/settings/notifications",
    "/settings/account",
  ];

  const inboxSettings = pathname.startsWith("/inbox");

  const isSettingsPage = pathname.startsWith("/settings");

  // const pattern = /^\/manage$/
  const pattern = /^\/manage\/(?<stageId>[a-zA-Z0-9]+)\/courses\/(?<courseId>[a-zA-Z0-9]+)$/
  const match = pathname.match(pattern);
  let isAdminSpecificCoursePage = match && !pathname.endsWith('new');
  const stageId = match?.groups?.stageId as string
  const courseId = match?.groups?.courseId as string

  return (
    <div className="lg:border-r border-l max-w-[348px] w-full lg:flex hidden flex-col">
      <AlertNav />
      <div className="flex-1 ">
        {isAdminSpecificCoursePage && <CourseDetails stageId={stageId} courseId={courseId} />}
        {isSettingsPage && <SettingsRoutes />}
        {inboxSettings && <Conversations />}
      </div>
    </div>
  );
};

export default Alerts;
