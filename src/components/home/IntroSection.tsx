import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { getAboutCopy } from "@/lib/content";

export default async function IntroSection() {
  const aboutCopy = await getAboutCopy();
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A]/5 text-[#0F172A] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0F172A]/10">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>Who We Are</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight font-heading">
            End-to-End Solutions Across the Whole Equipment Lifecycle
          </h2>
        </div>

        {/* Verbatim Section 7.1 paragraphs */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-[#475569] text-base leading-relaxed">
          <div className="bg-[#F1F5F9] p-6 sm:p-8 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] bg-white px-2.5 py-1 rounded border border-slate-200">
              Australian Owned
            </span>
            <p className="text-[#0F172A] font-medium pt-2">
              {aboutCopy.intro[0]}
            </p>
          </div>

          <div className="bg-[#F1F5F9] p-6 sm:p-8 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] bg-white px-2.5 py-1 rounded border border-slate-200">
              End-to-End Solutions
            </span>
            <p className="text-[#0F172A] font-medium pt-2">
              {aboutCopy.intro[1]}
            </p>
          </div>

          <div className="bg-[#F1F5F9] p-6 sm:p-8 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] bg-white px-2.5 py-1 rounded border border-slate-200">
              Clinical Consequence
            </span>
            <p className="text-[#0F172A] font-medium pt-2">
              {aboutCopy.intro[2]}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-[#DDEAE9] bg-[#F8FAFC] text-[#0F172A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5F4F2] text-[#047857] flex items-center justify-center shrink-0 font-bold">
              âœ“
            </div>
            <div>
              <p className="font-semibold text-sm text-[#0F172A]">
                Learn more about our team and service philosophy
              </p>
              <p className="text-xs text-slate-600">
                Discover our commitment to Australian healthcare and clinical uptime.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white hover:bg-[#EAF5F4] border border-slate-200 px-4 py-2.5 rounded-full text-[#047857] transition-colors"
          >
            <span>Read About AusinX</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
