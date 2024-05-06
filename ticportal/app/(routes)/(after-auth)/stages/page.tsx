import LineText from "@/components/shared/linetext";
import { useStages } from "@/constants";
import { Tornado } from "lucide-react";
import { Metadata } from "next";
import StagesProfile from "@/components/stages/stages";
import { initialProfile } from "@/lib/admin-profile";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Stages",
};

const Stages = async () => {
  const user = await initialProfile();
  const stages = useStages;

  if (!user?.schoolName || !user?.location || !user?.howYoulearnAboutUs) {
    if (user?.role !== "ADMIN") {
      return redirect("/settings/profile");
    }
  }

  return (
    <div>
      {/*<LineText>*/}
      {/*  <p className="flex items-center justify-center gap-2 px-4">*/}
      {/*    <Tornado className="w-4 h-4" />*/}
      {/*    <span className="text-xs uppercase font-bold">*/}
      {/*      Total of {stages.length} stages*/}
      {/*    </span>*/}
      {/*  </p>*/}
      {/*</LineText>*/}
      <StagesProfile />
    </div>
  );
};

export default Stages;
