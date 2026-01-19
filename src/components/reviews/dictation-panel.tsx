import { Play, RotateCcw, CheckCircle2, Info } from "lucide-react";

export default function DictationPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
      {/* LEFT - VIDEO & PROGRESS */}
      <div className="space-y-4">
        <div className="group relative overflow-hidden rounded-[2rem] bg-black shadow-2xl transition-all hover:shadow-green-900/10">
          <div className="aspect-video w-full flex items-center justify-center text-white/50">
             {/* Thay thế bằng component Video thực tế */}
             <Play size={48} className="opacity-50 group-hover:scale-110 transition-transform" />
             <span className="ml-3 font-medium">Video Player</span>
          </div>
          
          {/* Overlay Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-white/20">
            <div className="h-full w-[30%] bg-[#88DF46] shadow-[0_0_10px_#88DF46]" />
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
             <Info size={16} />
             <span>Tip: Press <kbd className="rounded border bg-gray-100 px-1.5 py-0.5 text-xs">Tab</kbd> to replay audio</span>
           </div>
        </div>
      </div>

      {/* RIGHT - DICTATION INTERFACE */}
      <div className="flex flex-col rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dictation</h2>
            <p className="text-sm text-gray-500">Sentence 3 of 12</p>
          </div>
          <div className="h-12 w-12 rounded-full border-4 border-[#34DBC5]/20 border-t-[#34DBC5] flex items-center justify-center text-xs font-bold text-[#34DBC5]">
            25%
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Answer</label>
          <textarea
            placeholder="Listen carefully and type what you hear..."
            className="h-40 w-full resize-none rounded-2xl border-2 border-gray-50 bg-gray-50/50 p-5 text-lg leading-relaxed transition-all focus:border-[#34DBC5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#34DBC5]/10"
          />
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95">
            <RotateCcw size={18} />
            Replay
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#88DF46] to-[#34DBC5] py-3.5 font-bold text-white shadow-lg shadow-green-200 transition-all hover:opacity-90 active:scale-95">
            <CheckCircle2 size={18} />
            Check Answer
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { label: "Accuracy", value: "85%", color: "text-[#34DBC5]" },
            { label: "Mistakes", value: "2", color: "text-red-400" },
            { label: "Speed", value: "Fast", color: "text-blue-400" },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl bg-gray-50/80 p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
              <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}