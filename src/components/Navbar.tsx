"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import {
  Monitor,
  Sun,
  Moon,
  Check,
  User,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import favicon from "../assets/favicon.png";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Tránh lỗi hydration khi dùng next-themes
  useEffect(() => {
    const mount = () => setMounted(true);
    mount();
  }, []);
  const navLinks = [
    { label: "Topics", href: "/topics" },
    { label: "Reviews", href: "/reviews" },
    { label: "Vocabulary", href: "/vocabulary" },
  ];

  const moreLinks = [
    { label: "Leader Board", href: "/leaderboard" },
    { label: "Community", href: "/community" },
    { label: "Pricing", href: "/pricing" },
  ];

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={favicon}
              alt="Logo"
              width={32}
              height={32}
              className="transition-transform group-hover:scale-110"
            />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
            Fluent Mind
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {link.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full outline-none">
              More <ChevronDown className="w-4 h-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                align="end"
                className="z-[110] mt-2 min-w-[180px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-1.5 animate-in fade-in zoom-in duration-200"
              >
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="flex items-center px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 outline-none transition-colors"
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>

          <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2" />

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 outline-none transition-all">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent
                  align="end"
                  className="z-[110] mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-1.5 animate-in slide-in-from-top-2"
                >
                  {[
                    { name: "Light", value: "light", icon: Sun },
                    { name: "Dark", value: "dark", icon: Moon },
                    { name: "System", value: "system", icon: Monitor },
                  ].map((t) => (
                    <DropdownMenuItem
                      key={t.value}
                      onClick={() => setTheme(t.value)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 outline-none"
                    >
                      <div className="flex items-center gap-2">
                        <t.icon className="w-4 h-4" /> {t.name}
                      </div>
                      {theme === t.value && (
                        <Check className="w-4 h-4 text-blue-500" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>

            {/* Profile
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center p-0.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-blue-400 transition-all outline-none">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent
                  align="end"
                  className="z-[110] mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-1.5"
                >
                  <div className="px-3 py-2 mb-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 outline-none transition-colors"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 outline-none transition-colors"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer outline-none transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu> */}

            {/* Login Button */}
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#88DF46] to-[#34DBC5] rounded-lg shadow-md hover:scale-[1.02] transition-all">
              <a href="/login">Login</a>
            </button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "max-h-[500px] border-t border-gray-100 dark:border-gray-800"
            : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-3 bg-white dark:bg-gray-900">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-500 dark:text-gray-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
