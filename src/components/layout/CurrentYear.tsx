"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function CurrentYear() {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  return <span>{year}</span>;
}
