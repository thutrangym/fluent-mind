"use client";

import { useEffect, useState } from "react";
import { Subtitle } from "@/src/types/subtitle";
import VideoPlayer from "./VideoPlayer";
import { YouTubePlayer } from "react-youtube";

interface Props {
  youtubeId: string;
  subtitles: Subtitle[];
}

export default function DictationMode({ youtubeId, subtitles }: Props) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showVideo, setShowVideo] = useState(true);

  const [revealedWords, setRevealedWords] = useState<number[]>([]);
  const [showFull, setShowFull] = useState(false);

  const current = subtitles[index];
  const words = current.text.split(" ");
  const progress = ((index + 1) / subtitles.length) * 100;

  /* ---------------- AUTO STOP LOGIC ---------------- */
  useEffect(() => {
    if (!player) return;
    const interval = setInterval(() => {
      const time = player.getCurrentTime();
      if (time >= current.endTime) {
        player.pauseVideo();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [player, current]);

  /* ---------------- ACTIONS ---------------- */
  
  const playSentence = () => {
    if (!player) return;
    player.seekTo(current.startTime, true);
    player.playVideo();
  };

  const next = () => {
    if (index + 1 >= subtitles.length) return;
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setAnswer("");
    setRevealedWords([]);
    setShowFull(false);
    if (player) {
      player.seekTo(subtitles[nextIndex].startTime, true);
      player.playVideo();
    }
  };

  const revealWord = () => {
    const nextIndex = revealedWords.length;
    if (nextIndex < words.length) {
      setRevealedWords([...revealedWords, nextIndex]);
    }
  };

  const normalize = (text: string) =>
    text.toLowerCase().replace(/[^\w\s]/g, "").trim();

  const isCorrect = normalize(answer) === normalize(current.text);

  /* ---------------- RENDER HINT WITH * ---------------- */
  const renderHint = () => {
    if (showFull) return current.text;
    return words
      .map((w, i) => (revealedWords.includes(i) ? w : "*".repeat(w.length)))
      .join(" ");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-8 md:p-12 min-h-screen bg-[#FAFFF6] text-slate-800 font-sans">
      
      {/* VIDEO SECTION - BORDERED CONTAINER */}
      <div className={`flex-1 transition-all duration-500 ${showVideo ? "opacity-100" : "opacity-5"}`}>
        <div className="sticky top-10 rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-green-900/5 bg-white">
          <VideoPlayer youtubeId={youtubeId} onReady={setPlayer} />
        </div>
      </div>

      {/* INTERACTION SECTION */}
      <div className="flex-1 flex flex-col gap-8 max-w-xl mx-auto w-full">
        
        {/* PROGRESS BOX */}
        <div className="p-4 bg-white/50 border border-green-100 rounded-2xl">
          <div className="flex justify-between text-[10px] font-bold text-green-700/60 uppercase tracking-widest mb-2">
            <span>Progress</span>
            <span>{index + 1} of {subtitles.length}</span>
          </div>
          <div className="w-full bg-green-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* HINT SECTION - CLEAR BORDER & BACKGROUND */}
        <div className="relative p-8 bg-white border-2 border-green-100 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center text-center min-h-[180px]">
          <span className="absolute -top-3 left-8 px-3 py-1 bg-[#FAFFF6] border border-green-100 rounded-full text-[10px] font-black uppercase text-green-600">
            Hint Area
          </span>
          <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed font-serif">
            {renderHint()}
          </p>
        </div>

        {/* INPUT SECTION - DISTINCT BORDER */}
        <div className="space-y-2">
          <div className="relative group">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              autoFocus
              placeholder="Listen and type the sentence..."
              className={`w-full bg-white border-2 rounded-2xl p-5 text-xl transition-all outline-none shadow-sm
                ${isCorrect 
                  ? "border-green-500 ring-4 ring-green-50 text-green-700" 
                  : "border-slate-200 focus:border-green-400 focus:ring-4 focus:ring-green-100/50"
                }`}
            />
            {/* AUTO CHECK RESULT */}

        {answer && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-green-500 font-bold animate-in fade-in zoom-in">
            {isCorrect ? (
              <span className="text-green-500">✓</span>
            ) : (
              <span className="text-red-500">✗</span>
            )}
          </div>
        )}
          </div>
          <p className="text-[10px] text-slate-400 pl-2 uppercase font-bold tracking-tighter">
            {isCorrect ? "Perfectly matched!" : "Typing area"}
          </p>
        </div>

        {/* CONTROL PANEL */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={playSentence}
            className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
          >
            <span className="text-lg font-bold">↺</span>
            <span className="text-xs font-black uppercase tracking-widest">Replay</span>
          </button>

          <button
            onClick={next}
            disabled={!isCorrect && !showFull}
            className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all
              ${isCorrect 
                ? "bg-green-600 text-white shadow-lg shadow-green-200 translate-y-[-2px]" 
                : "bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed"
              }`}
          >
            Next ➔
          </button>

          {/* UTILITY ROW */}
          <div className="col-span-2 flex justify-between px-2 pt-2 border-t border-green-100/50">
            <button
              onClick={revealWord}
              className="text-[11px] font-bold text-slate-400 hover:text-amber-600 flex items-center gap-1.5 transition-colors"
            >
              <span className="text-amber-500">★</span> Reveal word
            </button>

            <button
              onClick={() => setShowFull(true)}
              className="text-[11px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <span className="text-blue-500">👁</span> Show all
            </button>

            <button
              onClick={() => setShowVideo(!showVideo)}
              className="text-[11px] font-bold text-slate-400 hover:text-green-600 flex items-center gap-1.5 transition-colors"
            >
              <span className="text-green-500">📽</span> {showVideo ? "Hide" : "Show"} Video
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}