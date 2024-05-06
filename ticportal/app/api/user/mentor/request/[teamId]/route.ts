import { db } from "@/lib/db";
import { RequestStatus } from "@prisma/client";
import { NextResponse } from "next/server";


// getting all the requests from a team
export async function GET(req: Request, { params }: { params: { teamId: string } }) {
    try {

        const team = await db.team.findUnique({
            where: {
                id: params.teamId
            }
        })

        if (!team) return NextResponse.json("No team found", { status: 404 })

        const requests = await db.joinRequest.findMany({
            where: {
                teamId: team?.id,
                status: "PENDING"
            }
        })


        const requestedUsers = requests.map(async (request) => {
            const user = await db.user.findUnique({
                where: {
                    id: request?.userId
                },
                select: {
                    username: true, email: true, id: true, imageUrl: true
                }
            })

            return { ...user, status: request.status, requestId: request.id }
        })

        const requestedUserProfiles = await Promise.all(requestedUsers)


        return NextResponse.json(requestedUserProfiles, { status: 200 })


    } catch (error: any) {
        console.log("ERROR GET MENTORS", error.message);
        return NextResponse.json("Internal server error", { status: 500 })
    }
}

//accepting the request for a menter but the student
export async function PUT(req: Request, { params }: { params: { teamId: string } }) {
    try {

        const { mentorId, status, requestId }: { mentorId: string, status: RequestStatus, requestId: string } = await req.json()

        const team = await db.team.findUnique({
            where: {
                id: params.teamId
            }
        })

        if (!team) return NextResponse.json("No team found", { status: 404 })

        const requests = await db.joinRequest.findMany({
            where: {
                teamId: team?.id
            }
        })

        const existingRequest = requests.find((request) => request.userId === mentorId)

        if (!existingRequest) return NextResponse.json("No request of this mentor", { status: 400 })

        const changeRequestStatus = await db.joinRequest.update({
            where: {
                id: requestId
            },
            data: {
                status
            }
        })

        if (changeRequestStatus.status === "ACCEPTED") {

            const existingMentor = team.mentors.find((mentor) => mentor === mentorId)

            if (existingMentor) return NextResponse.json("This mentor already exist in this team", { status: 400 })


            const addANewMentorToTeam = await db.team.update({
                where: {
                    id: team?.id
                },
                data: {
                    mentors: {
                        push: mentorId
                    }
                }
            })


            if (addANewMentorToTeam) return NextResponse.json(addANewMentorToTeam, { status: 200 })
        }

        return NextResponse.json(changeRequestStatus, { status: 200 })

    } catch (error: any) {
        console.log("ACCEPTING THE REQUEST", error.message);
        return NextResponse.json("Internal server error", { status: 500 })
    }
}