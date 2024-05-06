import {currentProfile} from "@/lib/current-profile";
import Link from "next/link";
import { db } from "@/lib/db";
import CourseCard from "@/components/manage/course-card";
import ContentHeader from "@/components/manage/content-header";
import React from "react";
import {Stage, User, Courses} from "@prisma/client";
import {redirect} from "next/navigation";

const Courses = async ({ params } : { params : { stageId: string } }) => {
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

    const { stageId } = params;

    const stage = await db.stage.findUnique({
        where: {
            id: stageId
        },
        include: { Courses: true }
    })

    if (!stage){
        redirect('/manage');
    }

    return (
        <>
            <div className="gap-y-10 flex flex-col">
                <h1 className="font-bold text-2xl sm:mt-0 mt-4">{`Stage ${stage?.stageNumber} Courses`}</h1>
                <ContentHeader stageId={stageId} />
                {stage?.Courses.length === 0 ? (
                    <div>This stage has no courses</div>
                ) : (
                    <div className="flex flex-wrap gap-x-32 gap-y-10">
                        {stage?.Courses.map(async (course, index) => {
                            const user = await db.user.findUnique({
                                where: {
                                    id: course.userId
                                }
                            })
                            return <CourseCard
                                        stage={stage as Stage}
                                        user={user as User}
                                        course={course as Courses}
                                        key={index}
                            />
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Courses;