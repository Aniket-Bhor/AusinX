import React from "react";
import { getServices, getSiteSettings } from "@/lib/content";

export default async function JsonLd() {
  const [siteSettings, servicesData] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": "https://www.ausinx.com.au/#organization",
    name: siteSettings.companyName,
    alternateName: "AusinX",
    legalName: "AusinX Solutions Pty Ltd",
    url: "https://www.ausinx.com.au",
    logo: "https://www.ausinx.com.au/images/client/ausinx-logo.jpeg",
    image: "https://www.ausinx.com.au/images/client/imaging-suite.jpeg",

    description:
      "Proudly Australian-owned and operated engineering company providing full lifecycle services for medical equipment, healthcare products and industrial electronics: service, maintenance, installation, commissioning, parts supply, and calibration.",
    telephone: siteSettings.phones[0]?.display || "0421 081 256",
    email: siteSettings.publicEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address.street,
      addressLocality: siteSettings.address.city,
      addressRegion: siteSettings.address.state,
      postalCode: siteSettings.address.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -37.8437,
      longitude: 144.9785,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering Solutions",
      itemListElement: servicesData.map((s, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.shortSummary,
          url: `https://www.ausinx.com.au/services/${s.slug}`,
        },
        position: idx + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
