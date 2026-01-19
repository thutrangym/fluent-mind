"use client";

import { useState } from "react";
import FaqAccordion from "@/src/components/FaqAccordion"; 

export default function PricingPage() {
    const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free");
  return (
    <main className="bg-[#FAFFF6]">
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-20">
        {/* ===== HEADER ===== */}
        <section className="text-center">
          <h1 className="text-4xl font-bold">
            Choose Your Perfect Plan
          </h1>
          <p className="mt-3 text-gray-500">
            Learn English effectively with our diverse service packages
          </p>
        </section>

        {/* ===== PRICING CARDS ===== */}
<section className="grid gap-8 md:grid-cols-2">
  {/* ===== FREE PLAN ===== */}
  <div
    onClick={() => setSelectedPlan("free")}
    className={`relative cursor-pointer rounded-2xl border bg-white p-8 transition-all duration-300
      ${
        selectedPlan === "free"
          ? "scale-105 border-blue-500 ring-2 ring-blue-400 shadow-xl"
          : "opacity-80 hover:opacity-100"
      }`}
  >
    {selectedPlan === "free" && (
      <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
        Selected
      </span>
    )}

    <div className="mb-6 text-center">
      <div className="mx-auto mb-2 text-3xl">⭐</div>
      <h2 className="text-xl font-semibold">Free</h2>
      <p className="text-sm text-gray-500">Perfect for beginners</p>
      <p className="mt-4 text-3xl font-bold">Free</p>
    </div>

    <ul className="space-y-3 text-sm">
      <li>✅ Unlimited access to 100+ lessons</li>
      <li>✅ Unlimited dictation</li>
      <li>✅ Shadowing with basic scoring</li>
      <li>✅ Learning progress tracking</li>
    </ul>

    <button
      className={`mt-8 w-full rounded-xl py-3 font-medium transition
        ${
          selectedPlan === "free"
            ? "bg-blue-600 text-white"
            : "border hover:bg-gray-50"
        }`}
    >
      {selectedPlan === "free" ? "Current Plan" : "Choose Free"}
    </button>
  </div>

  {/* ===== PREMIUM PLAN ===== */}
  <div
    onClick={() => setSelectedPlan("premium")}
    className={`relative cursor-pointer rounded-2xl border-2 p-8 transition-all duration-300
      ${
        selectedPlan === "premium"
          ? "scale-105 border-yellow-400 bg-yellow-50 ring-2 ring-yellow-400 shadow-2xl"
          : "border-yellow-200 bg-yellow-50/40 opacity-80 hover:opacity-100"
      }`}
  >
    {selectedPlan === "premium" && (
      <span className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
        Selected
      </span>
    )}

    <div className="mb-6 text-center">
      <div className="mx-auto mb-2 text-3xl">👑</div>
      <h2 className="text-xl font-semibold">Premium</h2>
      <p className="text-sm text-gray-500">
        Unlock full learning experience
      </p>

      <p className="mt-4 text-4xl font-bold">$2.69</p>
      <p className="text-xs text-gray-500">
        One-time payment for 1 month
      </p>
    </div>

    <ul className="space-y-3 text-sm">
      <li>✅ All Free plan features</li>
      <li>✅ Unlimited access to all lessons</li>
      <li>✅ Unlock all vocabulary decks</li>
      <li>✅ Priority support</li>
      <li>✅ Remove ads</li>
    </ul>

    <button
      className={`mt-8 w-full rounded-xl py-3 font-semibold transition
        ${
          selectedPlan === "premium"
            ? "bg-yellow-400 text-black hover:bg-yellow-300"
            : "border border-yellow-400 hover:bg-yellow-100"
        }`}
    >
      {selectedPlan === "premium" ? "Proceed to Checkout" : "Choose Premium"}
    </button>
  </div>
</section>


        {/* ===== CTA ===== */}
        <section className="rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-12 text-center">
          <h2 className="text-2xl font-bold">
            Ready to start your English learning journey?
          </h2>
          <p className="mt-2 text-gray-600">
            Choose your plan and start learning today
          </p>

          <button className="mt-6 rounded-full bg-blue-600 px-10 py-3 font-medium text-white hover:bg-blue-700">
            Start for Free
          </button>

          <p className="mt-2 text-xs text-gray-500">
            No credit card required • Free forever
          </p>
        </section>

        {/* ===== FAQ (reuse component) ===== */}
        <section className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <FaqAccordion />
        </section>
      </div>
    </main>
  );
}

