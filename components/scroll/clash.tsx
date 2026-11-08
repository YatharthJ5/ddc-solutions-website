"use client";
import { motion, useTransform } from "motion/react";
import { useStory } from "./shared";
const INK = "#171717";
const duct = (d: number) => `M0 100H330L400 ${100 + d}H470L540 100H900V160H540L470 ${160 + d}H400L330 160H0Z`;
const CAP = ["Services drawn by different disciplines share the ceiling void and overlap.", "A coordination review finds the conflict: the duct passes straight through a beam.", "The duct is rerouted below the beam and the model is checked again.", "Resolved: no remaining conflict in this section."];
export function ClashDetection() {
  const { ref, p } = useStory(0.95);
  const d = useTransform(p, [0.5, 0.78], [0, 100]), dp = useTransform(d, duct);
  const ring = useTransform(p, [0.22, 0.32, 0.5, 0.58], [0, 1, 1, 0]), rs = useTransform(p, [0.22, 0.34], [1.5, 1]);
  const ov = useTransform(p, [0.22, 0.3, 0.5, 0.58], [0, 0.9, 0.9, 0]);
  const dim = useTransform(p, [0.22, 0.32, 0.5, 0.6], [1, 0.3, 0.3, 1]);
  const open = useTransform(p, [0.22, 0.3, 0.55, 0.62], [0, 1, 1, 0]), done = useTransform(p, [0.8, 0.9], [0, 1]);
  const caps = [useTransform(p, [0.1, 0.2], [1, 0]), useTransform(p, [0.2, 0.28, 0.46, 0.5], [0, 1, 1, 0]), useTransform(p, [0.5, 0.56, 0.74, 0.8], [0, 1, 1, 0]), useTransform(p, [0.8, 0.88], [0, 1])];
  return (
    <section ref={ref} aria-labelledby="clash-h" className="relative h-[280svh] bg-paper2 motion-reduce:h-auto">
      <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col overflow-hidden motion-reduce:static motion-reduce:h-auto md:grid md:grid-cols-12 md:items-center">
        <div className="wrap md:col-span-4 md:pr-0">
          <p className="eyebrow">BIM coordination</p>
          <h2 id="clash-h" className="display text-[clamp(1.8rem,3.4vw,3.2rem)]">Find the clash before it reaches site.</h2>
          <div className="relative mt-4 h-20 text-mute md:mt-6 md:h-28 md:text-lg">{CAP.map((c, i) => <motion.p key={i} style={{ opacity: caps[i] }} className="absolute inset-0">{c}</motion.p>)}</div>
          <p className="mt-2 border-l-2 border-silver pl-3 text-xs text-stone md:text-sm">Illustrative demonstration of the coordination process. It does not show a specific DDC project.</p>
        </div>
        <div role="img" aria-label="Illustrative ceiling section: a duct clashes with a beam, then is rerouted beneath it" className="min-h-0 flex-1 overflow-hidden md:col-span-8 md:h-[78%] md:overflow-visible">
          <svg viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet" className="h-full w-[205%] max-w-none -ml-[66%] md:ml-0 md:w-full" aria-hidden>
            <defs><pattern id="hat" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8" stroke={INK} strokeOpacity=".5" /></pattern></defs>
            <rect x="0" y="40" width="900" height="24" fill="#E5E3DE" stroke={INK} /><text x="12" y="30" fontSize="13" fill={INK} fillOpacity=".6">Slab</text>
            <rect x="400" y="64" width="70" height="126" fill="url(#hat)" stroke={INK} /><text x="394" y="84" textAnchor="end" fontSize="13" fill={INK} fillOpacity=".7">Structural beam</text>
            <motion.g style={{ opacity: dim }}><rect x="0" y="272" width="900" height="12" fill="#C5C5C0" stroke={INK} /><text x="12" y="266" fontSize="13" fill={INK} fillOpacity=".6">Pipework</text>
              <g stroke={INK} fill="none"><path d="M0 302H900M0 322H900" />{Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${15 + i * 30} 302V322`} strokeOpacity=".55" />)}</g><text x="12" y="346" fontSize="13" fill={INK} fillOpacity=".6">Cable tray</text>
              <path d="M0 372H900" stroke={INK} strokeDasharray="6 6" strokeOpacity=".5" /><text x="12" y="392" fontSize="13" fill={INK} fillOpacity=".5">Ceiling</text></motion.g>
            <motion.path d={dp} fill="#C5C5C0" fillOpacity=".92" stroke={INK} strokeWidth="1.5" /><text x="14" y="95" fontSize="13" fill={INK} fillOpacity=".7">Supply duct</text>
            <motion.rect x="400" y="100" width="70" height="60" fill={INK} style={{ opacity: ov }} />
            <motion.g style={{ opacity: ring, scale: rs, transformOrigin: "435px 130px", transformBox: "fill-box" }}><circle cx="435" cy="130" r="56" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="7 6" /></motion.g>
            <motion.g style={{ opacity: open }}><line x1="470" y1="100" x2="540" y2="82" stroke={INK} /><rect x="540" y="68" width="190" height="28" fill={INK} /><text x="552" y="87" fontSize="14" fill="#F7F6F2">Clash 01: duct / beam</text></motion.g>
            <motion.g style={{ opacity: done }}><rect x="640" y="214" width="170" height="30" fill="none" stroke={INK} /><text x="652" y="234" fontSize="14" fill={INK}>Resolved, rechecked</text></motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
}
