import { prisma } from "@/src/lib/prisma";

export async function getComments(postId: string) {
  return prisma.comment.findMany({
    where: {
      postId,
      parentId: null,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      replies: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createComment(
  userId: string,
  postId: string,
  content: string,
  parentId?: string
) {
  return prisma.comment.create({
    data: {
      userId,
      postId,
      content,
      parentId,
    },
  });
}