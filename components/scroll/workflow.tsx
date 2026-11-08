"use client";
import { motion, MotionValue, useTransform } from "motion/react";
import { Wire, Render } from "./building";
import { useStory } from "./shared";
const INK = "#171717", N = 4;
const STEPS = [
  ["Concept", "Project START", "Execution planning, team alignment and risk mitigation from day one."],
  ["BIM Modelling", "Revit production", "Structural and architectural Revit modeling, with Revit 4 Project Delivery (R4PD) support."],
  ["Coordination", "Clash detection", "Conflict resolution and information management before problems reach site."],
  ["Project Delivery", "Information and training", "Information managed to ISO 19650 and the UK BIM Framework, with training that leaves your team self-sufficient."],
];
function win(i: number): [number[], number[]] { const a = i / N, b = (i + 1) / N; return [[i === 0 ? -2 : a - 0.04, i === 0 ? -1 : a + 0.02, i === N - 1 ? 2 : b - 0.02, i === N - 1 ? 3 : b + 0.04], [0, 1, 1, 0]]; }
function Stage({ i, p, className, children, lift = 0 }: { i: number; p: MotionValue<number>; className?: string; children: (lp: MotionValue<number>) => React.ReactNode; lift?: number }) {
  const [inp, out] = win(i), op = useTransform(p, inp, out), y = useTransform(p, inp, [lift, 0, 0, -lift]), lp = useTransform(p, v => Math.min(1, Math.max(0, (v - i / N) * N)));
  return <motion.div style={{ opacity: op, y }} className={`absolute inset-0 motion-reduce:relative motion-reduce:!opacity-100 motion-reduce:!transform-none ${className ?? ""}`}>{children(lp)}</motion.div>;
}
const Draw = ({ d, lp, a = 0, b = 1, w = 1.6, dash }: { d: string; lp: MotionValue<number>; a?: number; b?: number; w?: number; dash?: string }) => { const pl = useTransform(lp, [a, b], [0, 1]); return <motion.path d={d} pathLength={1} style={{ pathLength: pl }} fill="none" stroke={INK} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />; };
function Concept({ lp }: { lp: MotionValue<number> }) {
  return <svg viewBox="0 0 800 460" className="h-full w-full" aria-hidden><rect x="60" y="40" width="680" height="380" fill="none" stroke="#C5C5C0" strokeDasharray="8 8" /><Draw lp={lp} d="M120 330C200 322 300 338 420 326C520 318 600 330 690 322" a={0} b={0.4} /><Draw lp={lp} d="M190 322V210L250 180V322" a={0.2} b={0.6} /><Draw lp={lp} d="M300 328V120L400 96V326" a={0.3} b={0.75} w={2} /><Draw lp={lp} d="M450 326V220L540 200V324" a={0.45} b={0.85} /><Draw lp={lp} d="M300 120L400 96M190 210L250 180" a={0.6} b={0.9} /><Draw lp={lp} d="M100 90C150 60 200 70 230 100" a={0.1} b={0.5} dash="5 6" /><Draw lp={lp} d="M620 90L640 60L660 90M640 60V120" a={0.7} b={1} /></svg>;
}
function Model({ lp }: { lp: MotionValue<number> }) {
  const clip = useTransform(lp, [0.05, 0.9], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  return <motion.div style={{ clipPath: clip }} className="h-full w-full will-change-[clip-path]"><Wire vb="600 120 800 600" id="wf" /></motion.div>;
}
function Coord({ lp }: { lp: MotionValue<number> }) {
  const ring = useTransform(lp, [0.5, 0.7, 1], [0, 1, 1]);
  return <svg viewBox="0 0 800 460" className="h-full w-full" aria-hidden><Draw lp={lp} d="M40 150H760M40 210H760" a={0} b={0.4} w={2} /><Draw lp={lp} d="M40 330H760M40 360H760" a={0.1} b={0.5} /><Draw lp={lp} d="M360 40V420M440 40V420" a={0.2} b={0.6} w={2} dash="2 0" /><Draw lp={lp} d="M40 90C240 90 300 280 520 280S700 190 760 190" a={0.3} b={0.8} dash="6 6" /><motion.circle cx="400" cy="180" r="62" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="8 6" style={{ opacity: ring }} /><motion.text x="470" y="120" fontSize="16" fill={INK} style={{ opacity: ring }}>Coordination review</motion.text></svg>;
}
function Deliver({ lp }: { lp: MotionValue<number> }) {
  const clip = useTransform(lp, [0.05, 0.8], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]), tick = useTransform(lp, [0.8, 1], [0, 1]);
  return <div className="relative h-full w-full"><motion.div style={{ clipPath: clip }} className="h-full w-full will-change-[clip-path]"><Render vb="600 120 800 600" id="wr" /></motion.div><motion.p style={{ opacity: tick }} className="absolute bottom-3 right-3 border border-ink bg-paper px-3 py-1 text-sm">Information handed over</motion.p></div>;
}
export function Workflow() {
  const { ref, p } = useStory(0.99);
  const bar = useTransform(p, [0, 1], [0, 1]);
  const marks = [0, 1, 2, 3].map(i => { const [a, b] = win(i); return useTransform(p, a, [0.35, 1, 1, 0.35]); });
  const vis = [Concept, Model, Coord, Deliver];
  return (
    <section ref={ref} aria-labelledby="wf-h" className="relative h-[330svh] motion-reduce:h-auto">
      <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col overflow-hidden motion-reduce:static motion-reduce:h-auto md:grid md:grid-cols-12 md:items-center">
        <div className="wrap md:col-span-5 md:pr-0">
          <p className="eyebrow">Workflow</p><h2 id="wf-h" className="display text-[clamp(1.8rem,3.4vw,3.2rem)]">From concept to delivery.</h2>
          <div className="mt-5 flex gap-4"><div className="relative hidden w-px bg-line md:block"><motion.span style={{ scaleY: bar, transformOrigin: "top" }} className="absolute inset-0 bg-ink" /></div>
            <ol className="flex-1 md:space-y-3"><li className="grid grid-cols-4 gap-2 md:hidden">{STEPS.map((s, i) => <motion.span key={s[0]} style={{ opacity: marks[i] }} className="border-t border-ink pt-1 text-[11px] leading-tight">{`0${i + 1} ${s[0]}`}</motion.span>)}</li>
              {STEPS.map((s, i) => <li key={s[0]} className="hidden md:block"><motion.div style={{ opacity: marks[i] }}><span className="text-sm text-stone">{`0${i + 1}`}</span><span className="display ml-3 text-2xl">{s[0]}</span></motion.div></li>)}</ol></div>
          <div className="relative mt-4 min-h-[7.5rem] md:min-h-[9rem] motion-reduce:min-h-0">
            {STEPS.map((s, i) => <Stage key={s[0]} i={i} p={p} lift={14} className="motion-reduce:mb-6 md:pt-2">{() => <><p className="text-sm text-stone">{s[1]}</p><p className="mt-1 text-base text-ink md:text-lg">{s[2]}</p></>}</Stage>)}
          </div>
        </div>
        <div role="img" aria-label="Illustrative visual for each stage: concept sketch, BIM model, coordination review, delivered building" className="relative mx-5 mt-4 aspect-[4/3] flex-none motion-reduce:aspect-auto md:mx-0 md:mr-10 md:mt-0 md:aspect-auto motion-reduce:flex-none motion-reduce:grid motion-reduce:gap-4 motion-reduce:sm:grid-cols-2 md:col-span-7 md:h-[76%] md:flex-none">
          {vis.map((V, i) => <Stage key={i} i={i} p={p} className="motion-reduce:aspect-[16/9] border border-line bg-paper2 motion-reduce:overflow-hidden">{lp => <V lp={lp} />}</Stage>)}
        </div>
      </div>
    </section>
  );
}
