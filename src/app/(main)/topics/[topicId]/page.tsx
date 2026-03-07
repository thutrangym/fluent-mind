import prisma from "@/src/lib/prisma";
import TopicDetailsClient from "./TopicDetailsClient";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {

  const { topicId } = await params;

  const topic = await prisma.topic.findUnique({
    where: {
      id: topicId,
    },
  });

  if (!topic) {
    notFound();
  }

  const videos = await prisma.video.findMany({
    where: {
      topicId: topicId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <TopicDetailsClient
      topic={topic}
      videos={videos}
    />
  );
}