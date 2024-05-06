

import { NextResponse } from "next/server";


import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function DELETE(req: Request, { params }: { params: { chatroomId: string } }) {
try {
    const { chatroomId } = params;

    if (!chatroomId) {
        return new NextResponse("Chatroom ID is required", { status: 400 });
    }

    const chatRoom = await db.chatRoom.delete({ where: { id: chatroomId } });

    return NextResponse.json({ message: "Chatroom deleted successfully" });
} catch (error: any) {
    console.log("[DELETE CHATROOM ERROR]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
}
}

// export async function PUT(req: Request,  { params }: { params: { chatRoomId: string } }) {
//   try {
//     const { chatRoomId } = params;
//     const {teamId} = req.body;


//     if (!chatRoomId) {
//       return new NextResponse("Chatroom ID and Team ID are required", { status: 400 });
//     }

//     const chatRoom = await db.chatRoom.update({
//       where: { id: chatRoomId },
//       data: { teamId },
//     });

//     return NextResponse.json(chatRoom);
//   } catch (error: any) {
//     console.log("[UPDATE CHATROOM ERROR]", error.message);
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// }