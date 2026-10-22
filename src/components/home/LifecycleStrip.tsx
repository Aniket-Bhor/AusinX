import React from "react";
import {
  ClipboardList,
  Cpu,
  Wrench,
  PackageCheck,
  Trash2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Planning & Sourcing",
    desc: "Technical consultation & requirements alignment",
    icon: ClipboardList,
  },
  {
    num: "02",
    title: "Installation & Commissioning",
    desc: "Precision handover ready for immediate clinical use",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Service & Calibration",
    desc: "Preventive maintenance & documented accuracy checks",
    icon: Wrench,
  },
  {
    num: "04",
    title: "Parts & Logistics",
    desc: "Reliable sourcing and prompt healthcare delivery",
    icon: PackageCheck,
  },
  {
    num: "05",
    title: "Decommissioning & Disposal",
    desc: "Safe, compliant retirement at end of lifecycle",
    icon: Trash2,
  },
];

export default function LifecycleStrip() {
  return (
    <section className="py-20 bg-[#1A2A3A] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block">
            Full Equipment Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Your Single Partner Across the Whole Equipment Lifecycle
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From the first planning conversation through to safe, compliant disposal, we manage the detail so your clinical teams can stay focused on patient care.
          </p>
        </div>

        {/* Horizontal Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#24384D]/70 hover:bg-[#24384D] border border-slate-700/80 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-amber-400 font-mono tracking-wider">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center group-hover:bg-[#F8B800] group-hover:text-[#1A2A3A] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block pt-3 text-right text-slate-500">
                    <ArrowRight className="w-3.5 h-3.5 inline text-amber-400/50" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
