"use client";

import { useState } from "react";
import {
  X,
  LayoutGrid,
  Type,
  AlignLeft,
  BarChart,
  ToggleLeft,
  Plus,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

type TopicLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export default function TopicFormModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-[#34DBC5] focus:bg-white focus:ring-4 focus:ring-[#34DBC5]/10 focus:outline-none";
  const labelClass =
    "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-[120] w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300 focus:outline-none">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Sử dụng LayoutGrid thay thế */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#34DBC5]/10 text-[#34DBC5]">
                <LayoutGrid size={24} />
              </div>
              <div>
                <Dialog.Title className="text-xl font-black text-gray-900">
                  Create New Topic
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-500">
                  Add a new learning path to your library.
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close className="rounded-full p-2 text-gray-400 hover:bg-gray-100 transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            {/* Topic Name */}
            <div>
              <label className={labelClass}>
                <Type size={14} /> Topic Name
              </label>
              <input
                placeholder="e.g. Travel and Tourism"
                className={inputClass}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>
                <AlignLeft size={14} /> Description
              </label>
              <textarea
                placeholder="Briefly describe the content of this topic..."
                className={`${inputClass} h-28 resize-none`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Level Selection */}
              <div>
                <label className={labelClass}>
                  <BarChart size={14} /> Level
                </label>
                <select
                  className={`${inputClass} appearance-none cursor-pointer font-bold text-gray-700`}
                >
                  {["A1", "A2", "B1", "B2", "C1"].map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl} -{" "}
                      {lvl.startsWith("A")
                        ? "Beginner"
                        : lvl.startsWith("B")
                          ? "Intermediate"
                          : "Advanced"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Selection */}
              <div>
                <label className={labelClass}>
                  <ToggleLeft size={14} /> Status
                </label>
                <select
                  className={`${inputClass} appearance-none cursor-pointer font-bold text-gray-700`}
                >
                  <option value="active">🟢 Active</option>
                  <option value="draft">🟡 Draft</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3 pt-4 border-t border-gray-50">
              <Dialog.Close className="flex-1 rounded-2xl border border-gray-100 py-4 font-bold text-gray-500 transition-all hover:bg-gray-50 active:scale-95">
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                className="flex-[2] rounded-2xl bg-gray-900 py-4 font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-black active:scale-95"
              >
                Create Topic
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
