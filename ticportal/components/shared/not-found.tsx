"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ContentNotFound = ({
  contentType,
  params,
}: {
  contentType: "user" | "team";
  params: string;
}) => {
  const router = useRouter();
  const path = contentType === "team" ? "/teams" : "/";

  return (
    <div className="center  border page rounded flexcol gap-2">
      <p>
        {contentType === "user" ? "User" : "Team"}:{" "}
        <span className="font-bold">{params} </span> not found
      </p>
      <button className="custom-button" onClick={() => router.push(path)}>
        Back to {contentType === "team" ? "Teams" : "home"}
      </button>
    </div>
  );
};

export default ContentNotFound;
