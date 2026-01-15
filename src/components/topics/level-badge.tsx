// components/topics/level-badge.tsx
export default function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    A1: "bg-green-500",
    A2: "bg-green-600",
    B1: "bg-blue-500",
    B2: "bg-purple-500",
    PRO: "bg-yellow-500",
  };

  return (
    <span
      className={`absolute top-2 right-2 text-xs text-white px-2 py-0.5 rounded ${colors[level]}`}
    >
      {level}
    </span>
  );
}
