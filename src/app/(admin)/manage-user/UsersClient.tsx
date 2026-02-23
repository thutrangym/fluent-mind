"use client";

import { useMemo, useState } from "react";
import { AuthUser, UserRole, UserTier } from "@/src/lib/auth";
import { 
  Shield, Crown, MoreVertical, Search, 
  Users, UserCheck, Star, Trash2, 
  ArrowUpRight, Mail, Fingerprint 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

/* =========================
   COMPONENTS HỖ TRỢ (UI)
========================= */
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ size: number }>;
  color: string;
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-gray-50">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const isAdmin = role === "admin";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${
      isAdmin 
        ? "bg-red-50 text-red-700 ring-red-600/20" 
        : "bg-blue-50 text-blue-700 ring-blue-600/20"
    }`}>
      {isAdmin && <Shield size={12} />}
      {role.toUpperCase()}
    </span>
  );
}

function TierBadge({ tier }: { tier: UserTier }) {
  const isPremium = tier === "premium";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${
      isPremium 
        ? "bg-amber-50 text-amber-700 ring-amber-600/20" 
        : "bg-gray-50 text-gray-600 ring-gray-500/20"
    }`}>
      {isPremium && <Crown size={12} />}
      {tier.toUpperCase()}
    </span>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export default function UsersClient() {
  const [users, setUsers] = useState<AuthUser[]>(MOCK_USERS);
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);

  const toggleAdmin = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, role: u.role === "admin" ? "user" : "admin" }
          : u
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 ">
      {/* Header & Stats */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">User Management</h1>
          <p className="text-gray-500">View, manage and audit your community members.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Members" value={users.length} icon={Users} color="bg-blue-50 text-blue-600" />
          <StatCard label="Premium Tier" value={users.filter(u => u.tier === "premium").length} icon={Star} color="bg-amber-50 text-amber-600" />
          <StatCard label="Admins" value={users.filter(u => u.role === "admin").length} icon={Shield} color="bg-red-50 text-red-600" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="group relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#34DBC5]" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or ID..."
            className="w-full rounded-[1.5rem] border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm transition-all focus:border-[#34DBC5] focus:outline-none focus:ring-4 focus:ring-[#34DBC5]/10"
          />
        </div>
        
        <button className="flex items-center gap-2 rounded-[1.2rem] bg-gray-900 px-6 py-3 font-bold text-white transition-all hover:bg-black active:scale-95">
          <ArrowUpRight size={18} />
          Export Data
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-xs font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-5">User Identity</th>
                <th className="px-6 py-5">Access Control</th>
                <th className="px-6 py-5">Membership</th>
                <th className="px-6 py-5">Learning Progress</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="group transition-colors hover:bg-gray-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 overflow-hidden rounded-xl bg-gray-100 ring-2 ring-gray-50">
                        <img src={u.image} alt={u.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{u.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                           <Fingerprint size={12} /> {u.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={u.role} />
                  </td>
                  <td className="px-6 py-4">
                    <TierBadge tier={u.tier} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <span className="rounded bg-green-50 px-1.5 py-0.5 text-green-600">{u.level}</span>
                      <span className="text-gray-300">|</span>
                      <span>{u.stats.videos} Videos</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-lg p-2 hover:bg-white hover:shadow-sm focus:outline-none">
                        <MoreVertical size={18} className="text-gray-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-2xl bg-ư">
                        <DropdownMenuLabel className="text-xs uppercase text-gray-400">Manage User</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5">
                          <Mail className="mr-2 h-4 w-4 opacity-50" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => toggleAdmin(u.id)} 
                          className="cursor-pointer rounded-xl py-2.5 font-semibold text-blue-600"
                        >
                          <UserCheck className="mr-2 h-4 w-4 opacity-50" />
                          {u.role === "admin" ? "Demote to User" : "Promote to Admin"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 font-semibold text-red-600 focus:bg-red-50 focus:text-red-600">
                          <Trash2 className="mr-2 h-4 w-4 opacity-50" /> Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-gray-50 p-6 text-gray-300">
               <Search size={48} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No members found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   MOCK USERS DATA (GIỮ NGUYÊN)
========================= */
const MOCK_USERS: AuthUser[] = [
  {
    id: "u_001",
    name: "Trang",
    email: "trang@fluentmind.dev",
    image: "/avatar-placeholder.png",
    role: "admin",
    tier: "premium",
    level: "Beginner",
    stats: { streak: 5, videos: 12, rank: 10, studyTime: "2h 30m" },
  },
  {
    id: "u_002",
    name: "Minh",
    email: "minh@gmail.com",
    image: "/avatar-placeholder.png",
    role: "user",
    tier: "free",
    level: "Intermediate",
    stats: { streak: 3, videos: 8, rank: 25, studyTime: "1h 15m" },
  },
  {
    id: "u_003",
    name: "An",
    email: "an@yahoo.com",
    image: "/avatar-placeholder.png",
    role: "user",
    tier: "premium",
    level: "Advanced",
    stats: { streak: 7, videos: 20, rank: 5, studyTime: "3h 45m" },
  },
];