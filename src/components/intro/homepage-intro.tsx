"use client";

import { useCallback, useState } from "react";
import { SystemLoader } from "@/components/intro/SystemLoader";

export function HomepageIntro() {
  const [isMounted, setIsMounted] = useState(true);
  const unmountLoader = useCallback(() => setIsMounted(false), []);

  return isMounted ? <SystemLoader onComplete={unmountLoader} /> : null;
}
