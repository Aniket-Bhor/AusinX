"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Wrench,
  Cpu,
  Package,
  Gauge,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const serviceLinks = [
  {
    name: "Service & Maintenance",
    href: "/services/service-maintenance",
    description: "Preventive maintenance, repairs & remote emergency triage",
    icon: Wrench,
  },
  {
    name: "Installation & Commissioning",
    href: "/services/installation-commissioning",
    description: "Specialised in radiotherapy and diagnostic CT/MRI systems",
    icon: Cpu,
  },
  {
    name: "Parts & Logistics",
    href: "/services/parts-logistics",
    description: "Reliable component sourcing and coordinated hospital logistics",
    icon: Package,
  },
  {
    name: "Calibration",
    href: "/services/calibration",
    description: "Documented precision calibration for measurement safety",
    icon: Gauge,
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Clinical Strip */}
      <div className="bg-[#121E2A] text-slate-300 text-xs py-2 px-4 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Proudly Australian Owned & Operated
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">
              Healthcare & Industrial Engineering Solutions
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-slate-400">
              Melbourne, Victoria
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href="tel:0421081256"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>0421 081 256</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#1A2A3A] text-white shadow-md border-b border-slate-700/60 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Identity */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="AusinX Solutions Homepage"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-sm ring-2 ring-amber-400/30 group-hover:ring-amber-400 transition-all flex items-center justify-center shrink-0">
              <Image
                src="/images/logo.png"
                alt="AusinX Solutions Logo"
                width={48}
                height={48}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-full max-w-full"
                priority
              />

            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors leading-tight font-heading">
                AusinX Solutions
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Biomedical & Industrial
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main Navigation"
          >
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/") && pathname === "/"
                  ? "text-amber-400 bg-white/5"
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                onFocus={() => setServicesDropdownOpen(true)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                  isActive("/services")
                    ? "text-amber-400 bg-white/5"
                    : "text-slate-200 hover:text-white hover:bg-white/5"
                }`}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 w-80 lg:w-96 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200/80 p-2.5 mt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  role="menu"
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Core Pillars
                    </p>
                  </div>
                  <div className="space-y-1">
                    {serviceLinks.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group/item focus:outline-none focus:bg-slate-50"
                          role="menuitem"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-md bg-[#1A2A3A]/5 text-[#1A2A3A] group-hover/item:bg-[#F8B800] group-hover/item:text-[#1A2A3A] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 group-hover/item:text-[#1A2A3A]">
                              {service.name}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 px-2 pb-1">
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-between w-full text-xs font-semibold text-[#1A2A3A] hover:text-[#E0A400] transition-colors p-1"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <span>View All Services Overview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/about")
                  ? "text-amber-400 bg-white/5"
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/contact")
                  ? "text-amber-400 bg-white/5"
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold rounded-lg bg-[#F8B800] text-[#1A2A3A] hover:bg-[#E0A400] transition-all shadow-sm active:scale-95 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#1A2A3A]"
            >
              Request Support
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/contact"
              className="px-3 py-1.5 text-xs font-bold rounded-md bg-[#F8B800] text-[#1A2A3A]"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed top-20 inset-x-0 bottom-0 bg-[#1A2A3A] border-t border-slate-700 overflow-y-auto p-5 text-white flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-700/60">
                <Link
                  href="/"
                  className="block py-2 text-lg font-bold text-slate-100 hover:text-amber-400"
                >
                  Home
                </Link>
              </div>

              <div className="pb-3 border-b border-slate-700/60">
                <div className="flex items-center justify-between py-2">
                  <Link
                    href="/services"
                    className="text-lg font-bold text-slate-100 hover:text-amber-400"
                  >
                    Services Overview
                  </Link>
                </div>
                <div className="mt-2 pl-3 border-l-2 border-amber-400/40 space-y-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block py-1.5 text-sm font-medium text-slate-300 hover:text-amber-400"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pb-3 border-b border-slate-700/60">
                <Link
                  href="/about"
                  className="block py-2 text-lg font-bold text-slate-100 hover:text-amber-400"
                >
                  About Us
                </Link>
              </div>

              <div className="pb-3 border-b border-slate-700/60">
                <Link
                  href="/contact"
                  className="block py-2 text-lg font-bold text-slate-100 hover:text-amber-400"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700/80 space-y-3">
              <a
                href="tel:0421081256"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-slate-600 text-slate-200 font-semibold text-sm hover:bg-white/5"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call 0421 081 256</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center w-full py-3 rounded-lg bg-[#F8B800] text-[#1A2A3A] font-bold text-sm shadow-md active:scale-98"
              >
                Request Service Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
