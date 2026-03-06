"use client"

import { useEffect, useRef, useState } from "react"
import { Subtitle } from "@/src/types/subtitle"
import VideoPlayer from "../video/VideoPlayer"

interface Props {
  youtubeId: string
  subtitles: Subtitle[]
}

export default function ShadowingMode({ youtubeId, subtitles }: Props) {

  const [player, setPlayer] = useState<any>(null)
  const [index, setIndex] = useState(0)

  const [recording, setRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  const chunks = useRef<Blob[]>([])

  const current = subtitles[index]
  const progress = ((index + 1) / subtitles.length) * 100

  /* ---------------- AUTO PAUSE WHEN SENTENCE ENDS ---------------- */

  useEffect(() => {
    if (!player) return

    const interval = setInterval(() => {

      const time = player.getCurrentTime()

      if (time >= current.endTime) {
        player.pauseVideo()
      }

    }, 200)

    return () => clearInterval(interval)

  }, [player, current])

  /* ---------------- PLAY SENTENCE ---------------- */

  const playSentence = () => {
    if (!player) return

    player.seekTo(current.startTime, true)
    player.playVideo()
  }

  /* ---------------- NEXT SENTENCE ---------------- */

  const nextSentence = () => {

    if (!player) return

    const next = index + 1

    if (next >= subtitles.length) return

    setIndex(next)

    player.seekTo(subtitles[next].startTime, true)
    player.playVideo()
  }

  /* ---------------- RECORD ---------------- */

  const startRecord = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    const recorder = new MediaRecorder(stream)

    recorder.ondataavailable = (e) => {
      chunks.current.push(e.data)
    }

    recorder.onstop = () => {

      const blob = new Blob(chunks.current, {
        type: "audio/webm"
      })

      setAudioBlob(blob)
      chunks.current = []
    }

    recorder.start()

    setRecording(true)
    setMediaRecorder(recorder)
  }

  const stopRecord = () => {
    mediaRecorder?.stop()
    setRecording(false)
  }

  /* ---------------- SEND TO WHISPER ---------------- */

  const sendToWhisper = async () => {

    if (!audioBlob) return

    const formData = new FormData()

    formData.append("file", audioBlob)

    const res = await fetch("/api/speech/whisper", {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    console.log("Transcript:", data.text)
  }

  /* ---------------- UI ---------------- */

  if (!subtitles.length) return <div>No subtitles</div>

  return (
<div className="flex flex-col lg:flex-row gap-12 p-8 md:p-12 min-h-screen bg-[#FAFFF6] text-slate-800 font-sans">
  
  {/* VIDEO SECTION - BORDERED CONTAINER (Same as Dictation) */}
  <div className="flex-1 transition-all duration-500">
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
        

    {/* SUBTITLE SECTION  */}
    <div className="relative p-8 bg-white border-2 border-green-100 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center text-center min-h-[180px]">
      <span className="absolute -top-3 left-8 px-3 py-1 bg-[#FAFFF6] border border-green-100 rounded-full text-[10px] font-black uppercase text-green-600">
        Target Phrase
      </span>
      <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed font-serif italic">
        &quot;{current.text}&quot;
      </p>
    </div>

    {/* RECORDING STATUS / ANALYZING AREA */}
    <div className="flex flex-col items-center justify-center gap-2">
      {recording ? (
        <div className="flex items-center gap-3 px-6 py-3 bg-red-50 border border-red-100 rounded-full animate-pulse">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-xs font-bold text-red-600 uppercase tracking-tighter">Recording Audio...</span>
        </div>
      ) : audioBlob ? (
        <div className="flex items-center gap-3 px-6 py-3 bg-green-50 border border-green-100 rounded-full">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs font-bold text-green-600 uppercase tracking-tighter">Audio Ready to Check</span>
        </div>
      ) : (
        <div className="h-[42px]" /> /* Placeholder to prevent jumpy UI */
      )}
    </div>

    {/* CONTROL PANEL - SYNCED BUTTON GRID */}
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={playSentence}
        className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
      >
        <span className="text-lg font-bold">↺</span>
        <span className="text-xs font-black uppercase tracking-widest">Replay</span>
      </button>

      {!recording ? (
        <button
          onClick={startRecord}
          className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-red-100 text-red-500 rounded-2xl hover:bg-red-50 hover:border-red-200 transition-all active:scale-95 shadow-sm group"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">●</span>
          <span className="text-xs font-black uppercase tracking-widest">Record</span>
        </button>
      ) : (
        <button
          onClick={stopRecord}
          className="flex items-center justify-center gap-2 py-4 bg-red-500 text-white rounded-2xl animate-pulse shadow-lg shadow-red-200 transition-all active:scale-95"
        >
          <span className="text-lg">■</span>
          <span className="text-xs font-black uppercase tracking-widest">Stop</span>
        </button>
      )}

      <button
        onClick={sendToWhisper}
        disabled={!audioBlob || recording}
        className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border
          ${audioBlob && !recording 
            ? "bg-green-600 text-white border-green-700 shadow-lg shadow-green-200 translate-y-[-2px]" 
            : "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
          }`}
      >
        <span className="text-lg">Check</span>
        <span>➔</span>
      </button>

      <button
        onClick={nextSentence}
        className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
      >
        <span className="text-xs font-black uppercase tracking-widest">Skip</span>
        <span className="text-lg font-bold">»</span>
      </button>

      {/* UTILITY ROW - SYNCED FOOTER */}
      <div className="col-span-2 flex justify-center gap-8 px-2 pt-4 border-t border-green-100/50 mt-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${audioBlob ? 'bg-green-500' : 'bg-slate-200'}`} />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Audio Captured</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${recording ? 'bg-red-500 animate-ping' : 'bg-slate-200'}`} />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Mic Active</span>
        </div>
      </div>
    </div>

  </div>
</div>
  )
}