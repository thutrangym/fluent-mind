import { prisma } from "@/src/lib/prisma";
import { NextRequest,NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const topic = await prisma.topic.findUnique({
    where: { id: (await params).id },
    include: {
      videos: true
    }
  });

  return NextResponse.json(topic);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.topic.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ success: true });
}