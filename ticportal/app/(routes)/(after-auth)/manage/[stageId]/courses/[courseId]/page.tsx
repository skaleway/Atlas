import {db} from "@/lib/db";
import {formatDate, useUsername} from "@/constants/indexfxns";
import {User} from "@prisma/client"
import {Calendar} from "lucide-react";
import {redirect} from "next/navigation"
import TipTap from "@/components/manage/Text Editor/tiptap-viewer";
import NovelEditor from "@/components/novel/editor/advanced-editor";

const Course = async ({ params } : { params : { courseId: string } }) => {
    const course = await db.courses.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            user: true,
            stage: true
        }
    })

    if (!course){
        redirect('/manage');
    }


    return (
        <div>
            <div className="mb-10">
                <h1 className="font-bold text-3xl">Course Details</h1>
                <p className="my-4">{`Course Name:${" "}`}<span className="ml-3 font-semibold">{course?.name}</span></p>
                <p className="my-4 flex flex-col">{`Course Description:${" "}`}<span className="font-semibold mt-1">{course?.description}</span></p>
                <p className="my-4">{`Added By:${" "}`}<span className="ml-3 bg-[#F8F9FC] rounded-full px-2 py-1">{useUsername(course?.user as User)}</span></p>
                <p className="my-4">Payment: <span className="ml-3 bg-[#ECFDF3] text-[#027A48] rounded-full px-2 py-1">{course?.payment}</span></p>
                {course?.stage.stageNumber && <p className="my-4">Stage: <span className="ml-3 bg-[#F8F9FC] rounded-full px-2 py-1">Stage {course?.stage.stageNumber}</span></p>}
                <p className="flex h-[40px] items-center">
                    {`Date Added:${" "}`}
                    <span className="flex gap-x-2 h-[40px] w-fit ml-3 px-3 border items-center rounded">
                        {<Calendar />}{formatDate(course?.createdAt as Date, true)}
                    </span>
                </p>
                {course?.updatedAt && <p className="flex my-4 h-[40px] items-center">
                    {`Last Updated Date:${" "}`}
                    <span className="flex gap-x-2 h-[40px] w-fit ml-3 px-3 border items-center rounded">
                        {<Calendar/>}{formatDate(course?.updatedAt as Date, true)}
                    </span>
                </p>}
            </div>
            <div>
                <h1 className="font-bold text-3xl mb-4">Course Content</h1>
                {course?.content ?
                    (
                        // <div className="p-2 border w-full h-fit">
                        //     <TipTap courseContent={course.content} needStyling={true}/>
                        //     <NovelEditor isEditable={false} initialValue={JSON.parse(course?.content)} />
                            // <div dangerouslySetInnerHTML={{__html: course.content}}/>
                        // </div>
                        <div className="border p-4 rounded-xl max-h-[950px] overflow-y-auto">
                            <NovelEditor isEditable={false} editorContent={JSON.parse(course?.content)} />
                        </div>
                    ) :
                    (
                        <div className="w-full text-center">Empty Content</div>
                    )
                }
            </div>
        </div>
    );
};

export default Course;
