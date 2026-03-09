import { prisma } from "@/src/lib/prisma";

export async function getPosts() {
  return prisma.communityPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      comments: true,
    },
  });
}

export async function createPost(
  userId: string,
  title: string,
  content: string
) {
  return prisma.communityPost.create({
    data: {
      userId,
      title,
      content,
    },
  });
}