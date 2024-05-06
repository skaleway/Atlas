import {db} from "@/lib/db";
import {NextResponse} from "next/server";
import {currentProfile} from "@/lib/current-profile";

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
    try {

        const profile = await currentProfile();

        if (!profile || profile?.role !== 'ADMIN') return new NextResponse("Unauthorized", { status: 401 });

        const course = await db.courses.findUnique({
            where: {
                id: params.courseId
            }
        })

        if (!course) {
            return NextResponse.json({ message: "No Stage found" }, {
                status: 404
            })
        }

        if (course) return NextResponse.json(course, {
            status: 200
        })

        return NextResponse.json({}, {
            status: 200
        })

    } catch (error: any) {
        console.log("[ERROR FETCHING COURSES]", error.message);

        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}

export async function PUT(req: Request, { params }: { params : { stageId: string, courseId: string } }) {
    try {
        const body = await req.json()

        const profile = await currentProfile();
        if (!profile || profile?.role !== 'ADMIN') return new NextResponse("Unauthorized", { status: 401 });

        const updatedCourse = await db.courses.update({
            where: {
                id: params.courseId
            },
            data: {
                ...body
            }
        })

        if (!updatedCourse) {
            return new NextResponse("Course to be updated not found", {
                status: 404
            })
        }

        return NextResponse.json(updatedCourse, {
            status: 200
        })
    }
    catch (error: any) {
        console.log("[ERROR UPDATING COURSE]", error.message);
        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}

export async function DELETE(req: Request, { params }: { params: { courseId: string} }) {
    try {
        const profile = await currentProfile();

        if (!profile || profile?.role !== 'ADMIN') return new NextResponse("Unauthorized", { status: 401 });

        const deletedCourse = await db.courses.delete({
            where: {
                id: params.courseId
            }
        })

        if (!deletedCourse)
            return new NextResponse("Course to be deleted not found", {
                status: 404
            })

        return NextResponse.json({}, { status: 200 })
    }
    catch (error: any) {
        console.log("[ERROR DELETING COURSE]", error.message);

        return new NextResponse("Internal server error", {
            status: 500
        })
    }
}
