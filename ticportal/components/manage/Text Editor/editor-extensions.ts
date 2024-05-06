import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import FontFamily from "@tiptap/extension-font-family";
import {FontSize} from "@/components/manage/Text Editor/FontSize";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import {nodeInputRule} from "@tiptap/react";

const youtubeInputRegex =  /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
const Youtube2 = Youtube.extend({
    addInputRules() {
        return [
            nodeInputRule({
                find: youtubeInputRegex,
                type: this.type,
                // url: (url) => ({ href: url })
            })
        ]
    }
})

export const editorExtensions = [
    StarterKit,
    Image,
    FontFamily,
    FontSize,
    TextStyle,
    Link,
    Youtube2,
    Placeholder.configure({
        placeholder: "Enter a description..."
    })
]

