"use client";

import { User } from "@prisma/client";
import { User as UserIcon } from "lucide-react";

import LineText from "@/components/shared/linetext";
import ProfileImage from "./profile-image";
import BasicProfile from "./basic-profile";
import ContactInfo from "./contact-info";
import ParticipantInfo from "./participant-info";
import UserInsights from "./user-insights";

const ProfileForm = ({ userData }: { userData: User }) => {
  return (
    <div className="h-full w-full">
      <LineText>
        <p className="flex items-center justify-center gap-2">
          <UserIcon className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">Basic profile</span>
        </p>
      </LineText>
      <ProfileImage
        user={userData}
        name="text"
        type="profile-picture"
        userId={userData?.userId}
      />
      <BasicProfile user={userData} />
      <ParticipantInfo user={userData} />
      <UserInsights user={userData} />
      <ContactInfo user={userData} />
    </div>
  );
};

export default ProfileForm;
