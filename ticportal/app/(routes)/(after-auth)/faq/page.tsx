import Questions from "@/components/clients/faqAccordion";
import { initialProfile } from "@/lib/admin-profile";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "FAQ's",
};

const Faq = async () => {
  const user = await initialProfile();

  if (
    user?.role === "PARTICIPANT" &&
    (!user?.schoolName || !user?.location || !user?.howYoulearnAboutUs)
  ) {
    return redirect("/settings/profile");
  }

  return (
    <main className="flex content gap-2">
      <Questions />
    </main>
  );
};

export default Faq;
