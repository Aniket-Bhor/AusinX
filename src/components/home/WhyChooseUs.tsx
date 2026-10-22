import React from "react";
import {
  ShieldCheck,
  RefreshCw,
  Clock,
  MessageSquareCheck,
  CheckCircle2,
} from "lucide-react";
import { aboutCopy } from "@/lib/content";

const icons = [ShieldCheck, RefreshCw, Clock, MessageSquareCheck];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A2A3A] bg-[#F1F5F9] px-3 py-1 rounded-full border border-slate-200 inline-block">
              Trust & Accountability
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A3A] tracking-tight leading-tight font-heading">
              Why Healthcare Teams Choose AusinX
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We understand that downtime in clinical and industrial environments has real consequences. Our team works proactively to keep your equipment available, accurate, and performing as it should.
            </p>

            <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Clinical & Operational Peace of Mind</span>
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed">
                Whether fitting out a new clinical space, upgrading ageing technology, or retiring equipment at end of life, we manage the technical detail so your teams can stay focused on patient care.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Points from Section 7.1 */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aboutCopy.whyChooseUs.map((point, index) => {
              const Icon = icons[index] || ShieldCheck;
              return (
                <div
                  key={point.title}
                  className="p-6 rounded-2xl bg-[#F1F5F9] border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1A2A3A] text-[#F8B800] flex items-center justify-center font-bold shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2A3A] font-heading">
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
