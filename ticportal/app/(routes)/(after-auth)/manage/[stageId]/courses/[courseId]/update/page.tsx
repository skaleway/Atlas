import UpdateCourseForm from '@/components/manage/course-forms/update-course-form';
import React from 'react';
import {db} from "@/lib/db";
import "../../prosemirror.css"
import {Courses, Stage} from "@prisma/client";

const UpdateCourse = async ({ params } : { params : { stageId: string, courseId: string } } ) => {
    const course = await db.courses.findUnique({
        where: { id: params.courseId },
        include: { stage: true }
    })
    return (
        <div className="flex flex-col">
            <h1 className="font-bold text-3xl sm:mt-0 mt-4">Update Course</h1>
            <UpdateCourseForm stage={course?.stage as Stage} course={course as Courses} />
        </div>
    );
};

export default UpdateCourse;
