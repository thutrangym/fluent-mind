"use client";

import GoogleSignInButton from "@/src/app/(auth)/login/google/GoogleSignInButton";

export default function LoginForm() {
  const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-[#88DF46] focus:ring-4 focus:ring-[#88DF46]/10 focus:outline-none";

  return (
    <div className="space-y-8">
     

      <form className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
          <input type="email" placeholder="name@company.com" className={inputClass} />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Password</label>
            <a href="#" className="text-xs font-semibold text-[#34DBC5] hover:underline">Forgot?</a>
          </div>
          <input type="password" placeholder="••••••••" className={inputClass} />
        </div>

        <button className="w-full rounded-xl bg-gradient-to-r from-[#88DF46] to-[#34DBC5] py-3.5 font-bold text-white shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
          Sign In
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or sign in with</span></div>
      </div>

      <GoogleSignInButton />

      <p className="text-center text-sm text-gray-500 mt-2">
        Don&apos;t have an account?{" "}
        <a href="/register" className="font-bold text-[#34DBC5] hover:text-[#2bb8a5]">Register</a>
      </p>
    </div>
  );
}