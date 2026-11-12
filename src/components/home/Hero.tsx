import React from "react";
import { getSiteSettings } from "@/lib/content";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const siteSettings = await getSiteSettings();
  return <HeroClient siteSettings={siteSettings} />;
}
