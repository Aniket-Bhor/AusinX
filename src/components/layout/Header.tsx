"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/ui/Logo";

interface ServiceNavItem {
  slug: string;
  navTitle: string;
}

export default function Header({
  services,
  logoUrl,
}: {
  services: ServiceNavItem[];
  siteSettings?: unknown;
  logoUrl?: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 text-slate-900 ${scrolled
          ? "border-slate-200/90 bg-white/85 shadow-[0_6px_25px_rgba(15,41,57,0.07)] backdrop-blur-md"
          : "border-slate-200/70 bg-white/95 shadow-none backdrop-blur-sm"
          }`}
      >
        <div className="mx-auto flex h-[68px] md:h-[100px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="AusinX home" className="flex h-full items-center">
            <Logo src={logoUrl} className="h-10 md:h-14 w-[190px] sm:w-[240px] lg:w-[290px]" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            <Link
              href="/"
              className={`group relative py-2 px-4 text-sm font-medium transition-colors ${isLinkActive("/") ? "text-brand-accent-hover font-semibold" : "text-slate-700 hover:text-brand-accent"
                }`}
            >
              <span>Home</span>
              <span
                className={`absolute bottom-0 left-4 right-4 h-[2px] bg-brand-accent rounded-full transition-transform duration-300 origin-left ${isLinkActive("/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
              />
            </Link>

            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                onFocus={() => setServicesOpen(true)}
                aria-expanded={servicesOpen}
                className={`group relative py-2 px-4 text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${isLinkActive("/services") ? "text-brand-accent-hover font-semibold" : "text-slate-700 hover:text-brand-accent"
                  }`}
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                <span
                  className={`absolute bottom-0 left-4 right-4 h-[2px] bg-brand-accent rounded-full transition-transform duration-300 origin-left ${isLinkActive("/services") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full w-72 pt-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(15,41,57,.14)]">
                    {services.map(({ slug, navTitle }) => (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-brand-accent-light hover:text-brand-accent"
                      >
                        {navTitle}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="mt-1 block border-t border-slate-100 px-4 py-3 text-sm font-semibold text-brand-accent"
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`group relative py-2 px-4 text-sm font-medium transition-colors ${isLinkActive("/about") ? "text-brand-accent-hover font-semibold" : "text-slate-700 hover:text-brand-accent"
                }`}
            >
              <span>About Us</span>
              <span
                className={`absolute bottom-0 left-4 right-4 h-[2px] bg-brand-accent rounded-full transition-transform duration-300 origin-left ${isLinkActive("/about") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
              />
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="btn-shine group inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-5 py-3 lg:px-6 lg:py-3.5 text-sm lg:text-base font-semibold text-white transition-all duration-300 hover:bg-brand-accent-hover glow-sm hover:glow-sm shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              <span>Talk to our team</span>
              <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
            </Link>
          </div>

          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {menuOpen && <div className="fixed inset-x-0 bottom-0 top-[68px] md:top-[100px] z-40 overflow-y-auto border-t border-slate-200 bg-white px-5 py-6 shadow-xl md:hidden">
        <nav className="mx-auto flex max-w-lg flex-col gap-1" aria-label="Mobile navigation">
          <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50">Home</Link>
          <Link href="/services" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50">Services overview</Link>
          {services.map(({ slug, navTitle }) => <Link key={slug} href={`/services/${slug}`} onClick={() => setMenuOpen(false)} className="rounded-xl py-2 pl-8 text-sm text-slate-600 hover:bg-brand-accent-light hover:text-brand-accent">{navTitle}</Link>)}
          <Link href="/about" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50">About Us</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="mt-4 rounded-full bg-brand-accent px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-accent-hover transition-colors">Talk to our team</Link>
        </nav>
      </div>}
    </>
  );
}
