import type { Metadata } from "next";
import { Reveal, SplitText, MaskImage } from "@/components/motion";
import { Eyebrow, CTA, Photo } from "@/components/ui";
import { team } from "@/lib/data";
import { img } from "@/lib/assets";
export const metadata: Metadata = { title: "Our Team", description: "Revit experts, BIM pioneers, information managers and architectural technicians who bring precision to project delivery." };
export default function Team() {
  const lead = team.slice(0, 2), rest = team.slice(2);
  return (<>
    <section className="wrap grid gap-8 pb-16 pt-14 md:grid-cols-12 md:pt-24"><div className="md:col-span-8"><Eyebrow>Our team</Eyebrow><SplitText as="h1" className="display text-[clamp(2.5rem,5.6vw,5.2rem)]" text="The people behind the precision." /></div>
      <p className="self-end text-lg text-mute md:col-span-4">By blending technology with experience, our Revit experts, BIM pioneers, information managers and architectural technicians bring precision to project delivery.</p></section>
    {lead.map(([n, r, b, p], i) => (
      <section key={n} className={`border-t border-line py-16 md:py-24 ${i ? "bg-paper2" : ""}`}><div className="wrap grid items-center gap-10 md:grid-cols-12">
        <MaskImage className={`md:col-span-4 ${i ? "md:col-start-9 md:row-start-1" : "md:col-start-2"}`}><Photo src={img(p)} alt={`Portrait of ${n}, ${r}`} ratio="aspect-[4/5]" pos="object-top" priority={!i} sizes="(min-width:768px) 33vw, 100vw" /></MaskImage>
        <Reveal className={`md:col-span-6 ${i ? "md:col-start-2" : "md:col-start-7"}`}><p className="text-sm text-stone">{r}</p><h2 className="display mt-2 text-4xl md:text-6xl">{n}</h2><p className="mt-6 text-lg text-mute">{b}</p></Reveal></div></section>))}
    <section className="wrap border-t border-line py-20 md:py-28"><h2 className="eyebrow">The wider team</h2>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4">{rest.map(([n, r, b, p], i) => <li key={n} className={i % 2 ? "lg:mt-10" : ""}><Reveal delay={(i % 4) * 0.06}><Photo src={img(p)} alt={`Portrait of ${n}${r ? `, ${r}` : ""}`} ratio="aspect-[4/5]" pos="object-top" sizes="(min-width:1024px) 22vw, 45vw" />
        <h3 className="display mt-4 text-xl md:text-2xl">{n}</h3>{r && <p className="text-sm text-stone">{r}</p>}{b && <p className="mt-2 text-sm text-mute">{b}</p>}</Reveal></li>)}</ul></section>
    <section className="on-dark bg-ink py-20 text-paper"><div className="wrap flex flex-wrap items-center justify-between gap-6"><div><h2 className="display text-3xl md:text-4xl">How can we help?</h2><p className="mt-2 text-paper/70">With over 20 years of experience, DDC Solutions offers specialized BIM consultancy and services.</p></div><CTA>Book a Consultation</CTA></div></section>
  </>);
}
