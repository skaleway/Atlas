import { currentProfile } from "@/lib/current-profile";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const user = await currentProfile();

  if (!user)
    return {
      title: "Profile",
    };

  function cleanAndCapitalizeUsername(username: string) {
    // Remove non-alphanumeric characters and split the username into words
    const words = username.replace(/[^\w\s]/g, "").split(/\s+/);

    // Capitalize the first letter of each word
    const cleanedUsername = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return cleanedUsername;
  }

  const username = cleanAndCapitalizeUsername(user.username!);

  return {
    title: username,
  };
}

const User = async () => {
  const user = await currentProfile();
  return <main>User Profile page</main>;
};

export default User;
