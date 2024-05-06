import { ArrowUp, Smile } from "lucide-react";
import React from "react";

const MessageFooter = () => {
  return (
    <div className="p-4 bg-foreground border-t h-[70px]">
      <div className="border bg-white h-10 flex items-center rounded-[20px] pr-2">
        <input
          type="text"
          className="outline-none focus:outline-none  h-full px-4 flex-1 overflow-hidden bg-transparent"
          placeholder="Write a message to "
        />

        <div className="flex items-center gap-2">
          <button className="w-7 h-7 bg-white border flex items-center justify-center rounded-full cursor-pointer">
            <Smile className="w-5 h-5" />
          </button>

          <button className="w-7 h-7 bg-background rounded-full cursor-pointer flex items-center justify-center">
            <ArrowUp className="w-5 h-5 text-white font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageFooter;
