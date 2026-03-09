import { NextResponse } from "next/server";
import { getPosts, createPost } from "@/src/lib/community/post";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { userId, title, content } = body;

  const post = await createPost(userId, title, content);

  return NextResponse.json(post);
}