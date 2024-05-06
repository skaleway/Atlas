"use client";

import { cn } from "@/lib/utils";
import React from "react";

const GlobalText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
};

export default GlobalText;
