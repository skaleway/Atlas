import { Metadata } from "next";

import ContactForm from "@/components/forms/contactform";
import { initialProfile } from "@/lib/admin-profile";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = async () => {
  const user = await initialProfile();

  if (
    user?.role === "PARTICIPANT" &&
    (!user?.schoolName || !user?.location || !user?.howYoulearnAboutUs)
  ) {
    return redirect("/settings/profile");
  }

  return (
    <div>
      <ContactForm />
    </div>
  );
};

export default Contact;
