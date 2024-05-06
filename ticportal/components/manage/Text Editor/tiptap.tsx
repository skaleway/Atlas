"use client"
import "./tiptap.css"
import { Fonts, FontSizes } from "@/constants";
import {Bold, Italic, ListOrdered, List, AArrowUp, AArrowDown, ListCollapse, ImagePlus, Youtube} from "lucide-react"
import {useEditor, EditorContent, Editor} from '@tiptap/react'
import React, {useState, useCallback} from "react";
import { initialInputType } from "../course-forms/form";
import {editorExtensions} from "@/components/manage/Text Editor/editor-extensions";

const MenuBar = ({ editor } : { editor: Editor }) => {
    const fonts = Fonts();
    const [ftSize, setFtSize] = useState(14)
    const fontSizes = FontSizes();

    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    if (!editor) {
        return null;
    }

    return (
        <div className="flex mt-[15px] ">
            <div>
                <select
                    name="fontFamily"
                    className="w-fit pl-3 px-6 pb-2 pt-2.5 text-gray-700 bg-white border rounded-[8px] focus:outline-none focus:border-blue-600"
                    onChange={(event) => editor.chain().focus().setFontFamily(event.target.value).run()}>
                    {fonts.map((font, index) => {
                        return <option value={`${font}`} key={index}>{font}</option>
                    })}
                </select>
                <select
                    name="fontSize"
                    className="w-fit pl-3 px-6 pb-2 pt-2.5 text-gray-700 bg-white border rounded-[8px] focus:outline-none focus:border-blue-600"
                    // @ts-ignore
                    onChange={(event) => editor.chain().focus().setFontSize(`${event.target.value}pt`).run()}>
                    value={ftSize}
                    {fontSizes.map((fontSize, index) => {
                        return <option onClick={() => setFtSize(fontSize)} value={fontSize} key={index}>{fontSize}</option>
                    })}
                </select>
            </div>
            <div className="flex p-2 w-[270px] justify-between">
                <Bold onClick={() => editor.chain().focus().toggleBold().run()} className="hover:text-white hover:bg-black" />
                <Italic onClick={() => editor.chain().focus().toggleItalic().run()} className="hover:text-white hover:bg-black" />
                <AArrowUp className="hover:text-white hover:bg-black"  />
                <AArrowDown className="hover:text-white hover:bg-black" />
                <List onClick={() => editor.chain().focus().toggleBulletList().run()} className="hover:text-white hover:bg-black" />
                <ListOrdered onClick={() => editor.chain().focus().toggleOrderedList().run()} className="hover:text-white hover:bg-black" />
                <ListCollapse onClick={() => editor.chain().focus().sinkListItem('listItem').run()} className="hover:text-white hover:bg-black" />
                <ImagePlus className="hover:text-white hover:bg-black" onClick={addImage} />
                <Youtube className="hover:text-white hover:bg-black" />
            </div>
        </div>
    )
}

const Tiptap = ({ setInputs, editorContent } : {
    setInputs: React.Dispatch<React.SetStateAction<initialInputType>>,
    editorContent?: string
}) => {
    const fonts = Fonts();

    const editor = useEditor({
        extensions: [
            ...editorExtensions
        ],
        editorProps: {
            attributes: {
                // class: 'prose prose-sm sm:prose lg:prose-base xl:prose-2xl focus:outline-none editor_style',
                // class: 'focus:outline-none',
                class: 'focus:outline-none editor_style',
            }
        },
        // content: "<p>WOW</p>",
        content: editorContent,
        onUpdate({ editor }) {
            setInputs((prevState: initialInputType) => ({...prevState, editorContent: editor.getHTML()}));
        }
    })

    if (!editor) return null

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent style={{fontFamily: fonts[0]}} editor={editor} />
        </>
    )
}

export default Tiptap;
