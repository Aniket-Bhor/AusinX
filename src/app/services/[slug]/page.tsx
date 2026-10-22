import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  Layers,
  Wrench,
  Cpu,
  Package,
  Gauge,
} from "lucide-react";
import { getServiceBySlug, servicesData, siteSettings } from "@/lib/content";

const iconMap = {
  "service-maintenance": Wrench,
  "installation-commissioning": Cpu,
  "parts-logistics": Package,
  calibration: Gauge,
};

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://www.ausinx.com.au/services/${service.slug}`,
      siteName: "AusinX Solutions",
      locale: "en_AU",
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.slug as keyof typeof iconMap] || Wrench;

  // Find adjacent services for navigation
  const currentIndex = servicesData.findIndex((s) => s.slug === service.slug);
  const prevService =
    currentIndex > 0 ? servicesData[currentIndex - 1] : servicesData[servicesData.length - 1];
  const nextService =
    currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : servicesData[0];

  return (
    <div className="bg-[#F1F5F9] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Nav */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#1A2A3A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#1A2A3A] transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-[#1A2A3A] font-bold">{service.navTitle}</span>
        </nav>

        {/* Main Grid: Content (8 cols) + Sticky Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Box */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1A2A3A] text-[#F8B800] flex items-center justify-center shrink-0 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    Core Engineering Pillar
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A3A] tracking-tight font-heading mt-1">
                    {service.title}
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed pt-2">
                {service.fullDescription}
              </p>
            </div>

            {/* Featured Visual Image */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm">
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  priority
                />
                <div className="absolute bottom-3 right-4">
                  <span className="text-[10px] text-white/90 bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                    {service.imageAlt}
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Services Capabilities (Verbatim Copy from Section 7.3) */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-[#1A2A3A] font-heading">
                  Service Capabilities & Scope
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Client copy from brief Section 7.3 used verbatim.
                </p>
              </div>

              <div className="space-y-4">
                {service.subServices.map((sub) => (
                  <div
                    key={sub.title}
                    className="p-5 sm:p-6 rounded-2xl bg-[#F1F5F9] border border-slate-200/80 space-y-2 hover:bg-slate-100 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-[#1A2A3A] flex items-center gap-2.5 font-heading">
                      <CheckCircle2 className="w-5 h-5 text-[#F8B800] shrink-0" />
                      <span>{sub.title}</span>
                    </h3>
                    <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Engineering Commitments */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#1A2A3A] font-heading">
                Operational Commitments
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                {service.keyHighlights.map((hl) => (
                  <li
                    key={hl}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#F8B800] shrink-0" />
                    <span className="font-medium">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Enquiry CTA Pre-selected */}
            <div className="bg-gradient-to-r from-[#1A2A3A] to-[#24384D] rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#F8B800]" />
                <span>Enquire About {service.navTitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">
                Need Technical Support or an On-Site Assessment?
              </h2>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Our Australian-based engineering team is ready to assist with technical planning, preventive maintenance, and urgent repairs.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-sm hover:bg-[#E0A400] transition-colors shadow-md"
                >
                  <span>Request Enquiry ({service.navTitle})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:0421081256"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call 0421 081 256</span>
                </a>
              </div>
            </div>

            {/* Next / Previous Pillar Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-bold uppercase tracking-wider">
              <Link
                href={`/services/${prevService.slug}`}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1A2A3A] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: {prevService.navTitle}</span>
              </Link>
              <Link
                href={`/services/${nextService.slug}`}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1A2A3A] transition-colors"
              >
                <span>Next: {nextService.navTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Quick Contact & Action Card */}
            <div className="bg-[#1A2A3A] text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Direct Engineering Line
              </span>
              <h3 className="text-xl font-bold font-heading">
                AusinX Support Desk
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contact our engineers directly for service agreements, maintenance scheduling, or emergency enquiries.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-700">
                {siteSettings.phones.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-colors"
                  >
                    <span className="flex items-center gap-2 text-xs">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{phone.display}</span>
                    </span>
                    <span className="text-xs text-amber-400">Call →</span>
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-700 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${siteSettings.publicEmail}`}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {siteSettings.publicEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Mon – Fri: 09:00 AM – 5:00 PM</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-sm hover:bg-[#E0A400] transition-all shadow-md active:scale-98"
                >
                  <span>Enquire for This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Other Pillars List */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Other Engineering Pillars
              </h4>
              <div className="space-y-1">
                {servicesData.map((s) => {
                  const isCurrent = s.slug === service.slug;
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className={`block p-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isCurrent
                          ? "bg-amber-50 text-[#1A2A3A] border border-amber-200"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#1A2A3A]"
                      }`}
                    >
                      {s.navTitle}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
