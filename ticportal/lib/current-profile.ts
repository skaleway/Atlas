import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const currentProfile = async () => {
  try {
    const { userId } = await auth();

    if (!userId) return null;

    const profile = await db.user.findUnique({
      where: {
        userId,
      },
    });
// console.log(profile)
    return profile;
  } catch (error) {

    console.log(error);

  }
};
