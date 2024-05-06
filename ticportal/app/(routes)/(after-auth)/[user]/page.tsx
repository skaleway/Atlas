import Profile from "@/components/shared/profile";
import NotFound from "@/components/shared/not-found";
import {useFallbackText, useUsername} from "@/constants/indexfxns";
import {db} from "@/lib/db";
import {User} from "@prisma/client";
import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {currentProfile} from "@/lib/current-profile";
import {getPrevNextUser} from "@/lib/get-prev-next-user";
import {ArrowLeft, ArrowRight, Users} from "lucide-react";
import React from "react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { user: string };
}): Promise<Metadata> {
  const user = await db.user.findUnique({
    where: {
      username: params.user,
    },
  });

  if (!user)
    return {
      title: "Profile",
    };

  function cleanAndCapitalizeUsername(username: string) {
    const words = username.replace(/[^\w\s]/g, "").split(/\s+/);

    return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  }

  const username =
    user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : user.username?.split("-admin").join("");

  const title = cleanAndCapitalizeUsername(username || "");

  return {
    title: title,
  };
}

const UserProfile = async ({ params }: { params: { user: string } }) => {
  const authUser = await currentProfile();

  const user = await db.user.findUnique({
    where: {
      username: params.user,
    },
    include: {
      team: true,
    }
  });

  const username = useUsername(user as User);
  const fallBackText = useFallbackText(user as User);

  if (
    authUser?.role === "PARTICIPANT" &&
    (!authUser?.schoolName ||
      !authUser?.location ||
      !authUser?.howYoulearnAboutUs)
  ) {
    return redirect("/settings/profile");
  }

  if (!user) return <NotFound contentType="user" params={params.user} />;

  const prevUser = await getPrevNextUser(user, "prev")
  const nextUser = await getPrevNextUser(user, "next")

  const userAttributeExists = (key: string, forAdmin=false) => {
    // @ts-ignore
    const containsKey = user.hasOwnProperty(key) && user[key] !== "None" && !!user[key]
    const isParticipant = authUser?.role === 'PARTICIPANT'
    const isCurrentUser = authUser?.username === user.username
    return forAdmin ? containsKey && (!isParticipant || (isParticipant && isCurrentUser)) : containsKey
  }

  const cleanAndCapitalizedTeamName = (teamName: string) => {

    return teamName
        .replace(/[^\w\s]/g, "").split(/\s+/) // Removing all non-alphanumeric characters (\w) and whitespaces (/s)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Uppercasing the first letter of each word
        .join(" ");
  }

  return (
    <div>
      <div className="h-[40px] flex justify-between">
        <div className="w-[38px] sm:w-[80px] h-fit">
          {prevUser &&
              <Link
                  href={prevUser ? `/${prevUser.username}` : ""}
                  className="center border rounded-full py-2 px-2.5 flex justify-between hover:bg-[#e5e5e5] hover:border-black"
              >
                <ArrowLeft className="w-4 h-4"/>
                <p className="font-bold text-base hidden sm:block">prev</p>
              </Link>
          }
        </div>
        <div className="w-fit sm:w-[65px] h-fit">
          <Link
              href={"/people"}
              className="center border rounded-full py-2 px-2.5 flex justify-between hover:bg-[#e5e5e5] hover:border-black"
          >
            <Users className="w-4 h-4"/>
            <p className="font-bold text-base hidden sm:block">All</p>
          </Link>
        </div>
        <div className="w-[38px] sm:w-[80px] h-fit">
          {nextUser &&
              <Link
                  href={nextUser ? `/${nextUser.username}` : ""}
                  className="center border rounded-full py-2 px-2.5 flex justify-between hover:bg-[#e5e5e5] hover:border-black"
              >
                <ArrowRight className="w-4 h-4"/>
                <p className="font-bold text-base hidden sm:block">Next</p>
              </Link>
          }
        </div>
      </div>
      <div className="mt-10">
        <div className="h-20 w-20 min-w-[80px] center border rounded-full cursor-pointer flex relative overflow-hidden mx-auto">
          <Profile
            imageUrl={user.imageUrl!}
            fallBackText={fallBackText || user.username?.split("")[0]!}
          />
        </div>
        <p className="text-center font-semibold text-lg ">{username}</p>
        <p className="text-center my-3">
          {userAttributeExists('description') ? user.description : "I'm a student."}
        </p>
        <div className="mx-auto w-fit">
          {userAttributeExists('age', true) &&
              <p className="mb-2">
                <span className="font-semibold">Age</span>: <span className="bg-[#F8F9FC] rounded-full px-2 py-1">{user.age}</span>
              </p>}
          {userAttributeExists('email', true) &&
              <p className="mb-2">
                <span className="font-semibold">Email</span>:
                <Link className="hover:underline" href={`mailto:${user.email}`}>
                  &nbsp;{user.email}
                </Link>
              </p>}
          {userAttributeExists('secondaryEmail', true) &&
              <p className="mb-2">
                <span className="font-semibold">Secondary Email</span>:
                <Link className="hover:underline" href={`mailto:${user.secondaryEmail}`}>
                  &nbsp;{user.secondaryEmail}
                </Link>
              </p>}
          {userAttributeExists('classLevel') &&
              <p className="mb-2">
                <span className="font-semibold">Class</span>:
                <span className="bg-[#F8F9FC] rounded-full px-2 py-1"> {user.classLevel}</span>
              </p>}
          {userAttributeExists('schoolName') &&
              <p className="mb-2">
                <span className="font-semibold">School</span>:
                <span className="bg-[#F8F9FC] rounded-full px-2 py-1"> {user.schoolName}</span>
              </p>}
          {userAttributeExists('location', true) &&
              <p className="mb-2">
                <span className="font-semibold">Residence</span>:
                <span className="bg-[#F8F9FC] rounded-full px-2 py-1"> {user.location}</span>
              </p>}
          {userAttributeExists('gardianName', true) &&
              <p className="mb-2">
                <span className="font-semibold">Guardian Name</span>:
                <span className="bg-[#F8F9FC] rounded-full px-2 py-1"> {user.gardianName}</span>
              </p>}
          {userAttributeExists('gardianPhone', true) &&
              <p className="mb-2">
                <span className="font-semibold">Guardian Phone</span>:
                <span className="bg-[#F8F9FC] rounded-full px-2 py-1"> {user.gardianPhone}</span>
              </p>}
          <p>
            {user.team.length > 0 ? (
                <span className="font-semibold">Team: </span>
            ) : (
                "I am not yet in a team."
            )}
            {user.team.length > 0 && (
                <span className="bg-[#F8F9FC] rounded-full px-2 py-1">
                  {cleanAndCapitalizedTeamName(user.team[0].name)}
                </span>
            )}
          </p>

        </div>

      </div>
    </div>
  );
};

export default UserProfile;
