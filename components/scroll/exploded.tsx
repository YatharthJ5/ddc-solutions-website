"use client";
import { useState } from "react";
import { motion, MotionValue, useTransform } from "motion/react";
import { useStory } from "./shared";
const C = 0.866 * 44, S = 0.5 * 44, INK = "#171717";
const P = (x: number, y: number) => `${((x - y) * C).toFixed(1)},${((x + y) * S).toFixed(1)}`;
const pl = (a: [number, number][]) => a.map(([x, y]) => P(x, y)).join(" ");
const ln = (a: [number, number][]) => "M" + a.map(([x, y]) => P(x, y)).join("L");
const NAMES = ["Structure", "Mechanical", "Electrical", "Architecture"], TXT = ["Columns and beams carry the loads.", "Ducts and branches serve each zone.", "Cable trays, lighting and the distribution panel.", "Envelope, glazing and internal partitions."];

function Layer({ k, sp, act, children }: { k: number; sp: MotionValue<number>; act: number | null; children: React.ReactNode }) {
  const y = useTransform(sp, v => -k * v), lab = useTransform(sp, [50, 100], [0, 1]);
  return (
    <motion.g style={{ y }} animate={{ opacity: act === null || act === k ? 1 : 0.14 }} transition={{ duration: 0.35 }}>
      <polygon points={pl([[0, 0], [6, 0], [6, 4], [0, 4]])} fill="#F7F6F2" fillOpacity=".86" stroke={INK} strokeOpacity=".45" />
      {children}
      <motion.g style={{ opacity: lab }}><path d={`M${P(6, 0)}h34`} stroke={INK} strokeOpacity=".5" /><text x={(6 * C) + 42} y={6 * S + 4} fontSize="15" fill={INK} fontFamily="ui-sans-serif,system-ui">{NAMES[k]}</text></motion.g>
    </motion.g>
  );
}
export function ExplodedModel() {
  const { ref, p } = useStory(0.5);
  const [act, setAct] = useState<number | null>(null);
  const sp = useTransform(p, [0, 0.28, 0.72, 1], [24, 108, 108, 24]);
  const c1 = useTransform(p, [0.12, 0.2], [1, 0]), c2 = useTransform(p, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]), c3 = useTransform(p, [0.8, 0.9], [0, 1]);
  const cols = [0.6, 3, 5.4], rows = [0.6, 2, 3.4];
  return (
    <section ref={ref} aria-labelledby="exp-h" className="relative h-[260svh] border-t border-line motion-reduce:h-auto">
      <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col overflow-hidden motion-reduce:static motion-reduce:h-auto md:grid md:grid-cols-12 md:items-center">
        <div className="wrap order-2 pb-5 md:order-1 md:col-span-5 md:block md:pb-0 md:pr-0">
          <p className="eyebrow">The coordinated model</p>
          <h2 id="exp-h" className="display text-[clamp(1.8rem,3.6vw,3.4rem)]">One model, built from four disciplines.</h2>
          <div className="relative mt-4 h-14 text-mute md:mt-6 md:h-16 md:text-lg">
            <motion.p style={{ opacity: c1 }} className="absolute inset-0">Structure, mechanical, electrical and architecture sit together in one coordinated model.</motion.p>
            <motion.p style={{ opacity: c2 }} className="absolute inset-0">Each discipline is modelled and checked on its own layer, so conflicts can be found early.</motion.p>
            <motion.p style={{ opacity: c3 }} className="absolute inset-0">Coordinated again into a single model that every team works from.</motion.p>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 border-t border-line md:mt-5 md:grid-cols-1">{NAMES.map((n, k) => <li key={n} className="border-b border-line"><button onClick={() => setAct(act === k ? null : k)} onMouseEnter={() => setAct(k)} onMouseLeave={() => setAct(null)} onFocus={() => setAct(k)} onBlur={() => setAct(null)} aria-pressed={act === k} className="flex w-full items-baseline justify-between gap-3 py-2 text-left md:py-3"><span className="display text-lg md:text-2xl">{n}</span><span className="hidden text-sm text-stone lg:block">{TXT[k]}</span></button></li>)}</ul>
          <p className="mt-3 text-[11px] text-stone">Illustrative model. Not a DDC project.</p>
        </div>
        <div role="img" aria-label="Illustrative exploded isometric model separating into structure, mechanical, electrical and architectural layers" className="order-1 min-h-0 flex-1 overflow-hidden md:order-2 md:col-span-7 md:h-full md:overflow-visible">
          <svg viewBox="0 0 900 640" preserveAspectRatio="xMidYMid meet" className="h-full w-[175%] max-w-none -ml-[44%] md:ml-0 md:w-full" aria-hidden>
            <g transform="translate(400 360)">
              <Layer k={0} sp={sp} act={act}><g stroke={INK} fill="none" strokeWidth="2">{rows.map(y => <path key={y} d={ln([[cols[0], y], [cols[2], y]])} />)}{cols.map(x => <path key={x} d={ln([[x, rows[0]], [x, rows[2]]])} />)}</g>{cols.flatMap(x => rows.map(y => <g key={x + "" + y}><circle cx={P(x, y).split(",")[0]} cy={P(x, y).split(",")[1]} r="4.5" fill={INK} /><path d={`M${P(x, y)}v-18`} stroke={INK} strokeWidth="2.5" /></g>))}</Layer>
              <Layer k={1} sp={sp} act={act}><g fill="#C5C5C0" stroke={INK}><polygon points={pl([[0.2, 0.8], [5.8, 0.8], [5.8, 1.3], [0.2, 1.3]])} /><polygon points={pl([[1.2, 1.3], [1.6, 1.3], [1.6, 3.6], [1.2, 3.6]])} /><polygon points={pl([[3.6, 1.3], [4, 1.3], [4, 3.6], [3.6, 3.6]])} /></g></Layer>
              <Layer k={2} sp={sp} act={act}><g stroke={INK} fill="none">{[2.6, 2.78].map(y => <path key={y} d={ln([[0.3, y], [5.7, y]])} strokeWidth="1.5" />)}{Array.from({ length: 11 }, (_, i) => <path key={i} d={ln([[0.4 + i * 0.5, 2.6], [0.4 + i * 0.5, 2.78]])} strokeOpacity=".6" />)}{[1, 2.5, 4, 5.4].map(x => <circle key={x} cx={P(x, 3.5).split(",")[0]} cy={P(x, 3.5).split(",")[1]} r="5" fill={INK} stroke="none" />)}<polygon points={pl([[5.2, 3.3], [5.6, 3.3], [5.6, 3.7], [5.2, 3.7]])} fill={INK} /><path d={ln([[5.4, 3.3], [5.4, 2.78]])} strokeDasharray="4 4" /></g></Layer>
              <Layer k={3} sp={sp} act={act}><g stroke={INK} fill="none"><polygon points={pl([[0, 0], [6, 0], [6, 4], [0, 4]])} fill={INK} fillOpacity=".07" strokeWidth="2.5" /><path d={ln([[2, 0], [2, 1.6]])} strokeWidth="2" /><path d={ln([[2, 2.4], [2, 4]])} strokeWidth="2" /><path d={ln([[4, 0], [4, 4]])} strokeWidth="2" /><path d={ln([[0.3, 4], [5.7, 4]])} stroke="#C5C5C0" strokeWidth="5" /></g></Layer>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
