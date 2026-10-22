import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "AusinX Solutions | Biomedical & Industrial Equipment Solutions",
    template: "%s | AusinX Solutions",
  },
  description:
    "AusinX is a proudly Australian-owned and operated engineering company providing full lifecycle service, installation, parts supply, and precision calibration for radiotherapy, diagnostic imaging (CT/MRI), and critical biomedical equipment.",
  metadataBase: new URL("https://www.ausinx.com.au"),
  alternates: {
    canonical: "https://www.ausinx.com.au",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "AusinX Solutions | Biomedical & Industrial Equipment Solutions",
    description:
      "Precision engineering solutions for healthcare equipment: service, installation, parts supply, and calibration across Melbourne and Australia.",
    url: "https://www.ausinx.com.au",
    siteName: "AusinX Solutions",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/placeholders/hero-equipment.jpg",
        width: 1200,
        height: 630,
        alt: "AusinX Biomedical Engineering Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AusinX Solutions | Biomedical & Industrial Equipment Solutions",
    description:
      "Precision healthcare and industrial equipment lifecycle solutions: Service · Installation · Parts · Calibration.",
    images: ["/images/placeholders/hero-equipment.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#0F172A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
