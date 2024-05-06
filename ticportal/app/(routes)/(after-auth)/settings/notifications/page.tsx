import { Metadata } from "next";

import { currentProfile } from "@/lib/current-profile";

export const metadata: Metadata = {
  title: "Notificaition Settings",
};

const NotificationsSettings = async () => {
  const user = await currentProfile();
  return <div>Notification Settings</div>;
};

export default NotificationsSettings;
