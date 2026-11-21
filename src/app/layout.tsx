import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import LayoutClientWrapper from "@/components/layout/LayoutClientWrapper";
import { getServices, getSiteImages, getSiteSettings, getTheme, getFont } from "@/lib/content";
import { getPaletteCss } from "@/lib/themes";
import { allFontVariables, getFontCss } from "@/lib/fonts";
import { getTabIconUrls } from "@/lib/site-icon";

export async function generateMetadata(): Promise<Metadata> {
  const siteImages = await getSiteImages();
  const iconUrls = getTabIconUrls(siteImages);

  return {
    title: {
      default: "AusinX Solutions | Biomedical & Industrial Equipment Solutions",
      template: "%s | AusinX Solutions",
    },
    description:
      "AusinX provides full lifecycle service, installation, parts supply, and precision calibration for medical equipment, diagnostic imaging (CT/MRI), and industrial electronics across Australia.",
    metadataBase: new URL("https://www.ausinx.com.au"),
    alternates: {
      canonical: "https://www.ausinx.com.au",
    },
    icons: {
      icon: iconUrls.icon,
      apple: iconUrls.apple,
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
          url: "/images/client/imaging-suite.webp",
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
      images: ["/images/client/imaging-suite.webp"],
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
}

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [theme, font] = await Promise.all([getTheme(), getFont()]);
    const themeCss = getPaletteCss(theme);
    const fontCss = getFontCss(font);

    return (
      <html
        lang="en"
        data-scroll-behavior="smooth"
        className={`${allFontVariables} h-full antialiased`}
      >
        <head>
          <JsonLd />
          {themeCss && <style dangerouslySetInnerHTML={{ __html: themeCss }} />}
          {fontCss && <style dangerouslySetInnerHTML={{ __html: fontCss }} />}
        </head>
        <body className="min-h-full flex flex-col bg-surface text-brand-primary">
          <SiteChrome>{children}</SiteChrome>
        </body>
      </html>
    );
  }

  async function SiteChrome({ children }: { children: React.ReactNode }) {
    const [services, siteSettings, siteImages] = await Promise.all([
      getServices(),
      getSiteSettings(),
      getSiteImages(),
    ]);
    const serviceNav = services.map(({ slug, navTitle }) => ({ slug, navTitle }));

    return (
      <LayoutClientWrapper
        serviceNav={serviceNav}
        siteSettings={siteSettings}
        headerLogo={siteImages.headerLogo}
      >
        {children}
      </LayoutClientWrapper>
    );
  }
