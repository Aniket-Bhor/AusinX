import React from "react";
import Hero from "@/components/home/Hero";
import InteractiveBento from "@/components/home/InteractiveBento";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LifecycleStrip from "@/components/home/LifecycleStrip";
import Reveal from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      <Reveal><Hero /></Reveal>
      <Reveal><InteractiveBento /></Reveal>
      <Reveal><WhyChooseUs /></Reveal>
      <Reveal><LifecycleStrip /></Reveal>
    </>
  );
}
