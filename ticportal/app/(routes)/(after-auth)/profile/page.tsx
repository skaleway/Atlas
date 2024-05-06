import { Metadata } from "next";

import { currentProfile } from "@/lib/current-profile";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = async () => {
  const user = await currentProfile();

  // console.log(user);

  return <main className="">profile</main>;
};

export default Profile;
