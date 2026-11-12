"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";
import type { SiteSettings } from "@/lib/content";

export default function HeroClient({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2942] via-[#0D3352] to-[#071F33] text-white pt-10 pb-20 sm:pt-14 sm:pb-28">
      {/* Glowing Background Radial Effects */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-[#07999A]/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[35rem] w-[35rem] rounded-full bg-[#55C7C2]/15 blur-[140px]" />

      {/* Subtle grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Bold Copy & Direct 'Talk to our team' Action */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            {/* Punchy Visual Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-heading">
                High-Performance <br />
                <span className="bg-gradient-to-r from-[#55C7C2] via-[#75E2DD] to-white bg-clip-text text-transparent">
                  Biomedical &amp; Clinical
                </span>{" "}
                Engineering
              </h1>
              
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Keeping radiotherapy, diagnostic imaging, and critical healthcare systems operating with zero compromise.
              </p>
            </div>

            {/* Action Buttons: 'Talk to our team' redirects to /contact */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#07999A] to-[#087F86] hover:from-[#087F86] hover:to-[#0B5963] px-7 py-4 text-base font-bold text-white shadow-[0_10px_35px_rgba(7,153,154,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <MessageSquare className="h-5 w-5 text-teal-200" />
                <span>Talk to our team</span>
                <ArrowRight className="h-4 w-4 text-teal-200 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40"
              >
                <span>Explore Modalities</span>
                <ArrowRight className="h-4 w-4 text-[#55C7C2]" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#55C7C2]" />
                <span>OEM-Trained Engineers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#55C7C2]" />
                <span>Under 2-Hour Response</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Image Showcase */}
          <div className="lg:col-span-6 relative mx-auto w-full max-w-lg lg:max-w-none">
            
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-[2.5rem] border border-white/15 bg-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.45)] group">
              <Image
                src="/images/client/imaging-suite.jpeg"
                alt="Modern hospital imaging suite maintained by AusinX"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2942]/85 via-[#0B2942]/20 to-transparent" />

              {/* Bottom Overlay Info Banner */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl glass-card-dark p-4 shadow-xl border border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#55C7C2] block">
                  Diagnostic Imaging &amp; Oncology
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  Radiotherapy Linacs, CT Suites, C-Arms &amp; X-Ray
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom High-Impact Metrics Ribbon */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "24/7", label: "Emergency Breakdown Callout", desc: "Melbourne & National" },
            { stat: "99.8%", label: "Clinical Equipment Uptime", desc: "Proactive Preventive Care" },
            { stat: "15+ Yrs", label: "Specialist Engineering", desc: "Linac, CT & Biomedical" },
            { stat: "100%", label: "Australian Owned", desc: "Local Leadership & Spares" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#55C7C2] font-heading tracking-tight group-hover:scale-105 transition-transform">
                {metric.stat}
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                {metric.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {metric.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
