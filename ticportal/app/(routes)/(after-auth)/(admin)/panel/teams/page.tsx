import ClientTeamTable from "@/components/admin/client-team-table";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Teams",
  description: "Teams for all",
};

const Page = () => {
  return <ClientTeamTable />;
};

export default Page;
