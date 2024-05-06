import React from "react";

import MessageHeader from "./message-header";
import Messages from "./messages";

const MessageBody = () => {
  return (
    <div className="flex-1 flex flex-col">
      <MessageHeader />
      <Messages />
    </div>
  );
};

export default MessageBody;
