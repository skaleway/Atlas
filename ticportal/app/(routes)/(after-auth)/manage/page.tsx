import { Metadata } from "next";
import StagesProfile from "@/components/stages/stages";
import StageForms from "@/components/manage/course-forms/stage-forms";
import UpdateStageForm from "@/components/manage/course-forms/update-stage-form";
import Link from "next/link";
import React from "react";
import {currentProfile} from "@/lib/current-profile";

export const metadata: Metadata = {
    title: "Manage Content",
    description: "Edit Stages and Tutorials",
};

const Stages = async () => {
    const user = await currentProfile();

    if (user?.role !== "ADMIN")
        return (
            <div className="h-full w-full children center">
                <div className="border w-[90%] gap-4 rounded p-10 center flex-col">
                    <p className="text-center ">
                        You don&apos;t have access to this page. You can contact the Mentors
                        or Admins to change your status.
                    </p>
                    <Link href="/" className="custom-button">
                        Go back home
                    </Link>
                </div>
            </div>
        );

    return (
        <div>
            <div className="w-full mb-4">
                <p className="text-lg">Manage course content and materials for participants</p>
            </div>
            <StageForms />
            <StagesProfile />
        </div>
    );
};

export default Stages;
