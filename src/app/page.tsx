import Image from "next/image";
import img1 from "../assets/img1.jpg";
import FaqAccordion from "../components/FaqAccordion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-32">

        {/* ================= HERO ================= */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Welcome to <span className="text-blue-500">Fluent Mind</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Your ultimate language learning app designed to boost your fluency
              through engaging topics, comprehensive reviews, and extensive
              vocabulary.
            </p>

            <button className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-blue-600">
              Get Started
            </button>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <Image
              src={img1}
              alt="Fluent Mind Illustration"
              priority
              className="w-full rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            In just 4 simple steps, you&apos;ll begin your journey to improve your
            English skills effectively and enjoyably.
          </p>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Choose Your Lesson", "Select lessons that match your interests and proficiency level.", "step1.webp"],
              ["Listen and Dictate", "Practice dictation with instant AI feedback.", "step2.webp"],
              ["Shadow and Record", "Improve pronunciation and fluency.", "step3.webp"],
              ["Track Your Progress", "Monitor strengths and improvements.", "step4.webp"],
            ].map(([title, desc, img], i) => (
              <article key={i} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {desc}
                </p>
                <img
                  src={`https://assets.parroto.app/images/landing/${img}`}
                  alt={title}
                  className="mx-auto"
                />
              </article>
            ))}
          </div>
        </section>

        {/* ================= WHY CHOOSE ================= */}
        <section>
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">
              Why choose Fluent Mind?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Discover the powerful features that make Fluent Mind the ultimate
              language learning app.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {[
              ["Enhanced Listening Skills", "Train your ears with native speakers."],
              ["Natural Speaking Practice", "Speak confidently with shadowing."],
              ["Better Memory Retention", "Reinforce vocabulary through mistakes."],
              ["Progress Tracking", "Track improvement with detailed reports."],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 p-6 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-blue-600">
              Try now
            </button>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section>
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of learners improving English with Fluent Mind.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Fluent Mind improved my listening skills dramatically.", "Sarah L."],
              ["Shadowing helped me speak naturally.", "Mark T."],
              ["Instant feedback keeps me focused.", "Emily R."],
            ].map(([quote, name], i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
              >
                <p className="text-gray-800 dark:text-gray-200">“{quote}”</p>
                <p className="mt-4 font-semibold text-gray-900 dark:text-white">
                  – {name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Common questions about Fluent Mind.
            </p>
          </div>
          <FaqAccordion />
          
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="pt-12 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Fluent Mind. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
