"use client";
import Link from "next/link";
import { motion, MotionValue, useTransform } from "motion/react";
import { ProjectPhoto } from "@/components/ui";
import { MaskImage, Reveal } from "@/components/motion";
import { useStory } from "./shared";
export type Item = { slug: string; client: string; title: string; sector: string; place?: string; body: string; image: string | null; illustrative?: boolean };
function Layer({ i, n, p, it }: { i: number; n: number; p: MotionValue<number>; it: Item }) {
  const t = n - 1, clip = useTransform(p, [(i - 0.9) / t, (i - 0.1) / t], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]), sc = useTransform(p, [(i - 0.9) / t, (i + 0.4) / t], [1.18, 1.02]), y = useTransform(p, [0, 1], ["-3%", "3%"]);
  return <motion.div style={{ clipPath: i === 0 ? undefined : clip, zIndex: i }} className="absolute inset-0"><motion.div style={{ scale: sc, y }} className="h-full w-full"><ProjectPhoto src={it.image} alt={it.illustrative ? `Illustrative BIM visual for ${it.client}, not project photography` : `${it.client} project`} illustrative={it.illustrative} ratio="h-full w-full" sizes="(min-width:768px) 62vw, 100vw" /></motion.div></motion.div>;
}
function Text({ i, n, p, it }: { i: number; n: number; p: MotionValue<number>; it: Item }) {
  const t = n - 1, c = (k: number) => k / t, inp = [i === 0 ? -2 : c(i - 0.5), i === 0 ? -1 : c(i - 0.2), i === t ? 2 : c(i + 0.2), i === t ? 3 : c(i + 0.5)];
  const op = useTransform(p, inp, [0, 1, 1, 0]), y = useTransform(p, inp, [24, 0, 0, -24]);
  return <motion.div style={{ opacity: op, y }} className="absolute inset-0 flex flex-col justify-center"><p className="text-sm text-stone">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</p><p className="mt-4 text-sm text-stone">{it.sector}{it.place ? `, ${it.place}` : ""}</p><h3 className="display mt-2 text-4xl lg:text-5xl">{it.client}</h3><p className="mt-3">{it.title}</p><p className="mt-4 line-clamp-5 text-mute">{it.body}</p><Link href={`/projects/${it.slug}`} className="link-u mt-6 self-start text-sm">View case study →</Link></motion.div>;
}
export function ProjectStory({ items }: { items: Item[] }) {
  const n = items.length, { ref, p } = useStory(0);
  return (<>
    <section ref={ref} aria-label="Selected projects" style={{ height: `${n * 85}svh` }} className="relative hidden bg-paper2 md:block motion-reduce:hidden">
      <div className="sticky top-[4.5rem] grid h-[calc(100svh-4.5rem)] grid-cols-12 items-center gap-8 overflow-hidden wrap">
        <div className="relative col-span-4 h-[70%]"><p className="eyebrow absolute -top-8">Selected projects</p>{items.map((it, i) => <Text key={it.slug} i={i} n={n} p={p} it={it} />)}</div>
        <div className="relative col-span-8 h-[82%] overflow-hidden">{items.map((it, i) => <Layer key={it.slug} i={i} n={n} p={p} it={it} />)}</div>
      </div></section>
    <section aria-label="Selected projects" className="wrap space-y-16 bg-paper2 py-16 md:hidden motion-reduce:block motion-reduce:py-24 motion-reduce:md:block"><p className="eyebrow">Selected projects</p>
      {items.map(it => <article key={it.slug} className="grid gap-6 md:grid-cols-12"><MaskImage className="md:col-span-7"><ProjectPhoto src={it.image} alt={it.illustrative ? `Illustrative BIM visual for ${it.client}, not project photography` : `${it.client} project`} illustrative={it.illustrative} ratio="aspect-[4/3]" sizes="(min-width:768px) 58vw, 100vw" /></MaskImage>
        <Reveal className="md:col-span-5"><p className="text-sm text-stone">{it.sector}{it.place ? `, ${it.place}` : ""}</p><h3 className="display mt-2 text-3xl">{it.client}</h3><p className="mt-2">{it.title}</p><p className="mt-3 line-clamp-4 text-mute">{it.body}</p><Link href={`/projects/${it.slug}`} className="link-u mt-4 inline-block text-sm">View case study →</Link></Reveal></article>)}</section>
  </>);
}
