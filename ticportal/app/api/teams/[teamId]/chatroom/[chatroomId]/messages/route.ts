
import { NextResponse } from "next/server";


// import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
// import { MemberRole } from "@prisma/client";




export async function POST(req: Request, { params }: { params: { chatroomId: string } }) {
  try {
    const { chatroomId } = params;
    const { userId, message, fileUrl, imageUrl, videoUrl } = await req.json();

    if (!chatroomId || !userId || !message) {
      return new NextResponse("Chatroom ID, User ID and Message are required", { status: 400 });
    }

    const chatRoom = await db.chatRoom.findUnique({ where: { id: chatroomId }, include: { members: true } });

    console.log(chatRoom)
    if (!chatRoom) {
      return new NextResponse("Chatroom not found", { status: 404 });
    }

    const user = await db.user.findUnique({
      where: { id: userId }, include: {
        team:true}
    });

    console.log(user)
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const isMember = chatRoom.members.some(member => member.id === userId);
      const isMentorOrAdmin = user.role === 'MENTOR' || user.role === 'ADMIN';
      

    if (!isMember && !isMentorOrAdmin) {
    return new NextResponse("User is not a member of the chatroom and is not a mentor or admin", { status: 403 });
    }

    const newMessage = await db.message.create({
    data: {
        message,
        fileUrl,
        imageUrl,
        videoUrl,
        memberId: userId,
        chatRoomId:chatroomId,
        userId,
    },
    });
    console.log(newMessage)
    console.log(chatRoom.members)
    console.log(chatroomId)
    return NextResponse.json(newMessage);
} catch (error: any) {
    console.log("[SEND MESSAGE ERROR]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}


// [
//   {
//     "id": "65eae0b6d316deeabc022d54",
//     "teamId": "659e74e4241bb62f4d75c0fa",
//     "createdAt": "2024-03-08T09:56:06.333Z",
//     "updatedAt": "2024-03-08T09:56:06.333Z",
//     "members": [
//       {
//         "id": "65eae0b7d316deeabc022d55",
//         "role": "ADMIN",
//         "profileId": "659e73e3241bb62f4d75c0f4",
//         "teamId": "659e74e4241bb62f4d75c0fa",
//         "createdAt": "2024-03-08T09:56:06.333Z",
//         "updatedAt": "2024-03-08T09:56:06.333Z",
//         "chatRoomId": "65eae0b6d316deeabc022d54"
//       }
//     ]
//   }
// ]