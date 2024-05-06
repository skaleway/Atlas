"use client"
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
// import Tiptap from "@/components/manage/Text Editor/tiptap";
import {useRouter} from "next/navigation";
import { initialInputType } from './form';
import {toast} from "sonner";
import NovelEditor from "@/components/novel/editor/advanced-editor";
import {cn} from "@/lib/utils";
import {Plus} from "lucide-react";


const NewCourseForm = ({ stageId } : { stageId : string }) => {
    const initialInputState = {
        courseName: "",
        payment: "Free",
        editorContent: "",
        description: ""
    }
    const [inputs, setInputs] = useState<initialInputType>(initialInputState)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const [buttonOverlaps, setButtonOverlaps] = useState<boolean | null>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const [descriptionWidth, setDescriptionWidth] = useState<number | null>(null)

    useEffect(() => {
        if (descriptionRef.current) {
            setDescriptionWidth(descriptionRef.current.offsetWidth);
            console.log(descriptionWidth)
        }
    }, [descriptionRef]); // Run only when elementRef changes


    useEffect(() => {
        const handleScroll = () => {
            if (buttonRef.current && divRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                const divRect = divRef.current.getBoundingClientRect();
                if (buttonOverlaps !== (buttonRect.top < divRect.bottom))
                    setButtonOverlaps(buttonRect.top < divRect.bottom)
            }
        };

        const mainScrollableDiv = document.querySelector("main.children div div")
        mainScrollableDiv?.addEventListener('scroll', handleScroll);
        return () => {
            mainScrollableDiv?.removeEventListener('scroll', handleScroll);
        };

    }, []);

    useEffect(() => {
        if (buttonRef.current && divRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const divRect = divRef.current.getBoundingClientRect();

            setButtonOverlaps(buttonRect.top > divRect.bottom)
        }
    }, []);

    const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsSubmitting(true)
        try {
            const body = {
                name: inputs.courseName,
                content: inputs.editorContent,
                payment: inputs.payment,
                description: inputs.description
            }
            const response = await fetch(`/api/stages/${stageId}/courses`, {
                method: 'POST',
                body: JSON.stringify({ ...body })
            })
            if (response.status !== 200) {
                const errorMessage = await response.text()
                throw new Error(errorMessage)
            }
            else {
                const createdCourse = await response.json()
                console.log(createdCourse)
                toast.success("Course created successfully")
                router.push(`/manage/${stageId}/courses/${createdCourse.id}`)
            }
        }
        catch (e: any) {
            console.error(e.message)
            toast.error(e.message)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setInputs((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <form>
                <div>
                    <h1 className="font-medium text-3xl my-2">Course Information</h1>

                    <div className="sm:flex sm:justify-between sm:flex-wrap sm:mb-8 mt-5 mb-8">
                        <div className="flex flex-col mb-3 sm:mb-0">
                            <label htmlFor="courseName">Course Name</label>
                            <input
                                name="courseName"
                                className="px-3 w-[270px] h-[45px] pb-2 pt-2.5 text-gray-700 bg-white border focus:outline-none focus:border-blue-600 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                                onChange={handleOnChange}
                                disabled={isSubmitting}
                                placeholder="Enter name"
                                required
                            />
                        </div>

                        <div className="flex flex-col mb-3 sm:mb-0">
                            <label htmlFor="payment">Payment</label>
                            <select
                                name="payment"
                                className="w-[270px] h-[45px] pl-3 px-6 pb-2 pt-2.5 text-gray-700 bg-white border rounded-[8px] focus:outline-none focus:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                                onChange={handleOnChange}
                            >
                                <option>Free</option>
                                <option>Paid</option>
                            </select>
                        </div>

                        <div className="flex flex-col w-full mt-0 sm:mt-3">
                            <label htmlFor="description">Description</label>
                            <textarea
                                ref={descriptionRef}
                                name="description"
                                className="px-3 w-full h-[125px] pb-2 pt-2.5 text-gray-700 bg-white border focus:outline-none focus:border-blue-600 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter course description"
                                disabled={isSubmitting}
                                onChange={handleOnChange}
                                required
                            />
                        </div>

                    </div>
                </div>
                <div ref={divRef} className="w-full">
                    <h1 className="font-medium text-3xl my-2">Course Content</h1>
                    {/*<Tiptap setInputs={setInputs} />*/}
                    {descriptionWidth && <NovelEditor
                        onChange={setInputs}
                        isEditable={true}
                        additionalAttributes={`h-[600px] overflow-y-auto`}
                    />}
                </div>
                <button
                    ref={buttonRef}
                    type="submit"
                    className={cn("w-fit float-right sticky bottom-0 right-0 mt-[30px] px-6 pb-2 pt-2.5 text-white custom-button text-lg disabled:opacity-50 disabled:cursor-not-allowed", {
                        "opacity-80 rounded px-2 mr-2": buttonOverlaps
                    })}
                    onClick={handleOnSubmit}
                    disabled={Object.keys(inputs).length !== 4 || Object.values(inputs).includes("") || isSubmitting}
                >
                    {!buttonOverlaps ? "Add Course" : <Plus />}
                </button>
            </form>
        </>
    );
};

export default NewCourseForm;