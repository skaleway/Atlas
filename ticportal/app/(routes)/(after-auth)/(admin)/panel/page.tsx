import { Metadata } from "next";
import React from "react";

import ClientUserTable from "@/components/admin/client-user-table";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin control panel",
};

const ControlPanel = async () => {
  return <ClientUserTable />;
};

export default ControlPanel;
