import React from "react";
import { getSiteImages, getSiteSettings } from "@/lib/content";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const [siteSettings, siteImages] = await Promise.all([
    getSiteSettings(),
    getSiteImages(),
  ]);
  return <HeroClient siteSettings={siteSettings} heroImage={siteImages.heroImage} />;
}
