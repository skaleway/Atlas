import React from 'react';
import "../prosemirror.css";
import NewCourseForm from "@/components/manage/course-forms/new-course-form";

const NewCourse = async ({ params }: { params: { stageId: string } }) => {

    return (
        <div className="flex flex-col">
            <h1 className="font-bold text-3xl sm:mt-0 mt-4">Add Course</h1>
            <NewCourseForm stageId={params.stageId}/>
        </div>

    );
};

export default NewCourse;
