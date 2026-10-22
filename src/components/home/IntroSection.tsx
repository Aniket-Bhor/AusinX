import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { aboutCopy } from "@/lib/content";

export default function IntroSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2A3A]/5 text-[#1A2A3A] text-xs font-bold uppercase tracking-wider mb-4 border border-[#1A2A3A]/10">
            <ShieldCheck className="w-4 h-4 text-[#F8B800]" />
            <span>Who We Are</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A2A3A] tracking-tight leading-tight font-heading">
            End-to-End Solutions Across the Whole Equipment Lifecycle
          </h2>
        </div>

        {/* Verbatim Section 7.1 paragraphs */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-[#475569] text-base leading-relaxed">
          <div className="bg-[#F1F5F9] p-6 sm:p-8 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A2A3A] bg-white px-2.5 py-1 rounded border border-slate-200">
              Australian Owned
            </span>
            <p className="text-[#0F172A] font-medium pt-2">
              {aboutCopy.intro[0]}
            </p>
          </div>

          <div className="bg-[#F1F5F9] p-6 sm:p-8 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A2A3A] bg-white px-2.5 py-1 rounded border border-slate-200">
              End-to-End Solutions
            </span>
            <p className="text-[#0F172A] font-medium pt-2">
              {aboutCopy.intro[1]}
            </p>
          </div>

          <div className="bg-[#F1F5F9] p-6 sm:p-8 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A2A3A] bg-white px-2.5 py-1 rounded border border-slate-200">
              Clinical Consequence
            </span>
            <p className="text-[#0F172A] font-medium pt-2">
              {aboutCopy.intro[2]}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl bg-[#1A2A3A] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8B800] text-[#1A2A3A] flex items-center justify-center shrink-0 font-bold">
              ✓
            </div>
            <div>
              <p className="font-bold text-sm text-white">
                Learn more about our team and service philosophy
              </p>
              <p className="text-xs text-slate-300">
                Discover our commitment to Australian healthcare and clinical uptime.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg text-amber-300 transition-colors"
          >
            <span>Read About AusinX</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
