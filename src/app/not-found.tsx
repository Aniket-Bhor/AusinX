import React from "react";
import Link from "next/link";
import { Home, Phone, ArrowRight, Wrench, Settings, Package, Gauge } from "lucide-react";
import { getServices } from "@/lib/content";

const serviceIcons: Record<string, typeof Wrench> = {
  "service-maintenance": Wrench,
  "installation-commissioning": Settings,
  "parts-logistics": Package,
  calibration: Gauge,
};

export default async function NotFound() {
  const services = await getServices();

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-bg-tint px-4 py-16">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl text-center space-y-6">
        <div className="space-y-2">
          <span className="text-5xl font-extrabold text-brand-accent font-mono tracking-tight">404</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-primary font-heading">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist or may have been moved. You can explore our engineering capabilities below or get in touch.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="text-left pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
            Core Engineering Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.slice(0, 4).map((service) => {
              const Icon = serviceIcons[service.slug] || Wrench;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-surface-subtle hover:bg-brand-accent-light/40 hover:border-brand-accent/40 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-primary text-brand-accent-on-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors truncate">
                      {service.navTitle}
                    </div>
                    <span className="text-[11px] font-semibold text-brand-accent flex items-center gap-1 mt-0.5">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-primary-hover transition-colors shadow-sm"
          >
            <Home className="w-4 h-4 text-brand-accent" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-brand-primary text-xs font-bold uppercase tracking-wider hover:bg-brand-accent-hover transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Engineering Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
