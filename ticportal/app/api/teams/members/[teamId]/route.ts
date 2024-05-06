import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { teamId: string } }) {
    try {
        if (!params.teamId) return NextResponse.json("Invalid URL", { status: 400 })

        const team = await db.team.findUnique({
            where: {
                id: params.teamId
            }, include: {
                members: true
            }
        })

        if (!team) return NextResponse.json("Team not found", { status: 404 })

        // const teammber = team.members

        const teamMembers = team.members.map(async (member) => {
            return await db.user.findUnique({
                where: {
                    id: member.profileId
                }, select: {
                    username: true, imageUrl: true, firstName: true, lastName: true, id: true, description: true, role: true
                }
            })
        })

        const members = await Promise.all(teamMembers)


        const newMembers = members.map((mem) => {
            /// some code here
            const t = team.members.find((m) => m.profileId === mem?.id)
            if (t) {
                const newUser = {
                    ...mem,
                    role: t.role
                }

                return newUser
            }

        })



        return NextResponse.json(newMembers, { status: 200 })

    } catch (error: any) {
        console.log("GETTING TEAM MEMBERS", error.message);
        return NextResponse.json("Internal server Error", { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { teamId: string } }) {
    try {
        const { memberId } = await req.json()

        if (!params.teamId) return NextResponse.json("Invalid URL", { status: 400 })

        const team = await db.team.findUnique({
            where: {
                id: params.teamId
            }, include: {
                members: true
            }
        })

        if (!team) return NextResponse.json("Team not found", { status: 404 })

        // Check if the team already has 5 members
        if (team.members.length >= 5) {
            return NextResponse.json("Team is full", { status: 400 });
        }

        // Check if the member already exists in the team
        const existingMember = team.members.find((tm) => tm.profileId === memberId)

        if (existingMember) {
            return NextResponse.json("Member already exists in the team", { status: 400 });
        }

        //Adding the user account to the members array
        const newMember = await db.member.create({
            data: {
                role: MemberRole.GUEST, // You can set the default role as needed
                profileId: memberId,
                teamId: team.id,
            },
        });

        return NextResponse.json({ message: "Member added to the team", newMember }, { status: 200 });
    } catch (error: any) {
        console.error("Error adding member to the team:", error.message);
        return NextResponse.json("Internal server Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { teamId: string } }) {
    try {
        const { userId } = await req.json()
        console.log(userId)


        if (!params.teamId) return NextResponse.json("Invalid URL", { status: 400 })

        const team = await db.team.findUnique({
            where: {
                id: params.teamId
            }, include: {
                members: true
            }
        })
        console.log(team)
        console.log("userId here",userId)
        if (!team) return NextResponse.json("Team not found", { status: 404 })

      
        const userToDelete = team.members.find((tm) => tm.profileId === userId)
        if (!userToDelete) {
            return NextResponse.json("User not found", { status: 404 });
        }

       
        if (userToDelete.role === MemberRole.ADMIN) {
            return NextResponse.json("Admin cannot delete themselves", { status: 400 });
        }

        
        await db.member.delete({
            where: {
                id: userToDelete.id,
            },
        });

        return NextResponse.json({ message: "User deleted from the team" }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting user from the team:", error.message);
        return NextResponse.json("Internal server Error", { status: 500 });
    }
}