import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
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
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "AusinX Solutions | Biomedical & Industrial Equipment Solutions",
    description:
      "Precision engineering solutions for healthcare equipment: service, installation, parts supply, and calibration across Melbourne and Australia.",
    url: "https://www.ausinx.com.au",
    siteName: "AusinX Solutions",
    locale: "en_AU",
    type: "website",
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
      className={`${plusJakarta.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0F172A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
