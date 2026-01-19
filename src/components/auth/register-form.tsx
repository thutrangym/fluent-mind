"use client";

import { useState } from "react";
import GoogleSignInButton from "@/src/app/(auth)/login/google/GoogleSignInButton";

type Role = "student" | "admin";

export default function RegisterForm() {
  const [role, setRole] = useState<Role>("student");

  const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-[#88DF46] focus:ring-4 focus:ring-[#88DF46]/10 focus:outline-none";

  return (
    <div className="space-y-6">
      

      <form className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
          <input placeholder="Enter your name" className={inputClass} />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
          <input type="email" placeholder="name@company.com" className={inputClass} />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Password</label>
          <input type="password" placeholder="••••••••" className={inputClass} />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">I am a...</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex flex-col items-center rounded-xl border-2 p-3 transition-all ${
                role === "student" ? "border-[#88DF46] bg-[#88DF46]/5" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <span className="text-xl">🎓</span>
              <span className="mt-1 text-sm font-bold text-gray-700">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex flex-col items-center rounded-xl border-2 p-3 transition-all ${
                role === "admin" ? "border-[#34DBC5] bg-[#34DBC5]/5" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <span className="text-xl">🛠</span>
              <span className="mt-1 text-sm font-bold text-gray-700">Admin</span>
            </button>
          </div>
        </div>

        <button className="w-full rounded-xl bg-gradient-to-r from-[#88DF46] to-[#34DBC5] py-3.5 font-bold text-white shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
          Create Account
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
      </div>

      <GoogleSignInButton />

      <p className="text-center text-sm text-gray-500 mt-2">
        Already have an account?{" "}
        <a href="/login" className="font-bold text-[#34DBC5] hover:text-[#2bb8a5]">Login</a>
      </p>
    </div>
  );
}