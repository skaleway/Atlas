import React from 'react';
import {db} from "@/lib/db";
import TipTap from '@/components/manage/Text Editor/tiptap-viewer';
import NovelEditor from "@/components/novel/editor/advanced-editor";

const MyComponent = async ({ params } : { params: { courseId: string } }) => {
    const course = await db.courses.findUnique({
        where: { id: params.courseId }
    })
    return (
        <div>
            {/*<TipTap courseContent={course?.content as string}/>*/}
            <NovelEditor isEditable={false} editorContent={JSON.parse(course?.content as string)} />
        </div>
    );
};

export default MyComponent;
