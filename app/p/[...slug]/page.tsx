import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { genericPages, getPage, resources } from "@/lib/content";
import { Eyebrow, Photo, Prose, CTA } from "@/components/ui";
export const dynamicParams = false;
export const generateStaticParams = () => genericPages().map(p => ({ slug: p.slug.split("/") }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> { const p = getPage((await params).slug.join("/")); return p ? { title: p.title } : {}; }
export default async function Generic({ params }: { params: Promise<{ slug: string[] }> }) {
  const p = getPage((await params).slug.join("/")); if (!p) notFound();
  const docs = resources().filter(r => p.resources.includes(r.url));
  return (<>
    <header className="wrap max-w-4xl pb-10 pt-14 md:pt-24"><Eyebrow>DDC Solutions</Eyebrow><h1 className="display text-[clamp(2.2rem,5vw,4.4rem)]">{p.title}</h1></header>
    {(p.featured ?? p.images[0]) && <div className="wrap"><Photo src={p.featured ?? p.images[0]} alt="" ratio="aspect-[16/9] md:aspect-[21/9]" sizes="100vw" priority /></div>}
    <div className="wrap py-14"><Prose html={p.html} />{docs.length > 0 && <ul className="mt-10 divide-y divide-line border-y border-line">{docs.map(d => <li key={d.url}><a href={d.url} download className="block py-4 link-u">Download: {d.title}</a></li>)}</ul>}</div>
    <section className="on-dark bg-ink py-16 text-paper"><div className="wrap flex flex-wrap items-center justify-between gap-6"><p className="display text-3xl">Talk to DDC Solutions.</p><CTA /></div></section>
  </>);
}
