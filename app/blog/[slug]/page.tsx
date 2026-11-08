import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { migratedPosts, fmtDate } from "@/lib/content";
import { Eyebrow, Photo, Prose, CTA } from "@/components/ui";
export const dynamicParams = false;
export const generateStaticParams = () => migratedPosts().map(p => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const p = migratedPosts().find(x => x.slug === slug); return p ? { title: p.title, description: p.excerpt || undefined, openGraph: { type: "article", publishedTime: p.date } } : {}; }
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const all = migratedPosts(), i = all.findIndex(x => x.slug === slug); if (i < 0) notFound();
  const p = all[i], newer = all[i - 1], older = all[i + 1], c = p.cats.map(x => x.slug);
  const related = all.filter(x => x.slug !== slug && x.cats.some(y => c.includes(y.slug))).slice(0, 3);
  return (<article>
    <header className="wrap max-w-4xl pb-10 pt-14 md:pt-24"><Eyebrow>{p.cats.map(x => x.name).join(", ") || "Insights"}</Eyebrow><h1 className="display text-[clamp(2.1rem,4.8vw,4.2rem)]">{p.title}</h1><p className="mt-5 text-sm text-stone">{fmtDate(p.date)}{p.author ? `, ${p.author}` : ""}</p></header>
    {p.featured && <div className="wrap"><Photo src={p.featured} alt="" ratio="aspect-[16/9] md:aspect-[21/9]" sizes="100vw" priority /></div>}
    <div className="wrap py-14"><Prose html={p.html ?? ""} /></div>
    <nav aria-label="More articles" className="wrap grid gap-6 border-t border-line py-10 md:grid-cols-2">{newer ? <Link href={`/blog/${newer.slug}`} className="link-u"><span className="block text-sm text-stone">Newer</span><span className="display text-xl">{newer.title}</span></Link> : <span />}{older && <Link href={`/blog/${older.slug}`} className="md:text-right"><span className="block text-sm text-stone">Older</span><span className="display text-xl">{older.title}</span></Link>}</nav>
    {related.length > 0 && <section className="wrap border-t border-line py-14"><h2 className="eyebrow">Related articles</h2><ul className="divide-y divide-line border-y border-line">{related.map(r => <li key={r.slug}><Link href={`/blog/${r.slug}`} className="block py-5 display text-2xl">{r.title}</Link></li>)}</ul></section>}
    <section className="on-dark bg-ink py-16 text-paper"><div className="wrap flex flex-wrap items-center justify-between gap-6"><p className="display text-3xl">Talk to DDC Solutions.</p><CTA /></div></section>
  </article>);
}
