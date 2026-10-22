import React from "react";
import Link from "next/link";
import { Phone, Mail, ArrowRight, Clock, ShieldAlert } from "lucide-react";
import { siteSettings } from "@/lib/content";

export default function CtaBand() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#121E2A] via-[#1A2A3A] to-[#121E2A] text-white border-t border-slate-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#24384D]/80 border border-slate-700 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
                Direct Engineering Support
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Need Immediate Equipment Support or a Maintenance Assessment?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Speak directly with our Australian engineering team. We assist healthcare departments, imaging facilities, and clinical engineering teams with rapid response and dependable scheduling.
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-300 pt-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Operating Hours: 09:00 AM – 5:00 PM (Monday – Friday)</span>
              </div>
            </div>

            {/* Right Contact Card & Actions */}
            <div className="lg:col-span-5 bg-[#1A2A3A] rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-5">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Call Our Engineering Team
              </p>

              <div className="space-y-2">
                {siteSettings.phones.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-slate-700/60 text-white font-semibold text-sm transition-all group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>{phone.display}</span>
                    </span>
                    <span className="text-xs text-amber-400 group-hover:translate-x-1 transition-transform">
                      Call Now →
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-700">
                <a
                  href={`mailto:${siteSettings.publicEmail}`}
                  className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-amber-300 transition-colors py-1"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{siteSettings.publicEmail}</span>
                </a>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-sm hover:bg-[#E0A400] transition-all shadow-md active:scale-98"
              >
                <span>Submit an Online Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
