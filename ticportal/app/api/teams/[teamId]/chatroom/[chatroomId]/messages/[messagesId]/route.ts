
import { NextResponse } from "next/server";


import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { messageId: string } }) {
  try {
    const { messageId } = params;

    const message = await db.message.findUnique({ where: { id: messageId } });

    if (!message) {
      return new NextResponse("Message not found", { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error: any) {
    console.log("[GET MESSAGE ERROR]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { messageId: string } }) {
  try {
    const { messageId } = params;

    const message = await db.message.delete({ where: { id: messageId } });

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error: any) {
    console.log("[DELETE MESSAGE ERROR]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { messageId: string } }) {
  try {
    const { messageId } = params;
    const { newMessage } = await req.json();

    if (!newMessage) {
      return new NextResponse("New message is required", { status: 400 });
    }

    const updatedMessage = await db.message.update({
      where: { id: messageId },
      data: { message: newMessage },
    });

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log("[UPDATE MESSAGE ERROR]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
