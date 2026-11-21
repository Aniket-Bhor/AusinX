"use client";

import React, { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import type { SiteSettings } from "@/lib/content";

interface LayoutClientWrapperProps {
  children: ReactNode;
  serviceNav: { slug: string; navTitle: string }[];
  siteSettings: SiteSettings;
  headerLogo: string;
}

export default function LayoutClientWrapper({
  children,
  serviceNav,
  siteSettings,
  headerLogo,
}: LayoutClientWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-1 min-h-screen">{children}</main>;
  }

  const primaryPhone = siteSettings.phones?.[0]?.raw || "0421081256";
  const primaryDisplay = siteSettings.phones?.[0]?.display || "0421 081 256";

  return (
    <>
      <ScrollProgressBar />
      <Header
        services={serviceNav}
        siteSettings={siteSettings}
        logoUrl={headerLogo}
      />
      <main className="flex-1 animate-page-enter">{children}</main>
      <Footer
        services={serviceNav}
        siteSettings={siteSettings}
        logoUrl={headerLogo}
      />

      {/* Mobile floating "Call us" button */}
      <aside aria-label="Quick contact" className="fixed bottom-5 right-5 z-40 md:hidden">
        <a
          href={`tel:${primaryPhone}`}
          aria-label={`Call AusinX at ${primaryDisplay}`}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-brand-accent text-white font-bold text-sm shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:bg-brand-accent-hover active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 fill-current" />
          <span>Call us</span>
        </a>
      </aside>
    </>
  );
}

