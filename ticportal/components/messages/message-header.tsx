"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MoreVertical } from "lucide-react";

import { someConversations } from "@/constants";
import zenith from "@/public/zenith.jpg";
// import { Button } from "@/components/ui/button";

const MessageHeader = () => {
  const conversations = someConversations();

  const pathname = usePathname();

  const location = pathname.split("/")[2];

  const userConversation = conversations.find(
    (conversation) => conversation.path === location
  );

  if (!userConversation) return;

  return (
    <div className="flex px-6 gap-2 items-center border-b bg-white py-2 h-[70px]">
      <Image
        src={zenith}
        width={50}
        height={50}
        alt="user Image"
        className="w-[50px] h-[50px] rounded-full object-cover min-w-[50px]"
      />
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="flex items-center">
            <span className="font-semibold text-base">
              {userConversation.name}
            </span>
          </p>
          <p className="text-zinc-500">
            Lorem ipsum dolor, sit amet consectetur
          </p>
        </div>
        <button className="border p-2 rounded-full cursor-pointer">
          <MoreVertical className="w-4 h-4 " />
        </button>
      </div>
    </div>
  );
};

export default MessageHeader;
