import { cn } from "@/lib/utils";
import { EditorBubbleItem, useEditor } from "novel";
import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    CodeIcon, Superscript, Subscript
} from "lucide-react";
import type { SelectorItem } from "./node-selector";
import { Button } from "@/components/ui/button";

export const TextButtons = () => {
    const { editor } = useEditor();
    if (!editor) return null;

    const items: SelectorItem[] = [
        {
            name: "bold",
            isActive: (editor) => editor.isActive("bold"),
            command: (editor) => editor.chain().focus().toggleBold().run(),
            icon: BoldIcon,
        },
        {
            name: "italic",
            isActive: (editor) => editor.isActive("italic"),
            command: (editor) => editor.chain().focus().toggleItalic().run(),
            icon: ItalicIcon,
        },
        {
            name: "underline",
            isActive: (editor) => editor.isActive("underline"),
            command: (editor) => editor.chain().focus().toggleUnderline().run(),
            icon: UnderlineIcon,
        },
        {
            name: "strike",
            isActive: (editor) => editor.isActive("strike"),
            command: (editor) => editor.chain().focus().toggleStrike().run(),
            icon: StrikethroughIcon,
        },
        {
            name: "code",
            isActive: (editor) => editor.isActive("code"),
            command: (editor) => editor.chain().focus().toggleCode().run(),
            icon: CodeIcon,
        },
        {
            name: "superscript",
            isActive: (editor) => editor.isActive("superscript"),
            command: (editor) => editor.chain().focus().toggleSuperscript().run(),
            icon: Superscript,
        },
        {
            name: "subscript",
            isActive: (editor) => editor.isActive("subscript"),
            command: (editor) => editor.chain().focus().toggleSubscript().run(),
            icon: Subscript,
        },
    ];

    return (
        <div className="flex">
            {items.map((item, index) => (
                <EditorBubbleItem
                    key={index}
                    onSelect={(editor) => {
                        item.command(editor);
                    }}
                >
                    <Button size="sm" className="rounded-none" variant="ghost">
                        <item.icon
                            // color={item.isActive(editor) ? "#3b82f6" : undefined}
                            {...(item.isActive(editor) && {color: "#3b82f6"})}
                            className={cn("h-4 w-4", {
                                "text-blue-500": item.isActive(editor),
                            })}
                        />
                    </Button>
                </EditorBubbleItem>
            ))}
        </div>
    );
};