import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, testimonials } from "@/lib/data";
import { getPage } from "@/lib/content";
import { SplitText, Reveal } from "@/components/motion";
import { CTA, Eyebrow, Photo, ProjectPhoto, Prose } from "@/components/ui";
import { ProjectAchievements } from "@/components/achievements";
export const dynamicParams = false;
export const generateStaticParams = () => projects.map(p => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const p = projects.find(x => x.slug === slug); return p ? { title: `${p.client} case study`, description: p.body.slice(0, 155) } : {}; }
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const i = projects.findIndex(x => x.slug === slug); if (i < 0) notFound();
  const p = projects[i], pg = getPage(p.src), others = projects.filter(x => x.slug !== slug).slice(0, 3), t = p.quote !== undefined ? testimonials[p.quote] : null, gallery = [...(pg?.images ?? []).slice(1), ...(p.gallery ?? [])];
  const facts: [string, string][] = [["Client", p.client], ["Sector", p.sector], ...(p.place ? [["Location", p.place] as [string, string]] : []), ...(p.services ? [["Services", p.services] as [string, string]] : [])];
  return (<>
    <section className="wrap pt-14 md:pt-24"><Eyebrow>Case study</Eyebrow><SplitText as="h1" className="display max-w-5xl text-[clamp(2.2rem,5vw,4.6rem)]" text={p.title} /></section>
    <div className="wrap mt-12"><ProjectPhoto src={pg?.images?.[0] ?? pg?.featured ?? p.image} alt={p.illustrative ? `Illustrative BIM visual for ${p.client}, not project photography` : `${p.client} project`} illustrative={p.illustrative} ratio="aspect-[16/9] md:aspect-[21/9]" priority sizes="100vw" /></div>
    <section className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
      <dl className="md:col-span-4">{facts.map(([k, v]) => <div key={k} className="border-t border-line py-4"><dt className="text-sm text-stone">{k}</dt><dd className="mt-1 text-lg">{v}</dd></div>)}</dl>
      <div className="md:col-span-7 md:col-start-6"><h2 className="eyebrow">Overview</h2><Reveal><p className="display text-2xl leading-snug md:text-3xl">{p.body}</p></Reveal>
        <div className="mt-10 flex flex-wrap gap-3"><CTA>Discuss a similar project</CTA>{p.orig && <a className="btn btn-line" href={p.orig} target="_blank" rel="noopener noreferrer">Original case study<span className="sr-only"> (opens in a new tab)</span></a>}</div></div></section>
    {pg?.html && <section className="border-t border-line bg-paper2 py-20"><div className="wrap grid gap-10 md:grid-cols-12"><h2 className="display text-3xl md:col-span-4">Full case study</h2><div className="md:col-span-8"><Prose html={pg.html} /></div></div></section>}
    {p.orig && !/our achievements/i.test(pg?.html ?? "") && <ProjectAchievements />}
    {gallery.length > 0 && <section className="wrap py-20"><h2 className="eyebrow">Gallery</h2><ul className="grid gap-4 sm:grid-cols-2">{gallery.map(g => <li key={g}><Photo src={g} alt={`${p.client} project image`} ratio="aspect-[4/3]" sizes="(min-width:640px) 45vw, 100vw" /></li>)}</ul></section>}
    {t && <section className="bg-paper2 py-20"><figure className="wrap max-w-4xl"><blockquote className="display text-2xl leading-snug md:text-4xl">“{t[2]}”</blockquote><figcaption className="mt-6 text-sm text-stone">{t[0]}, {t[1]}</figcaption></figure></section>}
    <section className="wrap py-20"><h2 className="eyebrow">Related projects</h2><ul className="divide-y divide-line border-y border-line">{others.map(o => <li key={o.slug}><Link href={`/projects/${o.slug}`} className="group flex items-baseline justify-between gap-6 py-6"><span className="display text-2xl transition-transform group-hover:translate-x-1.5 md:text-3xl">{o.client}</span><span className="hidden text-sm text-mute sm:block">{o.sector}</span></Link></li>)}</ul></section>
    <section className="on-dark bg-ink py-20 text-paper"><div className="wrap flex flex-wrap items-center justify-between gap-6"><p className="display text-3xl md:text-4xl">Planning a project?</p><CTA>Book a Consultation</CTA></div></section>
  </>);
}
