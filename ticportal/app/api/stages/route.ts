import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const createdStage = await db.stage.create({
            data: {
                ...body
            }
        })

        if (createdStage) {
            return NextResponse.json(createdStage, {
                status: 200
            })
        }

    } catch (error: any) {
        console.log("[ERROR CREATE STAGE]", error.message);
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}

export async function GET() {
    try {

        const stages = await db.stage.findMany()

        if (stages) {
            return NextResponse.json(stages, {
                status: 200
            })
        }

        return NextResponse.json([], {
            status: 200
        })
    } catch (error: any) {
        console.log("[ERROR CREATE STAGE]", error.message);
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}