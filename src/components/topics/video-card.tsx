import Link from "next/link";
import LevelBadge from "./level-badge";

export interface VideoCardProps {
  id: string;
  title: string | null;
  youtubeId: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export default function VideoCard({ title, youtubeId, level }: VideoCardProps) {
  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <Link href={`/video/${youtubeId}`} className="group">
      <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-400 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <img
          src={thumbnail}
          alt={title ?? "Video"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        <div className="absolute right-2 top-2 transform transition-transform duration-300 group-hover:scale-105">
            <LevelBadge level={level} />
          </div>
          
        <div className="flex flex-1 flex-col p-4">
          <h4 className="text-sm font-semibold leading-snug text-slate-800 line-clamp-2 transition-colors duration-300 group-hover:text-blue-600">
            {title ?? "Untitled Video"}
          </h4>
        </div>
      </div>
    </Link>
  );
}
