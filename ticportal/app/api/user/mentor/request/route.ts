import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const { mentorId, teamId } = await req.json()

        if (!mentorId || !teamId) return NextResponse.json("Invalid data", { status: 400 })

        const user = await db.user.findUnique({ where: { id: mentorId } })

        if (user?.role !== "MENTOR") return NextResponse.json("This User is not a mentor", { status: 4000 })


        // const team = await db.team.findUnique({ where: { id: teamId }, select: { mentors: true } })
        const joinRequests = await db.joinRequest.findMany({
            where: {
                teamId: teamId
            }
        })

        const existingMentor = joinRequests.find((req) => req.userId === mentorId)

        if (existingMentor) return NextResponse.json("You can request for the same Mentor twice", { status: 400 })


        const newRequest = await db.joinRequest.create({
            data: {
                teamId, userId: mentorId
            }
        })

        return NextResponse.json(newRequest, { status: 200 })

    } catch (error: any) {
        console.log("CREATE OR SENDING THE REQUEST TO JOIN", error.messge);
        return NextResponse.json("Internal server error.", { status: 500 })
    }
}