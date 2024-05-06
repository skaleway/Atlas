"use client"
import styles from "./course-card.module.css"
import {User, Stage, Courses} from "@prisma/client"
import {useRouter} from "next/navigation";
import {useMemo} from "react";
import {formatDate, useUsername} from "@/constants/indexfxns";

// @ts-ignore

interface cardProps {
    user: User,
    stage: Stage,
    course: Courses
}
const CourseCard = ({ user, stage, course }: cardProps) => {
    const router = useRouter()

    const userName = useUsername(user)
    const date = useMemo(() => (formatDate(course.createdAt)), [course.createdAt])
    const description = useMemo(() => {
        let desc = course.description
        if (!desc) {
            desc = `In this comprehensive course, you'll dive deep into ${course.name}, exploring fundamental concepts and advanced techniques to equip you with the skills needed to excel in ${course.name}. `
        }
        // @ts-ignore
        return desc.length > 85 ? desc.slice(0, 85) + "..." : desc;
    }, [course.description, course.name]);

    return (
        <div className={`flex content-between flex-wrap border rounded-xl hover:bg-[#e3e3e3] ${styles.course_card}`} onClick={() => router.push(`/manage/${stage.id}/courses/${course.id}`)}>
            {/*<div className={`${styles.course_card_rect} border-b`}></div>*/}
            <div>
                <h1 className="font-bold text-lg">{course.name}</h1>
                <p className="font-semibold">{stage.name}</p>
            </div>
            <div className="flex items-center flex-col">
                <p>{description}</p>
            </div>
            <div className={`${styles.course_card_interior}`}>
                <p>{userName}</p>
                <p>{date}</p>
            </div>
            {/*<div className={`${styles.course_card_rect_1}  rounded-b-xl`}>*/}
            {/*</div>*/}
        </div>
    );
};

export default CourseCard;
