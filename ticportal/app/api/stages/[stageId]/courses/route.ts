import {db} from "@/lib/db";
import {NextResponse} from "next/server";
import {currentProfile} from "@/lib/current-profile";


export async function POST(req: Request, { params } : { params: { stageId: string } }) {
    try {
        const body = await req.json();

        const profile = await currentProfile();

        if (!profile || profile?.role !== 'ADMIN') return new NextResponse("Unauthorized", { status: 401 });

        const createdCourse = await db.courses.create({
            data: {
                ...body,
                userId: profile.id,
                stageId: params.stageId
            }
        })

        if (createdCourse) {
            console.log(createdCourse)
            return NextResponse.json(createdCourse, {
                status: 200
            })
        }

    } catch (error: any) {
        console.log("[ERROR CREATING COURSE]", error.message);
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}

export async function GET(req: Request) {
    try {
        const { stageId } = await req.json()
        const courses = await db.courses.findMany({
            where: { stageId }
        })

        if (courses) {
            return NextResponse.json(courses, {
                status: 200
            })
        }

        return NextResponse.json({}, {
            status: 200
        })
    } catch (error: any) {
        console.log("[ERROR FETCHING COURSE]", error.message);
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}

export async function DELETE(req: Request) {
    try {
        const { stageId } = await req.json()
        const courses = await db.courses.deleteMany({
            where: { stageId }
        })

        if (courses) {
            return NextResponse.json(courses, {
                status: 200
            })
        }

        return NextResponse.json([], {
            status: 200
        })
    } catch (error: any) {
        console.log("[ERROR DELETING COURSES]", error.message);
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}