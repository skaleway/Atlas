import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
    try {

        const { userId } = await auth()

        const { userId: id } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized!", {
                status: 400,
            });
        }

        if (!id)
            return new NextResponse("User not found", {
                status: 400,
            });

        if (userId !== id) {
            return new NextResponse("You can only delete your account", {
                status: 400,
            });
        }

        await clerkClient.users.deleteUser(id);

        const user = await db.user.findUnique({
            where: {
                userId: id
            }
        })

        if (user) {
            await db.user.delete({
                where: {
                    userId: id
                }
            })
        }

        return NextResponse.json({ message: 'Success' });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting user' });
    }
}