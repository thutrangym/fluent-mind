// data/topics.ts
import { VideoCardProps } from "@/src/components/topics/video-card";
import { LevelType } from "@/src/components/topics/topics-content";

export interface TopicSectionData {
  id: string;
  title: string;
  count: number;
  levels: LevelType[];
  videos: VideoCardProps[];
}

export const topicSections: TopicSectionData[] = [
  {
    id: "movie",
    title: "Movie short clip",
    count: 125,
    levels: ["experienced"],
    videos: [
      {
        id: "kiki",
        title: "Kiki's Delivery Service | Official English Trailer",
        thumbnail: "/images/kiki.jpg",
        duration: "00:50",
        level: "B1",
        views: 45123,
      },
      {
        id: "kiki",
        title: "Kiki's Delivery Service | Official English Trailer",
        thumbnail: "/images/kiki.jpg",
        duration: "00:50",
        level: "B1",
        views: 45123,
      },
      {
        id: "kiki",
        title: "Kiki's Delivery Service | Official English Trailer",
        thumbnail: "/images/kiki.jpg",
        duration: "00:50",
        level: "B1",
        views: 45123,
      },
      {
        id: "kiki",
        title: "Kiki's Delivery Service | Official English Trailer",
        thumbnail: "/images/kiki.jpg",
        duration: "00:50",
        level: "B1",
        views: 45123,
      },
    ],
    
  },

  {
    id: "daily",
    title: "Daily English Conversation",
    count: 145,
    levels: ["beginner"],
    videos: [
      {
        id: "mom",
        title: "Love mom",
        thumbnail: "/images/mom.jpg",
        duration: "02:24",
        level: "A2",
        views: 29088,
      },
      {
        id: "sweet",
        title: "A sweet home",
        thumbnail: "/images/mom.jpg",
        duration: "02:24",
        level: "A1",
        views: 29088,
      },
      {
        id: "day",
        title: "What a day",
        thumbnail: "/images/mom.jpg",
        duration: "02:24",
        level: "A2",
        views: 29088,
      },
    {
        id: "day",
        title: "What a day",
        thumbnail: "/images/mom.jpg",
        duration: "02:24",
        level: "A2",
        views: 29088,
      },
    ],
  },
  
];
