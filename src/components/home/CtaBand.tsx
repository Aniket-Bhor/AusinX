import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/content";

export default async function CtaBand() {
  const siteSettings = await getSiteSettings();
  return (
    <section className="bg-[#F4F8F8] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-[#DDEAE9] bg-white shadow-[0_16px_55px_rgba(15,41,57,.07)] lg:grid-cols-[1.1fr_.9fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <span className="mb-4 inline-flex w-fit rounded-full bg-[#EAF5F4] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#087F86]">Get in touch</span>
            <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#0B2942] sm:text-4xl">Let’s talk about your equipment needs.</h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">If you have a question about service, installation, parts or calibration, our team is happy to hear from you.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0B2942] px-5 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#087F86]">Contact the team <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <Link href="/contact#support" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-base font-semibold text-[#0B2942] transition-colors hover:border-[#B5DCD9] hover:bg-[#F5FAFA]"><Mail className="h-4 w-4 text-[#07999A]" /> Email support</Link>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 bg-[#F8FBFB] p-7 sm:p-10 lg:p-12">
            <p className="text-sm font-semibold text-[#0B2942]">AusinX Solutions Pty Ltd</p>
            <div className="flex gap-3 text-sm text-slate-600"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#07999A]" /><span>{siteSettings.address.formatted}</span></div>
            <div className="space-y-2">{siteSettings.phones.slice(0, 2).map((phone) => <a key={phone.raw} href={`tel:${phone.raw}`} className="flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-[#087F86]"><Phone className="h-4 w-4 text-[#07999A]" />{phone.display}</a>)}</div>
            <p className="text-xs text-slate-500">{siteSettings.businessHours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
