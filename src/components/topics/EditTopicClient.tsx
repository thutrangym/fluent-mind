"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { 
  X, 
  Settings, 
  Video, 
  Languages, 
  FileText, 
  Save,
  Plus,
  GripVertical,
  Trash2
} from "lucide-react";
import { useState } from "react";

interface EditTopicModalProps {
  topicId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditTopicModal({ topicId, open, onOpenChange }: EditTopicModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "lessons" | "vocab">("general");

  const tabClass = (id: string) => `
    flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl
    ${activeTab === id 
      ? "bg-[#34DBC5] text-white shadow-lg shadow-green-100" 
      : "text-gray-500 hover:bg-gray-100"}
  `;

  const labelClass = "text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block ml-1";
  const inputClass = "w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm focus:border-[#34DBC5] focus:bg-white focus:ring-4 focus:ring-[#34DBC5]/10 outline-none transition-all";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" />
        
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[120] w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] bg-white shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
          
          <div className="flex h-[80vh] flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-50 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white">
                  <Settings size={24} />
                </div>
                <div>
                  <Dialog.Title className="text-xl font-black text-gray-900">Edit Topic Content</Dialog.Title>
                  <p className="text-xs font-bold text-[#34DBC5]">Configuring Resource: {topicId}</p>
                </div>
              </div>
              <Dialog.Close className="rounded-full p-2 text-gray-400 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-gray-50 bg-gray-50/30 px-8 py-3">
              <button onClick={() => setActiveTab("general")} className={tabClass("general")}>
                <FileText size={16} /> General
              </button>
              <button onClick={() => setActiveTab("lessons")} className={tabClass("lessons")}>
                <Video size={16} /> Lessons
              </button>
              <button onClick={() => setActiveTab("vocab")} className={tabClass("vocab")}>
                <Languages size={16} /> Vocabulary
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
              {activeTab === "general" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <label className={labelClass}>Topic Title</label>
                    <input className={inputClass} defaultValue="Daily Conversation" />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea className={`${inputClass} h-32 resize-none`} defaultValue="Master common everyday phrases..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Level</label>
                      <select className={inputClass}>
                        <option>A1 - Beginner</option>
                        <option>B1 - Intermediate</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Status</label>
                      <select className={inputClass}>
                        <option>Active</option>
                        <option>Draft</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "lessons" && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Video Playlist</h3>
                    <button className="flex items-center gap-2 text-xs font-bold text-[#34DBC5] hover:underline">
                      <Plus size={14} /> Add Video
                    </button>
                  </div>
                  {[1, 2].map((i) => (
                    <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#34DBC5]/30 hover:shadow-md transition-all">
                      <GripVertical className="text-gray-300 cursor-grab" size={20} />
                      <div className="h-12 w-20 rounded-lg bg-gray-200" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">Video Lesson {i}</p>
                        <p className="text-xs text-gray-400">04:30 • Ready to stream</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "vocab" && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40">
                  <Languages size={48} />
                  <p className="font-bold">Vocabulary management coming soon...</p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-50 p-6 md:p-8 flex justify-end gap-3 bg-gray-50/20">
              <Dialog.Close className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">
                Cancel
              </Dialog.Close>
              <button 
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-900 text-white font-bold shadow-xl shadow-gray-200 hover:bg-black active:scale-95 transition-all"
              >
                <Save size={18} />
                Update Content
              </button>
            </div>
          </div>
          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}