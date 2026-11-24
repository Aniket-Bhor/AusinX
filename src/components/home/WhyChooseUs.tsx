import React from "react";
import {
  ShieldCheck,
  RefreshCw,
  Clock,
  MessageSquareCheck,
  Sparkles,
} from "lucide-react";
import { getAboutCopy, getSiteImages } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import WhyChooseUsSlider from "./WhyChooseUsSlider";

const icons = [ShieldCheck, RefreshCw, Clock, MessageSquareCheck];

export default async function WhyChooseUs() {
  const [aboutCopy, siteImages] = await Promise.all([
    getAboutCopy(),
    getSiteImages(),
  ]);
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Heading, Value Proposition & Expanded Interactive Slider */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent-light border border-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trust &amp; Engineering Accountability</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary tracking-tight leading-[1.12] font-heading">
              Why Businesses &amp; Clinics Trust AusinX
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Downtime in biomedical and industrial environments has direct consequences for operations and patient care. We eliminate risk with proactive engineering.
            </p>

            {/* Expanded Visual Feature Card with Continuous Hover Slider */}
            <WhyChooseUsSlider siteImages={siteImages} />
          </div>

          {/* Right Column: 4 Interactive Glowing Cards Adjusted Harmoniously */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {aboutCopy.whyChooseUs.map((point, index) => {
              const Icon = icons[index] || ShieldCheck;
              return (
                <Reveal key={point.title} delay={index * 80} direction="scale">
                  <div
                    className="group relative h-full p-5 sm:p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90 hover:border-brand-accent/40 hover:bg-white hover:glow-sm hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 space-y-3 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-brand-primary text-brand-accent-on-dark group-hover:bg-brand-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center font-bold shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-brand-accent transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-brand-primary font-heading group-hover:text-brand-accent transition-colors">
                        {point.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
