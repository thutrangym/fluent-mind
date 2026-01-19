"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import {
  Sun,
  Moon,
  Monitor,
  Check,
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import favicon from "@/src/assets/favicon.png";
import NavLink from "./NavLink";
import { useAuth } from "@/src/hooks/useAuth";
import { NAV_ITEMS } from "./nav.config";
import type { NavItem, UserRole, UserTier } from "./nav.config";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, isLoggedIn, isPremium } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role: UserRole = !isLoggedIn
    ? "guest"
    : user?.role === "admin"
      ? "admin"
      : "user";

  const tier: UserTier = isPremium ? "premium" : "free";

  const canShow = (item: NavItem): boolean => {
    if (item.roles && !item.roles.includes(role)) return false;
    if (item.tiers && !item.tiers.includes(tier)) return false;
    return true;
  };

  const visibleItems = NAV_ITEMS.filter(canShow);

  const mainLinks = visibleItems.filter(
    (i) => !["Leaderboard", "Community", "Pricing", "Admin"].includes(i.label),
  );

  const moreLinks = visibleItems.filter((i) =>
    ["Leaderboard", "Community", "Pricing"].includes(i.label),
  );

  const adminLink = visibleItems.find((i) => i.label === "Admin");

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-lg shadow-sm group-hover:rotate-3 transition-transform">
            <Image src={favicon} alt="Logo" width={32} height={32} />
          </div>
          <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:to-gray-400">
            Fluent Mind
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/40 p-1 rounded-2xl mr-2">
            {mainLinks.map((l) => (
              <NavLink key={l.href} href={l.href}>
                <span className="px-3 py-1.5 font-semibold text-sm">
                  {l.label}
                </span>
              </NavLink>
            ))}

            {moreLinks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger className="px-3 py-1.5 text-sm font-semibold flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#34DBC5] outline-none">
                  More <ChevronDown className="w-4 h-4 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 p-2 mt-2 rounded-2xl shadow-xl bg-white border-gray-100 dark:border-gray-800"
                >
                  {moreLinks.map((l) => (
                    <DropdownMenuItem
                      key={l.href}
                      asChild
                      className="rounded-xl cursor-pointer"
                    >
                      <Link href={l.href} className="w-full">
                        {l.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {adminLink && (
              <DropdownMenu>
                <DropdownMenuTrigger className="px-3 py-1.5 text-sm font-semibold flex items-center gap-1 text-red-600 hover:text-red-700 outline-none transition-colors">
                  Admin
                  <ChevronDown className="w-4 h-4 opacity-60" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 mt-2 rounded-2xl shadow-2xl bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800"
                >
                  <DropdownMenuItem
                    asChild
                    className="rounded-xl cursor-pointer"
                  >
                    <Link href="/admin/users" className="w-full">
                      👤 Manage Users
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="rounded-xl cursor-pointer"
                  >
                    <Link href="/admin/topics" className="w-full">
                      📚 Manage Topics
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="rounded-xl cursor-pointer"
                  >
                    <Link href="/admin/lessons" className="w-full">
                      🎥 Manage Lessons
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="rounded-xl cursor-pointer"
                  >
                    <Link href="/admin/vocab-decks" className="w-full">
                      🧠 Manage Vocab Decks
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 opacity-50" />

                  <DropdownMenuItem
                    asChild
                    className="rounded-xl cursor-pointer"
                  >
                    <Link href="/admin/system" className="w-full text-gray-500">
                      ⚙️ System
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-2" />

          {/* Theme */}
          <DropdownMenu>
            <DropdownMenuTrigger className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 outline-none">
              {theme === "dark" ? (
                <Moon className="w-4 h-4 text-[#34DBC5]" />
              ) : (
                <Sun className="w-4 h-4 text-orange-500" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-3 w-40 p-1.5 rounded-2xl shadow-2xl bg-white border-gray-100 dark:border-gray-800"
            >
              {[
                { value: "light", icon: Sun, label: "Light" },
                { value: "dark", icon: Moon, label: "Dark" },
                { value: "system", icon: Monitor, label: "System" },
              ].map((t) => (
                <DropdownMenuItem
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className="flex justify-between rounded-xl px-3 py-2 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <t.icon className="w-4 h-4 opacity-70" /> {t.label}
                  </span>
                  {theme === t.value && (
                    <Check className="w-4 h-4 text-[#34DBC5]" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth */}
          <div className="ml-2 flex items-center gap-3">
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-[#88DF46] to-[#34DBC5] shadow-lg"
              >
                Login
              </Link>
            ) : (
              <>
                {!isPremium && (
                  <Link
                    href="/pricing"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-100 rounded-xl"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    UPGRADE
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <div className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-[#34DBC5] to-[#88DF46] p-[2px]">
                      <div className="w-full h-full rounded-[9px] bg-white dark:bg-gray-900 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="mt-3 w-52 p-2 rounded-2xl shadow-2xl bg-white border-gray-100 dark:border-gray-800"
                  >
                    <div className="px-3 py-2">
                      <p className="text-xs font-bold text-gray-400 uppercase">
                        Account
                      </p>
                      <p className="text-sm font-bold truncate">
                        {user?.name || "User"}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="rounded-xl">
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl text-red-500">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden p-2 rounded-xl bg-gray-50 dark:bg-gray-800"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
