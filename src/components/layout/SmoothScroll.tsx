"use client";

import { useLenis } from "@/hooks/use-lenis";
import { ReactNode } from "react";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}
