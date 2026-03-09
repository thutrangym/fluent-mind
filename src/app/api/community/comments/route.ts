import { NextResponse } from "next/server";
import { getComments, createComment } from "@/src/lib/community/comment";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "postId required" });
  }

  const comments = await getComments(postId);

  return NextResponse.json(comments);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { userId, postId, content, parentId } = body;

  const comment = await createComment(
    userId,
    postId,
    content,
    parentId
  );

  return NextResponse.json(comment);
}