import { currentUser } from "@clerk/nextjs";
import { db } from "./db";
import { ROLE } from "@prisma/client";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) return;

  const profile = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;

  const userRole = user.username?.split("-");

  //username-admin

  if (userRole) {
    switch (userRole[1]) {
      case "admin@ticsummit24":
        return createProfile(user, "ADMIN");

      case "mentor":
        return createProfile(user, "MENTOR");

      case "judge":
        return createProfile(user, "JUDGE");

      default:
        break;
    }
  }

  return createProfile(user, "PARTICIPANT");
};

const createProfile = async (user: any, role: ROLE) => {
  return await db.user.create({
    data: {
      userId: user.id,
      username: user.username,
      email: user.emailAddresses[0].emailAddress,
      role: role,
      paid: role === "ADMIN" ? true : false,
    },
  });
};
