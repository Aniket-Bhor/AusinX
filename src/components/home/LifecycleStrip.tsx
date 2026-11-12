import {
  ClipboardList,
  Cpu,
  Wrench,
  PackageCheck,
  Trash2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getLifecycleSteps } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

const icons = [ClipboardList, Cpu, Wrench, PackageCheck, Trash2];

export default async function LifecycleStrip() {
  const steps = await getLifecycleSteps();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2942] to-[#071F33] text-white py-24">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[70rem] h-[25rem] bg-teal-500/10 blur-[140px] rounded-full animate-orb" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-[#55C7C2]" />
            <span>Complete Lifecycle Governance</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
            One Single Partner Through Every Phase
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-2xl mx-auto">
            From initial clinical room planning to certified retirement, AusinX delivers end-to-end technical continuity.
          </p>
        </div>

        {/* 5-Step Connected Workflow */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = icons[index] || Wrench;
            return (
              <Reveal key={step.step} delay={index * 90} className="h-full">
                <div
                  className="group relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#55C7C2] hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(7,153,154,0.25)] flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold tracking-widest text-[#55C7C2] bg-teal-950/70 border border-teal-500/30 px-2.5 py-1 rounded-lg">
                        {step.step}
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#55C7C2] transition-all duration-300 group-hover:bg-[#07999A] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold text-white group-hover:text-[#55C7C2] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-5 text-slate-300">
                      {step.description}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <ArrowRight className="pulse-beacon absolute -right-3.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full bg-[#07999A] p-1.5 text-white shadow-lg lg:block group-hover:scale-110 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
