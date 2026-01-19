"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className }: Props) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={clsx(
        "px-4 py-2 text-sm font-medium rounded-full transition-all",
        active
          ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30"
          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800",
        className
      )}
    >
      {children}
    </Link>
  );
}
