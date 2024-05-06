"use client"
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Tiptap from "@/components/manage/Text Editor/tiptap";
import NovelEditor from "@/components/novel/editor/advanced-editor";
import {useRouter} from "next/navigation";
import { initialInputType } from './form';
import {Courses, Stage } from '@prisma/client';
import { toast } from 'sonner';
import { ArrowRightToLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const UpdateCourseForm = ({ stage, course } : { stage : Stage, course: Courses}) => {
    const [inputs, setInputs] = useState<initialInputType>({
        courseName: course.name,
        payment: course.payment,
        editorContent: course.content,
        description: course.description
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const [buttonOverlaps, setButtonOverlaps] = useState<boolean | null>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

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
        const body : any = {};
        if (inputs.courseName !== course.name) body['name'] = inputs.courseName
        if (inputs.payment !== course.payment) body['payment'] = inputs.payment
        if (inputs.editorContent !== course.content) body['content'] = inputs.editorContent
        if (inputs.description !== course.description) body['description'] = inputs.description
        console.log(body)
        try {
            const response = await fetch(`/api/stages/${stage.id}/courses/${course.id}`, {
                method: 'PUT',
                body: JSON.stringify({ ...body })
            })
            if (response.status !== 200) {
                const errorMessage = await response.text()
                console.error(errorMessage);
                toast.error(errorMessage)
                throw new Error(errorMessage);
            }
            else {
                const updatedCourse: Courses = await response.json()
                toast.success(`Stage${stage.stageNumber} - Course "${updatedCourse.name} updated successfully"`)
                router.push(`/manage/${stage.id}/courses/${updatedCourse.id}`)
                router.refresh();
            }
        }
        catch (e: any) {
            console.error(e.message)
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
                        <div className="flex flex-col">
                            <label htmlFor="courseName">Course Name</label>
                            <input
                                name="courseName"
                                className="pl-3 w-[270px] h-[45px] pb-2 pt-2.5 text-gray-700 bg-white border focus:outline-none focus:border-blue-600 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                                onChange={handleOnChange}
                                value={inputs.courseName}
                                disabled={isSubmitting}
                                placeholder="Enter name"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="payment">Payment</label>
                            <select
                                name="payment"
                                className="w-[270px] h-[45px] pl-3 px-6 pb-2 pt-2.5 text-gray-700 bg-white border rounded-[8px] focus:outline-none focus:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                value={inputs.payment}
                                onChange={handleOnChange}
                                disabled={isSubmitting}
                            >
                                <option>Free</option>
                                <option>Paid</option>
                            </select>
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                className="pl-3 w-[370px] sm:w-full h-[125px] pb-2 pt-2.5 text-gray-700 bg-white border focus:outline-none focus:border-blue-600 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter course description"
                                value={inputs.description as string}
                                disabled={isSubmitting}
                                onChange={handleOnChange}
                                required
                            />
                        </div>

                    </div>
                </div>
                <div ref={divRef}>
                    <h1 className="font-medium text-3xl my-2">Course Content</h1>
                    {/*<Tiptap setInputs={setInputs} editorContent={course.content}/>*/}
                    <NovelEditor onChange={setInputs} editorContent={JSON.parse(course.content)} />
                </div>
                <button
                    type="submit"
                    ref={buttonRef}
                    className={cn("w-fit float-right sticky bottom-0 right-0 mt-[30px] px-6 pb-2 pt-2.5 text-white custom-button text-lg disabled:opacity-50 disabled:cursor-not-allowed", {
                        "opacity-80 rounded px-2 mr-2": buttonOverlaps
                    })}
                    onClick={handleOnSubmit}
                    disabled={Object.keys(inputs).length !== 4 || Object.values(inputs).includes("") || isSubmitting}
                >
                    {!buttonOverlaps ? "Update Course" : <ArrowRightToLine />}
                </button>
            </form>
        </>
    );
};

export default UpdateCourseForm;
