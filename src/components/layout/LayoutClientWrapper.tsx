"use client";

import React, { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

  return (
    <>
      <Header
        services={serviceNav}
        siteSettings={siteSettings}
        logoUrl={headerLogo}
      />
      <main className="flex-1">{children}</main>
      <Footer
        services={serviceNav}
        siteSettings={siteSettings}
        logoUrl={headerLogo}
      />
    </>
  );
}

