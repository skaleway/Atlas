import { Metadata } from "next";

import { currentProfile } from "@/lib/current-profile";
import LineText from "@/components/shared/linetext";
import Invite from "@/components/shared/invite";

export const metadata: Metadata = {
  title: "Invite Settings",
};

const InviteSettings = async () => {
  const user = await currentProfile();
  const username = user?.username?.split("-admin").join("");

  const usernameDisplay =
    user?.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : username;

  if (!user) return null;
  return (
    <div>
      <div className="border rounded-[8px] p-3 flexcol">
        <Invite
          inviteType="link"
          username={username}
          displayName={usernameDisplay}
        />
        <LineText />
        <Invite inviteType="email" />
        <LineText />
        <Invite inviteType="dm" />
      </div>
    </div>
  );
};

export default InviteSettings;
