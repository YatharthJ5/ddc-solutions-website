"use client";
import { motion, useTransform } from "motion/react";
import { Wire, Massing, Render } from "./building";
import { useStory } from "./shared";
// Scroll-controlled BIM to visualisation sequence: wireframe -> massing -> visualisation, revealed by two masked wipes.
export function BimHero({ children }: { children: React.ReactNode }) {
  const { ref, p } = useStory(0.62);
  const mClip = useTransform(p, [0.08, 0.5], ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]);
  const rClip = useTransform(p, [0.3, 0.88], ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]);
  const mLine = useTransform(p, [0.08, 0.5], ["100%", "0%"]);
  const rLine = useTransform(p, [0.3, 0.88], ["100%", "0%"]);
  const mOp = useTransform(p, [0.08, 0.12, 0.46, 0.5], [0, 1, 1, 0]);
  const rOp = useTransform(p, [0.3, 0.34, 0.84, 0.88], [0, 1, 1, 0]);
  const scale = useTransform(p, [0, 1], [1, 1.07]);
  const hint = useTransform(p, [0, 0.05], [1, 0]);
  return (
    <section ref={ref} aria-label="Introduction" className="relative h-[250svh] motion-reduce:h-auto">
      <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col overflow-hidden motion-reduce:static motion-reduce:min-h-[calc(100svh-4.5rem)] md:block">
        <div role="img" aria-label="Illustrative sequence: a BIM wireframe of a building becoming a visualisation" className="relative min-h-[38%] flex-1 md:absolute md:inset-y-0 md:left-[33%] md:right-0 md:min-h-0">
          <motion.div style={{ scale }} className="absolute inset-0 origin-bottom will-change-transform">
            <div className="absolute inset-0"><Wire /></div>
            <motion.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: mClip }}><Massing /></motion.div>
            <motion.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: rClip }}><Render /></motion.div>
            <motion.div aria-hidden className="absolute inset-y-0 w-px bg-ink/60" style={{ left: mLine, opacity: mOp }} />
            <motion.div aria-hidden className="absolute inset-y-0 w-px bg-paper2" style={{ left: rLine, opacity: rOp }} />
          </motion.div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block" style={{ backgroundImage: "linear-gradient(#17171710 1px,transparent 1px),linear-gradient(90deg,#17171710 1px,transparent 1px)", backgroundSize: "40px 40px", maskImage: "linear-gradient(90deg,#000,transparent 45%)", WebkitMaskImage: "linear-gradient(90deg,#000,transparent 45%)" }} />
        <div className="wrap relative z-10 order-first pb-3 pt-7 md:absolute md:inset-0 md:flex md:items-center md:py-0"><div className="max-w-xl">{children}</div></div>
        <motion.div aria-hidden style={{ opacity: hint }} className="absolute bottom-6 right-6 hidden items-center gap-3 text-xs text-ink md:flex">Scroll<span className="nudge h-10 w-px bg-ink" style={{ animation: "nudge 2s ease-in-out infinite" }} /></motion.div>
        <p className="absolute bottom-3 left-5 z-10 hidden text-[11px] text-stone md:block md:left-10">Illustrative building. Not a DDC project.</p>
      </div>
    </section>
  );
}
