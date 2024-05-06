import { Metadata } from "next";

import { currentProfile } from "@/lib/current-profile";
import AllowMessagesFrom from "@/components/forms/allow-message";

export const metadata: Metadata = {
  title: "Inbox Settings",
};

const InboxSettings = async () => {
  const user = await currentProfile();
  return (
    <div>
      <AllowMessagesFrom />
    </div>
  );
};

export default InboxSettings;
