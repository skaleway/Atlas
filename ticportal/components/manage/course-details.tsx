import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {
    Dialog, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Courses, Stage} from "@prisma/client";
import {useQuery} from "@tanstack/react-query";

interface DetailsProps {
    stageId: string,
    courseId: string
}
const CourseDetails = ({ stageId, courseId } : DetailsProps) => {
    const router = useRouter();
    const [stage, setStage] = useState<Stage | null>(null)
    const [course, setCourse] = useState<Courses | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [input, setInput] = useState("");
    const validationText = `ticportal/stage${stage?.stageNumber}/tutorial#${course?.id.slice(0, 4)}`;

    const getStage = async () => {
        try {
            const response = await fetch(`/api/stages/${stageId}`)
            return response.json()
        }
        catch (e: any) {
            console.error(e.message)
            return {};
        }
    }

    const getCourse = async () => {
        try {
            const response = await fetch(`/api/stages/${stageId}/courses/${courseId}`)
            return response.json()
        }
        catch (e: any) {
            console.error(e.message)
            return {};
        }
    }


    const { data: stageResult } = useQuery({
        queryKey: ["specific-stage"],
        queryFn: getStage
    })

    useEffect(() => {
        if (stageResult)
            setStage(stageResult)
    }, [stageResult])

    const { data: courseResult } = useQuery({
        queryKey: ["specific-course"],
        queryFn: getCourse,
        enabled: !!stage
    })

    useEffect(() => {
        if (courseResult)
            setCourse(courseResult)
    }, [courseResult])

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            const response = await fetch(`/api/stages/${stageId}/courses/${courseId}`, {
                method: 'DELETE'
            })
            if (response.status !== 200) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            else {
                router.push(`/manage/${stageId}/courses/`)
                router.refresh()
            }
        }
        catch (e: any) {
            console.error(e)
            alert(e.message)
        }
        finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
        <div className="pl-6">
            <h1 className="font-bold text-3xl my-8">Course Name Details</h1>
            <div className="flex flex-col gap-y-6 text-lg font-medium">
                {/*<p className="">Name : <span>Course Name</span></p>*/}
                {/*<p>Status : <span>Inactive</span></p>*/}
                {/*<p>Added By : <span>Admin Name</span></p>*/}
                {/*<p>Category <span>Stage 1</span></p>*/}
                {/*<p>Course Type <span>Notes & Images</span></p>*/}
                {/*<p>Date Added : <span>Jan 6, 2022</span></p>*/}
                {/*<p>Payment <span>Free</span></p>*/}
                {/*<p>Duration : <span>30 mins</span></p>*/}
                <button
                    className="custom-button rounded pb-3 pt-3.5 px-4 text-white text-base w-fit"
                    onClick={() => router.push(`/manage/${stageId}/courses/${courseId}/update`)}
                >
                    Update Course Content
                </button>
                <Dialog>
                    <span style={{ width: 90 }} className="block border border-black"></span>
                    <p className="py-4">Danger</p>
                    <DialogTrigger asChild>
                        <button
                            style={{ width: 150, borderRadius: 8 }}
                            className="custom-button pb-3 pt-3.5 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white text-base disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isDeleting || !stage || !course}
                        >
                            Delete Course
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-900 text-base text-center">
                                Once you delete this course, there is no going back. Please be
                                certain.
                            </DialogTitle>
                            <DialogDescription className="text-center">
                                type{" "}
                                <span className="font-bold text-red-500 select-none">
                    {validationText}
                  </span>{" "}
                                below
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Input
                                className="col-span-3 text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isDeleting}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleDelete}
                                className={cn(
                                    "bg-red-100 rounded text-red-900 flex-1 hover:bg-red-500 hover:text-white",
                                    {
                                        "cursor-not-allowed opacity-50 select-none":
                                            input !== validationText || isDeleting,
                                    }
                                )}
                                disabled={input !== validationText || isDeleting}
                            >
                                Delete Course
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
        </>
    );
};

export default CourseDetails;
