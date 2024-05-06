import {Extension} from '@tiptap/react'

export type FontSizeOptions = {
    types: string[]
}

// @ts-ignore
export const FontSize = Extension.create<FontSizeOptions>({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ''),
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {}
                            }

                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            }
                        },
                    },
                },
            },
        ]
    },
    // @ts-ignore
    addCommands() {
        return {
            // @ts-ignore
            setFontSize: (fontSize: string | number) => ({ chain }) => {
                return chain().setMark('textStyle', { fontSize }).run()
            },
            // @ts-ignore
            unsetFontSize: () => ({ chain }) => {
                return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run()
            },
        }
    },
})
