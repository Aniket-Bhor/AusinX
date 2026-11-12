import React from "react";
import { getServices } from "@/lib/content";
import CorePillarsGridClient from "./CorePillarsGridClient";

export default async function CorePillarsGrid() {
  const servicesData = await getServices();
  return <CorePillarsGridClient servicesData={servicesData} />;
}
