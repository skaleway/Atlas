import { Metadata } from "next";
import { User } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import DangerZone from "@/components/account/danger-zone";
import Username from "./username";

export const metadata: Metadata = {
  title: "Account",
};

const AccountSettings = async () => {
  const user = await currentProfile();

  return (
    <div>
      <Username user={user as User} />
      <DangerZone userData={user as User} />
    </div>
  );
};

export default AccountSettings;
