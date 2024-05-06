"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

import TutorialOne from "@/tutorials/tutorial1.mdx";
import TutorialTwo from "@/tutorials/tutorial2.mdx";
import TutorialThree from "@/tutorials/tutorial3.mdx";
import TutorialFour from "@/tutorials/tutorial4.mdx";
import TutorialFive from "@/tutorials/tutorial5.mdx";
// import Stage1 from "@/tutorials/stage1";
// import Stage2 from "@/tutorials/stage2";
// import Stage3 from "@/tutorials/stage3";
// import Stage4 from "@/tutorials/stage4";
// import Stage5 from "@/tutorials/stage5";

const ClientStage = () => {
  const pathname = usePathname();
  const location = pathname.split("/")[2];

  const locationLength = location.split("").length;

  // console.log(locationLength);

  const fetchData = async () => {
    try {
      if (locationLength > 24) return toast.success("Invalid Url");

      const { data } = await axios.get(`/api/stages/${location}`);

      return data;
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const { data: stage, status, error } = useQuery({
    queryKey: ["Stage"],
    queryFn: fetchData,
  });

  if (status === "error") return <p>something happened: {error.message}</p>;
  if (status === "pending") return <p>Loading...</p>;
  console.log(stage)
  const locations = [
    "658577faf505b6edb17647e5",
    "658577f0f505b6edb17647e4",
    "658577e5f505b6edb17647e3",
    "658577d9f505b6edb17647e2",
    "658577c5f505b6edb17647e1",
  ];

  const isLocationMatch = locations.some((location) => location);

  console.log(isLocationMatch);

  return (
    <div>
      {/* {statuses} */}
      {location === "658577c5f505b6edb17647e1" && <TutorialOne/>}
      {location === "658577d9f505b6edb17647e2" && <TutorialTwo/>}
      {location === "658577e5f505b6edb17647e3" && <TutorialThree/>}
      {location === "658577f0f505b6edb17647e4" && <TutorialFour/>}
      {location === "658577faf505b6edb17647e5" && <TutorialFive/>}

    </div>
  );
};

export default ClientStage;
