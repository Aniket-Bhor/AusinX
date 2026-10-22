import React from "react";
import Hero from "@/components/home/Hero";
import IntroSection from "@/components/home/IntroSection";
import CorePillarsGrid from "@/components/home/CorePillarsGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LifecycleStrip from "@/components/home/LifecycleStrip";
import CtaBand from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <CorePillarsGrid />
      <WhyChooseUs />
      <LifecycleStrip />
      <CtaBand />
    </>
  );
}
