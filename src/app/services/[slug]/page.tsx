import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Cpu,
  Package,
  Gauge,
} from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/content";

const iconMap = {
  "service-maintenance": Wrench,
  "installation-commissioning": Cpu,
  "parts-logistics": Package,
  calibration: Gauge,
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({
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
      title: "Service Not Found | AusinX",
    };
  }

  return {
    title: `${service.metaTitle} | AusinX Solutions Pty Ltd`,
    description: service.metaDescription,
    openGraph: {
      title: `${service.metaTitle} | AusinX Solutions Pty Ltd`,
      description: service.metaDescription,
      url: `https://www.ausinx.com.au/services/${service.slug}`,
      images: [
        {
          url: service.image,
          alt: service.imageAlt,
        },
      ],
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
  const services = await getServices();

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.slug as keyof typeof iconMap] || Wrench;

  // Find adjacent services for navigation
  const currentIndex = services.findIndex((s) => s.slug === service.slug);
  const prevService =
    services.length > 1
      ? currentIndex > 0
        ? services[currentIndex - 1]
        : services[services.length - 1]
      : undefined;
  const nextService =
    services.length > 1
      ? currentIndex < services.length - 1
        ? services[currentIndex + 1]
        : services[0]
      : undefined;

  return (
    <div className="bg-bg-tint min-h-screen py-8 sm:py-14 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10">
        
        {/* Top Hero Section: Header Info + Featured Image side-by-side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Header Box */}
          <div className="lg:col-span-7 bg-surface rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-accent flex items-center justify-center shrink-0 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-accent-hover bg-brand-accent-light px-2.5 py-0.5 rounded border border-brand-accent/20">
                    Engineering Service
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight font-heading mt-1">
                    {service.title}
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed pt-1">
                {service.fullDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?service=${service.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-white font-bold text-sm hover:bg-brand-accent-hover transition-all shadow-md active:scale-98"
              >
                <span>Enquire for This Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Featured Visual Image */}
          <div className="lg:col-span-5 bg-surface rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm min-h-[280px] sm:min-h-[360px] relative">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </div>
        </div>

        {/* Sub-Services Capabilities (Verbatim Copy from Section 7.3) */}
        <div className="bg-surface rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-brand-primary font-heading">
              Service Capabilities &amp; Scope
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Client copy from brief Section 7.3 used verbatim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {service.subServices.map((sub) => (
              <div
                key={sub.title}
                className="p-5 sm:p-6 rounded-2xl bg-bg-tint border border-slate-200/80 space-y-2 hover:bg-slate-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-brand-primary flex items-center gap-2.5 font-heading">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
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
        <div className="bg-surface rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-brand-primary font-heading">
            Operational Commitments
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-700">
            {service.keyHighlights.map((hl) => (
              <li
                key={hl}
                className="flex items-center gap-2.5 p-4 rounded-xl bg-slate-50 border border-slate-100/90 hover:bg-white hover:shadow-sm transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shrink-0" />
                <span className="font-semibold text-brand-primary">{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next / Previous Pillar Navigation */}
        {prevService && nextService && (
          <div className="bg-surface rounded-2xl p-5 border border-slate-200/80 flex items-center justify-between text-xs font-bold uppercase tracking-wider shadow-sm">
            <Link
              href={`/services/${prevService.slug}`}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: {prevService.navTitle}</span>
            </Link>
            <Link
              href={`/services/${nextService.slug}`}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors"
            >
              <span>Next: {nextService.navTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
