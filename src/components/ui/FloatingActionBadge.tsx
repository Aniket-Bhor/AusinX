"use client";

import React, { useState } from "react";
import { Zap, Phone, Sparkles } from "lucide-react";
import QuickQuoteModal from "./QuickQuoteModal";

export default function FloatingActionBadge() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Floating Action Trigger in bottom-right */}
      <aside aria-label="Emergency engineering dispatch" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => setModalOpen(true)}
          className="group relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-full bg-[#0F172A] text-white shadow-[0_12px_35px_rgba(15,23,42,0.4)] hover:shadow-[0_16px_45px_rgba(239,68,68,0.45)] border border-red-500/40 hover:border-red-400 transition-all duration-300 hover:scale-105 active:scale-95 pulse-beacon-red"
          aria-label="Open instant engineering dispatch modal"
        >
          {/* Pulsing Surgical Red beacon dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444]"></span>
          </span>

          <div className="text-left">
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#F59E0B] flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-current" /> Instant Support
            </div>
            <div className="text-xs font-bold text-white leading-tight">
              Emergency Dispatch &amp; Quote
            </div>
          </div>

          <span className="ml-1 w-7 h-7 rounded-full bg-[#EF4444] group-hover:bg-red-400 text-white flex items-center justify-center transition-colors">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </span>
        </button>
      </aside>

      <QuickQuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
