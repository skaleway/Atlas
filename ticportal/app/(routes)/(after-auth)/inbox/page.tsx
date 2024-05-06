// import { Button } from "@/components/ui/button";
import NewMessages from "@/components/messages/newmessage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox",
};

const Apply = () => {
  return (
    <div className="children  center">
      <div className="flex flex-col items-center gap-2">
        <p>Select an existing conversation or start a new one</p>
        <NewMessages />
      </div>
    </div>
  );
};

export default Apply;
