import LevelBadge from "./level-badge";

export interface VideoCardProps {
    id: string;
  title: string;
  thumbnail: string;
  duration: string;
level: "A1" | "A2" | "B1" | "B2" | "PRO";
  views: number;
}

export default function VideoCard({
  title,
  thumbnail,
  duration,
  level,
  views,
}: VideoCardProps) {
  return (
    <div className="rounded-xl border bg-white hover:shadow-md transition overflow-hidden">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
        <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded">
          {duration}
        </span>
        <LevelBadge level={level} />
      </div>

      <div className="p-3 space-y-1">
        <h4 className="font-medium text-sm line-clamp-2">{title}</h4>
        <p className="text-xs text-muted-foreground">{views} views</p>

        <div className="flex justify-between text-xs mt-2">
          <span className="text-primary">Dictation</span>
          <span className="text-primary">Shadowing</span>
        </div>
      </div>
    </div>
  );
}
