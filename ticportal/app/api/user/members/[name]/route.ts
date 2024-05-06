import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { name: string } }) {
    try {
        if (!params.name) return NextResponse.json("Invalid Url", { status: 400 })
        const users = await db.user.findMany({
            where: {
                username: {
                    contains: params.name
                },
                role: "PARTICIPANT"
            }, select: {
                username: true, email: true, id: true, imageUrl: true
            }
        })

        return NextResponse.json(users, { status: 200 })
    } catch (error: any) {
        console.log("GET USERS WITH NAME", error.message);

        return NextResponse.json("Internal server error", { status: 500 })
    }
}