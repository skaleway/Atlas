import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const students = await db.user.findMany({
            where: {
                role: "MENTOR"
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                imageUrl: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })


        return NextResponse.json(students, {
            status: 200
        })
    } catch (error: any) {
        console.log("ERROR WHILE GETTING STUDENTS", error.message);
        return new NextResponse("Internal Server error!", { status: 500 })
    }
}