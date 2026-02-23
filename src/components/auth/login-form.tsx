"use client";

import { signIn } from "next-auth/react";
import GoogleSignInButton from "@/src/app/(auth)/login/google/GoogleSignInButton";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-[#88DF46] focus:ring-4 focus:ring-[#88DF46]/10 focus:outline-none";

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);

    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/";
  }

  return (
    <div className="space-y-8">
      <form action={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            className={inputClass}
            required
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Password
            </label>
            <a
              href="#"
              className="text-xs font-semibold text-[#34DBC5] hover:underline"
            >
              Forgot?
            </a>
          </div>

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className={inputClass}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-[#88DF46] to-[#34DBC5] py-3.5 font-bold text-white shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-100"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">
            Or sign in with
          </span>
        </div>
      </div>

      <GoogleSignInButton />

      <p className="text-center text-sm text-gray-500 mt-2">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="font-bold text-[#34DBC5] hover:text-[#2bb8a5]"
        >
          Register
        </a>
      </p>
    </div>
  );
}