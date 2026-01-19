import { Mic, PlayCircle, RotateCcw, SkipForward, Volume2 } from "lucide-react";

export default function ShadowingPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      {/* LEFT - VIDEO PLAYER */}
      <div className="sticky top-6">
        <div className="overflow-hidden rounded-[2rem] bg-black shadow-2xl">
          <div className="aspect-video w-full flex items-center justify-center text-white/30">
            <PlayCircle size={60} />
          </div>
        </div>
        
        {/* Helper Card */}
        <div className="mt-6 rounded-2xl bg-[#88DF46]/10 p-4 flex items-start gap-4 border border-[#88DF46]/20">
          <Volume2 className="text-[#2e7d32] shrink-0" />
          <p className="text-sm text-[#2e7d32]">
            <strong>Listen & Repeat:</strong> Try to match the speaker&apos;s rhythm and intonation as closely as possible.
          </p>
        </div>
      </div>

      {/* RIGHT - RECORDING AREA */}
      <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Shadowing</h2>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full ${i === 1 ? "bg-[#34DBC5]" : "bg-gray-100"}`} />
            ))}
          </div>
        </div>

        {/* Transcript Focus */}
        <div className="relative mb-10 overflow-hidden rounded-2xl bg-gray-50 p-8 text-center ring-1 ring-inset ring-gray-100">
          <span className="absolute left-4 top-2 text-4xl font-serif text-gray-200">“</span>
          <p className="text-2xl font-bold leading-relaxed text-gray-700">
            What’s your <span className="text-[#34DBC5]">English level</span> right now?
          </p>
          <span className="absolute bottom-0 right-4 text-4xl font-serif text-gray-200">”</span>
        </div>

        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <button className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
               <RotateCcw size={20} />
            </button>
            
            <button className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-200 transition-all hover:scale-110 active:scale-95">
              <div className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-20 group-hover:hidden" />
              <Mic size={32} />
            </button>

            <button className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
               <PlayCircle size={20} />
            </button>
          </div>
          <p className="text-sm font-semibold text-red-500 animate-pulse">Recording...</p>
        </div>

        {/* Analysis Results */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
          {[
            { label: "Pronunciation", score: "A", sub: "Excellent" },
            { label: "Fluency", score: "B+", sub: "Good" },
            { label: "Stress", score: "A", sub: "Perfect" },
          ].map((res, i) => (
            <div key={i} className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{res.label}</p>
              <p className="my-1 text-2xl font-black text-gray-800">{res.score}</p>
              <p className="text-xs font-medium text-[#34DBC5]">{res.sub}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 font-bold text-white transition-all hover:bg-black active:scale-[0.98]">
          Next sentence
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
}