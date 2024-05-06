import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import Message from "./message";

const Messages = () => {
  return (
    <ScrollArea className="messages">
      {Array.from({ length: 6 }).map((_, index) => {
        //some code here
        return <Message key={index} />;
      })}
    </ScrollArea>
  );
};

export default Messages;
