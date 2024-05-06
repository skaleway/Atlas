import ClientCoordinatorTable from "@/components/admin/client-coordinators-table";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Coordinators",
  description: "Teams for all",
};

const Page = () => {
  return <ClientCoordinatorTable />;
};

export default Page;
