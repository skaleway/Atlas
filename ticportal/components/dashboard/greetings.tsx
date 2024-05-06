"use client";

import React, { useEffect, useState } from "react";
import { User as UserProfile } from "@prisma/client";

import { getGreeting, getUser, useUsername } from "@/constants/indexfxns";

const Greetings = () => {
  const [user, setUser] = useState<UserProfile | null | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const greetingsText = getGreeting();
  const username = useUsername(user as UserProfile);

  if (!user) return null;

  return (
    <h1 className="flex gap-2 font-bold text-2xl">
      <span>{greetingsText}</span>
      <span className="capitalize">{username}</span>
      👋,
    </h1>
  );
};

export default Greetings;
