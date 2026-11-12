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
          className="group relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-full bg-[#0B2942] text-white shadow-[0_12px_35px_rgba(11,41,66,0.35)] hover:shadow-[0_16px_45px_rgba(7,153,154,0.45)] border border-teal-400/30 hover:border-teal-400 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open instant engineering dispatch modal"
        >
          {/* Pulsing beacon dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55C7C2] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#07999A]"></span>
          </span>

          <div className="text-left">
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#55C7C2] flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-current" /> Instant Support
            </div>
            <div className="text-xs font-bold text-white leading-tight">
              Emergency Dispatch &amp; Quote
            </div>
          </div>

          <span className="ml-1 w-7 h-7 rounded-full bg-[#07999A] group-hover:bg-[#55C7C2] text-[#0B2942] flex items-center justify-center transition-colors">
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
