export type UserRole = "guest" | "user" | "admin";
export type UserTier = "free" | "premium";

export type NavItem = {
  label: string;
  href: string;
  roles?: UserRole[];
  tiers?: UserTier[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Topics", href: "/topics" },
  { label: "Reviews", href: "/reviews", roles: ["user"] },
  { label: "Vocabulary", href: "/vocabulary" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Community", href: "/community" },
  { label: "Pricing", href: "/pricing" },
  { label: "Admin", href: "/admin", roles: ["admin"] },
];
