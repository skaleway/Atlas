import { currentProfile } from "./current-profile";
import { db } from "./db";

export const userTeam = async () => {
  try {
    const user = await currentProfile();

    const team = await db.team.findFirst({
      where: {
        members: {
          some: {
            profileId: user?.id,
          },
        },
      },
      select: {
        imageUrl: true,
        name: true,
        id: true,
        profileId: true,
        members: true,
      },
    });

    if (team) return team;

    return null;
  } catch (error) {
    console.log(error);
  }
};
