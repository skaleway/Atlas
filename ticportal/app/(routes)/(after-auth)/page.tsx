import { Metadata } from "next";
import { ROLE } from "@prisma/client";
import { redirect } from "next/navigation";

import Greetings from "@/components/dashboard/greetings";
import InitialModal from "@/components/modals/initial-modal";
import GlobalText from "@/components/shared/text";
import { initialProfile } from "@/lib/admin-profile";
import { db } from "@/lib/db";
import { Progress } from "@/components/ui/progress";
import { useStages } from "@/constants";
import Stage from "@/components/stages/stage";
import StagesProfile from "@/components/stages/stages";
// import HowYouKnewAboutUs from "@/components/modals/howyouknewaboutus";

export const metadata: Metadata = {
  title: "Dashboard",
};

const LandingPage = async () => {
  const profile = await initialProfile();

  if (!profile) return redirect("/sign-in");
  const stageLength = 5;

  const userStage = (1 / stageLength) * 100;

  const team = await db.team.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  const role = profile.role;

  if (
    profile.role === "PARTICIPANT" &&
    (!profile.schoolName || !profile.location || !profile.howYoulearnAboutUs)
  ) {
    return redirect("/settings/profile");
  }

  if (profile.role === "ADMIN") return redirect("/panel");

  if (!team && role === "PARTICIPANT") {
    return <InitialModal user={profile} />;
  }

  return (
    <div>
      <Greetings />
      <div className="flexcol gap-4">
        <p>Stage: 1/5</p>

        {/* section */}
        <div className="flexcol gap-1">
          <GlobalText>Your progress</GlobalText>
          <Progress value={userStage} className="w-[60%]" />
        </div>
        {/* stages here */}
        <StagesProfile />
      </div>
    </div>
  );
};

export default LandingPage;
