"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Photo } from "@/components/ui";
const INK = "#171717";
type Dg = { l: string[]; c?: [number, number, number][]; dots?: [number, number][] };
const out = () => { const a: [number, number][] = [], r = [[110, 70, 290, 70], [290, 70, 290, 240], [290, 240, 110, 240], [110, 240, 110, 70]]; r.forEach(([x1, y1, x2, y2]) => { for (let t = 0; t < 1; t += 0.07) a.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]); }); return a; };
const DG: Record<string, Dg> = {
  "training-service": { l: ["M30 230H370", "M30 200H110V160H190V120H270V80H370"], c: [[30, 230, 5], [110, 230, 5], [190, 230, 5], [270, 230, 5], [370, 230, 5]] },
  "bim-information-management": { l: ["M60 110L200 60L340 110L200 160Z", "M60 150L200 100L340 150L200 200Z", "M60 190L200 140L340 190L200 240Z", "M200 60V240"] },
  "ddc-subscription-service": { l: ["M200 150L90 70M200 150L310 70M200 150L70 170M200 150L330 170M200 150L200 255"], c: [[200, 150, 28], [90, 70, 14], [310, 70, 14], [70, 170, 14], [330, 170, 14], [200, 255, 14]] },
  "revit-4-project-delivery": { l: ["M120 90L200 50L280 90V180L200 220L120 180Z", "M120 90L200 130L280 90M200 130V220", "M290 200L330 180L370 200V250L330 270L290 250Z"] },
  "clash-detection-services": { l: ["M40 120H360V170H40Z", "M190 50V260H240V50Z"], c: [[215, 145, 48]] },
  "revit-modeling-services": { l: ["M100 50H300V260H100Z", "M100 90H300M100 130H300M100 170H300M100 210H300", "M150 50V260M200 50V260M250 50V260"], c: [[100, 28, 11], [200, 28, 11], [300, 28, 11]] },
  "scan-to-bim-services": { l: ["M110 70H290V240H110Z", "M110 130H290"], dots: out() },
};
function Diagram({ slug }: { slug: string }) {
  const d = DG[slug] ?? DG["revit-modeling-services"];
  return (<svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
    {d.l.map((p, i) => <motion.path key={i} d={p} fill="none" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }} />)}
    {d.c?.map(([x, y, r], i) => <motion.circle key={i} cx={x} cy={y} r={r} fill="none" stroke={INK} strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.08 }} />)}
    {d.dots?.map(([x, y], i) => <motion.circle key={i} cx={x} cy={y} r="2" fill={INK} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.8, scale: 1 }} transition={{ delay: i * 0.012 }} />)}
  </svg>);
}
type Item = { slug: string; name: string; kicker: string; blurb: string; image?: string };
function Panel({ it }: { it: Item }) {
  return (<div className="border border-line bg-paper">
    <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundImage: "linear-gradient(#E5E3DE 1px,transparent 1px),linear-gradient(90deg,#E5E3DE 1px,transparent 1px)", backgroundSize: "28px 28px" }}>
      <AnimatePresence mode="wait"><motion.div key={it.slug} className="absolute inset-0 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}><Diagram slug={it.slug} />
        {it.image && <div className="absolute bottom-4 right-4 w-[34%] border border-ink bg-paper2 p-1"><Photo src={it.image} alt={`${it.name}`} ratio="aspect-[4/3]" sizes="200px" /></div>}</motion.div></AnimatePresence></div>
    <div className="p-5"><p className="text-sm text-stone">{it.kicker}</p><p className="display mt-1 text-2xl">{it.name}</p><p className="mt-2 text-mute">{it.blurb}</p><Link href={`/services/${it.slug}`} className="link-u mt-4 inline-block text-sm">View service →</Link><p className="mt-3 text-[11px] text-stone">Illustrative diagram.</p></div></div>);
}
export function ServicesExplorer({ items }: { items: Item[] }) {
  const [a, setA] = useState(0);
  return (<div className="grid gap-10 md:grid-cols-12">
    <ol className="border-t border-ink md:col-span-5">{items.map((s, i) => (
      <li key={s.slug} className="border-b border-line"><button onClick={() => setA(i)} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} aria-pressed={a === i} className="group flex w-full items-baseline gap-4 py-5 text-left"><span className="w-8 text-sm text-stone">{String(i + 1).padStart(2, "0")}</span><span className={`display text-2xl transition-all duration-300 md:text-3xl ${a === i ? "translate-x-2" : "text-mute"}`}>{s.name}</span></button>
        {a === i && <div className="pb-6 md:hidden"><Panel it={s} /></div>}</li>))}</ol>
    <div className="hidden md:col-span-7 md:block"><div className="sticky top-28"><Panel it={items[a]} /></div></div>
  </div>);
}
