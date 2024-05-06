import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const mentors = await db.user.findMany({
            where: {
                role: "MENTOR"
            }, select: {
                username: true, firstName: true, lastName: true, imageUrl: true, description: true, id: true
            }
        })

        return NextResponse.json(mentors, { status: 200 })
    } catch (error: any) {
        console.log("ERROR WHILE GETING MENTORS", error.message);
        return NextResponse.json("Internale Server Error", { status: 500 })
    }
}