"use client";

import { cn } from "@/lib/utils";
import {useRouter} from "next/navigation";
import React from "react";

const CourseTutorial = ({
                   name,
                   description,
                   stageId,
                   courseId
               }: {
    name: string;
    description?: string;
    stageId: string;
    courseId: string;
}) => {
    const router = useRouter();
    return (
        <div
            className={"lg:flex p-3 border rounded gap-2 hover:bg-[#f0f0f0]" }
            onClick={() => {
                router.push(`/stages/${stageId}/tutorials/${courseId}`)
            }}
        >
            <div
                className={cn(
                    "rounded bg-card-foreground border flex items-center justify-center h-40 min-w-[150px]",
                )}
            >
                <p className={cn("text-xl font-bold")}>
                    Courses
                </p>
            </div>
            <div className="flex flex-col w-full">
                <div
                    className={cn("flex flex-col gap-2")}
                >
                    <h1 className="font-semibold text-lg">{name}</h1>
                    <p className="text-zinc-500 text-sm">{description ? description : `In this comprehensive course, you'll dive deep into ${name}, exploring fundamental concepts and advanced techniques to equip you with the skills needed to excel in ${name}. `}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseTutorial;
