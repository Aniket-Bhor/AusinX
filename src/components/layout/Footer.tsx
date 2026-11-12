import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/content";
import CurrentYear from "@/components/layout/CurrentYear";

interface ServiceNavItem {
  slug: string;
  navTitle: string;
}

export default function Footer({
  services,
  siteSettings,
}: {
  services: ServiceNavItem[];
  siteSettings: SiteSettings;
}) {
  return (
    <footer className="border-t border-slate-200 bg-[#F7FAFA] text-slate-600">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-[88px] w-[250px]">
              <Image src="/images/client/ausinx-logo-brand-clean.png" alt="AusinX Biomedical and Industrial Engineering Solutions" fill sizes="250px" className="object-contain" />
            </span>
          </Link>
          <p className="max-w-md text-sm leading-7 text-slate-600">AusinX is a proudly Australian-owned and operated company supporting medical and industrial equipment across its full lifecycle.</p>
          <span className="inline-flex rounded-full border border-[#BCE0DF] bg-white px-3 py-1.5 text-xs font-medium text-[#0B5963]">Australian owned and operated</span>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-[#0B2942]">Services</h2>
          <ul className="space-y-3 text-sm">
            {services.map(({ slug, navTitle }) => <li key={slug}><Link href={`/services/${slug}`} className="transition-colors hover:text-[#087F86]">{navTitle}</Link></li>)}
            <li><Link href="/services" className="font-medium text-[#087F86] hover:underline">All services</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-[#0B2942]">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#07999A]" /><span>{siteSettings.address.formatted}</span></li>
            <li><a href={`mailto:${siteSettings.publicEmail}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-[#087F86]"><Mail className="h-4 w-4 text-[#07999A]" />{siteSettings.publicEmail}</a></li>
            {siteSettings.phones.slice(0, 2).map((phone) => <li key={phone.raw}><a href={`tel:${phone.raw}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-[#087F86]"><Phone className="h-4 w-4 text-[#07999A]" />{phone.display}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© <CurrentYear /> {siteSettings.companyName}</span>
          <div className="flex gap-5"><Link href="/about" className="hover:text-[#087F86]">About</Link><Link href="/contact" className="hover:text-[#087F86]">Contact</Link><Link href="/privacy" className="hover:text-[#087F86]">Privacy policy</Link></div>
        </div>
      </div>
    </footer>
  );
}
