"use client";
import React, { useEffect, useState } from "react";
import {
    EditorInstance,
    EditorRoot,
    EditorCommand,
    EditorCommandItem,
    EditorCommandEmpty,
    EditorContent,
    type JSONContent,
    EditorCommandList,
    EditorBubble,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";

import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-commands";
// import { handleImageDrop, handleImagePaste } from "novel/plugins";
// import { uploadFn } from "./image-upload";
import { Separator } from "@/components/ui/separator";
import { useDebounceCallback } from 'usehooks-ts'
import {initialInputType} from "@/components/manage/course-forms/form";
import {cn} from "@/lib/utils";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
    editorContent?: JSONContent;
    additionalAttributes?: string;
    isEditable?: boolean;
    onChange?: React.Dispatch<React.SetStateAction<initialInputType>>;
}
const NovelEditor = ({
                         editorContent={
                             type: "doc",
                             content: []
                         },
                         additionalAttributes ,
                         onChange,
                         isEditable=true
}: EditorProp) => {
    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);

    const debouncedUpdates = useDebounceCallback( ({ editor } : { editor: EditorInstance }) => {
        const json = editor.getJSON();
        if (onChange) {
            onChange((prevState: initialInputType) => ({...prevState, editorContent: JSON.stringify(json)}));
        }
    }, 500);

    return (
        <EditorRoot>
            <EditorContent
                // className={isEditable ? "border rounded-xl w-full md:max-w-3xl" : ""}
                className={isEditable ? "border rounded-xl w-full max-w-screen" : ""}
                initialContent={editorContent}
                extensions={extensions}
                editable={isEditable}
                editorProps={{
                    handleDOMEvents: {
                        keydown: (_view, event) => handleCommandNavigation(event),
                    },
                    // handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
                    // handleDrop: (view, event, _slice, moved) =>
                    //     handleImageDrop(view, event, moved, uploadFn),
                    attributes: {
                        // class: cn(`prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full md:max-w-xl lg:max-w-xl xl:max-w-2xl ${additionalAttributes as string}`),
                        class: cn(`prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-[calc(100%_-_64px)] ${additionalAttributes as string}`),
                    },
                }}
                onUpdate={debouncedUpdates}
                slotAfter={<ImageResizer />}
            >
                <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border bg-white border-muted px-1 py-2 shadow-md transition-all">
                    <EditorCommandEmpty className="px-2 text-muted-foreground">
                        No results
                    </EditorCommandEmpty>
                    <EditorCommandList>
                        {suggestionItems.map((item) => (
                            <EditorCommandItem
                                value={item.title}
                                onCommand={(val) => item.command?.(val)}
                                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-[#e5e5e5] aria-selected:bg-[#e5e5e5] `}
                                key={item.title}
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            </EditorCommandItem>
                        ))}
                    </EditorCommandList>
                </EditorCommand>

                <EditorBubble
                    tippyOptions={{
                        placement: "top",
                    }}
                    className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-white shadow-xl"
                >
                    <Separator orientation="vertical" />
                    <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                    <Separator orientation="vertical" />

                    <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                    <Separator orientation="vertical" />
                    <TextButtons />
                    <Separator orientation="vertical" />
                    <ColorSelector open={openColor} onOpenChange={setOpenColor} />
                </EditorBubble>
            </EditorContent>
        </EditorRoot>
    );
};

export default NovelEditor;