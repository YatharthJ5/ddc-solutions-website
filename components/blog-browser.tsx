"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
type P = { slug: string; title: string; date: string; excerpt: string; cats: { slug: string; name: string }[]; href: string; external: boolean };
const SIZE = 12;
export function BlogBrowser({ posts }: { posts: P[] }) {
  const [q, setQ] = useState(""), [cat, setCat] = useState(""), [page, setPage] = useState(1);
  useEffect(() => { const c = new URLSearchParams(location.search).get("category"); if (c) setCat(c); }, []);
  const cats = useMemo(() => { const m = new Map<string, string>(); posts.forEach(p => p.cats.forEach(c => m.set(c.slug, c.name))); return [...m]; }, [posts]);
  const list = useMemo(() => posts.filter(p => (!cat || p.cats.some(c => c.slug === cat)) && (!q || (p.title + " " + p.excerpt).toLowerCase().includes(q.toLowerCase()))), [posts, q, cat]);
  const pages = Math.max(1, Math.ceil(list.length / SIZE)), cur = Math.min(page, pages), view = list.slice((cur - 1) * SIZE, cur * SIZE);
  const fmt = (d: string) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "");
  return (<div>
    <div className="flex flex-wrap items-end gap-6 border-y border-line py-6">
      <label className="min-w-[14rem] flex-1 text-sm text-stone">Search articles<input type="search" value={q} onChange={e => { setQ(e.target.value); setPage(1); }} className="mt-1 block w-full border-0 border-b border-ink bg-transparent py-2 text-base text-ink" /></label>
      {cats.length > 0 && <label className="text-sm text-stone">Category<select value={cat} onChange={e => { setCat(e.target.value); setPage(1); }} className="mt-1 block border-0 border-b border-ink bg-transparent py-2 text-base text-ink"><option value="">All</option>{cats.map(([s, n]) => <option key={s} value={s}>{n}</option>)}</select></label>}
      <p className="text-sm text-stone" aria-live="polite">{list.length} article{list.length === 1 ? "" : "s"}</p></div>
    <ul className="divide-y divide-line border-b border-line">{view.map(p => { const inner = (<><span className="text-sm text-stone md:col-span-3">{fmt(p.date)}</span><span className="md:col-span-8"><span className="display block text-2xl transition-transform group-hover:translate-x-1.5 md:text-3xl">{p.title}</span>{p.excerpt && <span className="mt-2 block max-w-2xl text-mute">{p.excerpt}</span>}{p.cats.length > 0 && <span className="mt-2 block text-sm text-stone">{p.cats.map(c => c.name).join(", ")}</span>}</span></>);
      return <li key={p.slug}>{p.external ? <a href={p.href} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-8 md:grid-cols-12">{inner}</a> : <Link href={p.href} className="group grid gap-2 py-8 md:grid-cols-12">{inner}</Link>}</li>; })}</ul>
    {pages > 1 && <nav aria-label="Pagination" className="mt-10 flex flex-wrap gap-2">{Array.from({ length: pages }, (_, i) => <button key={i} onClick={() => { setPage(i + 1); scrollTo({ top: 0 }); }} aria-current={cur === i + 1 ? "page" : undefined} className={`h-10 w-10 border text-sm ${cur === i + 1 ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>{i + 1}</button>)}</nav>}
  </div>);
}
