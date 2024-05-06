import MessageBody from "@/components/messages/messageBody";
import MessageFooter from "@/components/messages/messageFooter";
import React from "react";

const ConversationsId = () => {
  return (
    <main className="flex-1 h-full w-full flex flex-col children">
      <MessageBody />
      <MessageFooter />
    </main>
  );
};

export default ConversationsId;
