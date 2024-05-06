import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { teamId: string } }) {
    try {
        if (!params.teamId) return NextResponse.json("Invalid URL", { status: 400 })

        const team = await db.team.findUnique({
            where: {
                id: params.teamId

            }
        })

        if (!team) return NextResponse.json("Team not found", { status: 404 })

        const mentorPromises = team.mentors.map(async (mentor) => {
            return await db.user.findUnique({
                where: {
                    id: mentor
                }, select: {
                    username: true, imageUrl: true, firstName: true, lastName: true, id: true, description: true, role: true
                }
            });
        });

        const mentors = Array.from(new Set(await Promise.all(mentorPromises)))

        return NextResponse.json(mentors, { status: 200 });
    } catch (error) {

    }
}


export async function PUT(req: Request, { params }: { params: { teamId: string } }) {
    try {
        const { mentorId } = await req.json()


        if (!params.teamId) return NextResponse.json("Invalid URL", { status: 400 })

        const team = await db.team.findUnique({
            where: {
                id: params.teamId

            }
        })

        if (!team) return NextResponse.json("Team not found", { status: 404 })

        const isMentor = await db.user.findUnique({
            where: {
                id: mentorId
            }
        })

        if (isMentor?.role !== "MENTOR") return NextResponse.json("You can assign only someone with a role of mentor", { status: 400 })

        const existingMentor = team.mentors.find((mentor) => mentor === mentorId)

        if (existingMentor) return NextResponse.json("This mentor already exist in this team", { status: 400 })

        const updatedTeam = await db.team.update({
            where: {
                id: team.id
            },
            data: {
                mentors: {
                    push: mentorId
                }
            }
        })



        if (updatedTeam) return NextResponse.json("Team updated!", { status: 200 })

        return NextResponse.json("Something went wrong!", { status: 400 })

    } catch (error: any) {
        console.log("ADDING A NEW MENTOR", error.messge);
        return NextResponse.json("Internal sever error", { status: 500 })
    }
}

