import React from "react";
import Hero from "@/components/home/Hero";
import InteractiveBento from "@/components/home/InteractiveBento";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LifecycleStrip from "@/components/home/LifecycleStrip";
import Reveal from "@/components/ui/Reveal";
import { getSiteImages } from "@/lib/content";

export default async function HomePage() {
  const siteImages = await getSiteImages();
  return (
    <>
      <Reveal><Hero /></Reveal>
      <Reveal><InteractiveBento siteImages={siteImages} /></Reveal>
      <Reveal><WhyChooseUs /></Reveal>
      <Reveal><LifecycleStrip /></Reveal>
    </>
  );
}
