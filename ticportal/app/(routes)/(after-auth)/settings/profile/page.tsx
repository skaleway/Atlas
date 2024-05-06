import { Metadata } from "next";

import { currentProfile } from "@/lib/current-profile";

import ProfileForm from "@/components/forms/profileform";
import { User } from "@prisma/client";

export const metadata: Metadata = {
  title: "Edit",
};

const Edit = async () => {
  const user = await currentProfile();

  return (
    <div>
      <ProfileForm userData={user as User} />
    </div>
  );
};

export default Edit;
