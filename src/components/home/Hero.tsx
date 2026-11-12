import React from "react";
import { getHeroMetrics, getSiteImages, getSiteSettings } from "@/lib/content";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const [siteSettings, siteImages, heroMetrics] = await Promise.all([
    getSiteSettings(),
    getSiteImages(),
    getHeroMetrics(),
  ]);
  return (
    <HeroClient
      siteSettings={siteSettings}
      heroImage={siteImages.heroImage}
      heroMetrics={heroMetrics}
    />
  );
}
