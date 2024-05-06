import { initialProfile } from "@/lib/admin-profile";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await initialProfile();
  if (
    !user?.schoolName ||
    !user?.location ||
    !user?.howYoulearnAboutUs ||
    user?.role !== "ADMIN"
  ) {
    // if (profile.role !== "ADMIN") {
    return redirect("/settings/profile");
    // }
  }
  return <div>testing some content!</div>;
};

export default Page;
