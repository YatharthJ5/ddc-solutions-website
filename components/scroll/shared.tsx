"use client";
import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
// Scroll progress (0..1) across a tall section. With reduced motion the value is frozen at `final`, so the section shows a static composed state.
export function useStory(final: number) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, v => (reduce ? final : v));
  return { ref, p };
}
