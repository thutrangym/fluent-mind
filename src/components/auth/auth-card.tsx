import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#f0f4f0] p-4 md:p-6 overflow-hidden">
      {/* Trang trí nền (Optional) */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#88DF46]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#34DBC5]/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
        {/* Left - Branding: Ẩn trên mobile, hiện từ tablet trở lên */}
        <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-[#88DF46] to-[#34DBC5] p-12 text-white md:flex">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Fluent Mind</span>
            </div>

            <div className="mt-16">
              <h1 className="text-4xl font-extrabold leading-[1.1]">
                Master English <br />
                <span className="text-[#1a4d2e]/30 text-3xl">Through Stories.</span>
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed">
                Experience real-life conversations and level up your skills with our curated roadmap.
              </p>
            </div>
          </div>

          <div className="space-y-4 border-t border-white/20 pt-8">
            {[
              "Improve listening & pronunciation",
              "Beginner → Advanced roadmap",
              "Short videos, real contexts",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">✓</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form Content */}
        <div className="flex w-full flex-col justify-center bg-[#FAFFF6]/30 p-8 md:w-1/2 lg:p-12">
          <div className="mx-auto w-full max-w-[380px]">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}