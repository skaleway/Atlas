"use client"
import React from 'react';
import "./tiptap.css"
import {EditorContent, useEditor} from "@tiptap/react";
import {editorExtensions} from "@/components/manage/Text Editor/editor-extensions";

const TipTap = ({ courseContent, needStyling } : {
    courseContent: string,
    needStyling?: boolean
}) => {
    const editor = useEditor({
        extensions: [
            ...editorExtensions
        ],
        content: courseContent,
        editable: false,
        editorProps: {
            attributes: {
                // class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl text-[16px] focus:outline-none',
                class: `focus:outline-none ${needStyling ? "editor_style" : ""}`,
            }
        },
    })
    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default TipTap;
