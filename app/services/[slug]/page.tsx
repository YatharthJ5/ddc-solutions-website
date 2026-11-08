import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, projects } from "@/lib/data";
import { img } from "@/lib/assets";
import { getPage } from "@/lib/content";
import { SplitText } from "@/components/motion";
import { CTA, Eyebrow, Photo, Prose } from "@/components/ui";
export const dynamicParams = false;
export const generateStaticParams = () => services.map(s => ({ slug: s.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const s = services.find(x => x.slug === slug); return s ? { title: s.name, description: s.blurb } : {}; }
export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const i = services.findIndex(x => x.slug === slug); if (i < 0) notFound();
  const s = services[i], v = i % 3, full = getPage(slug), rel = projects.filter(p => s.related.includes(p.slug)), next = services[(i + 1) % services.length];
  const photo = s.image ? img(s.image) : full?.images?.[0];
  const head = (<><Eyebrow>{s.kicker}</Eyebrow><SplitText as="h1" className="display text-[clamp(2.4rem,5.2vw,4.8rem)]" text={s.name} /><p className="mt-7 max-w-xl text-xl text-mute">{s.blurb}</p>
    <div className="mt-9 flex flex-wrap gap-3"><CTA /><a className="btn btn-line" href={`https://ddcsolutions.co.uk/${s.slug}/`} target="_blank" rel="noopener noreferrer">Original service page<span className="sr-only"> (opens in a new tab)</span></a></div></>);
  return (<>
    {v === 0 && <section className="wrap grid gap-12 py-14 md:grid-cols-12 md:py-24"><div className={photo ? "md:col-span-6" : "md:col-span-8"}>{head}</div>{photo && <div className="md:col-span-5 md:col-start-8"><Photo src={photo} alt={s.name} ratio="aspect-[4/5]" priority sizes="(min-width:768px) 40vw, 100vw" /></div>}</section>}
    {v === 1 && <><section className="wrap pt-14 md:pt-24"><div className="max-w-4xl">{head}</div></section>{photo && <div className="wrap mt-14"><Photo src={photo} alt={s.name} ratio="aspect-[16/9] md:aspect-[21/9]" priority sizes="100vw" /></div>}</>}
    {v === 2 && <section className="on-dark mt-0 bg-ink text-paper"><div className="wrap grid items-center gap-12 py-16 md:grid-cols-12 md:py-28"><div className="md:col-span-6">{head}</div>{photo && <div className="md:col-span-5 md:col-start-8"><Photo src={photo} alt={s.name} ratio="aspect-[4/3]" priority sizes="(min-width:768px) 40vw, 100vw" /></div>}</div></section>}
    <section className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28"><h2 className="display text-3xl md:col-span-4">What the service covers</h2>
      <div className="md:col-span-8">{full?.html ? <Prose html={full.html} /> : <p className="max-w-xl text-mute">Full service details, deliverables and case references are published on the original DDC Solutions page. Run the content migration (see README) to bring them into this page.</p>}</div></section>
    {rel.length > 0 && <section className="border-t border-line bg-paper2 py-20"><div className="wrap"><h2 className="eyebrow">Related case studies</h2><ul className="divide-y divide-line border-y border-line">{rel.map(p => <li key={p.slug}><Link href={`/projects/${p.slug}`} className="group flex items-baseline justify-between gap-6 py-6"><span className="display text-2xl transition-transform group-hover:translate-x-1.5 md:text-3xl">{p.client}</span><span className="hidden text-sm text-mute sm:block">{p.title}</span></Link></li>)}</ul></div></section>}
    <section className="wrap py-16"><p className="eyebrow">Next service</p><Link href={`/services/${next.slug}`} className="display link-u text-3xl md:text-5xl">{next.name} →</Link></section>
  </>);
}
