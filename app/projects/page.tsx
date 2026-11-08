import type { Metadata } from "next";
import Link from "next/link";
import { SplitText, Reveal, MaskImage } from "@/components/motion";
import { Eyebrow, ProjectPhoto } from "@/components/ui";
import { projects } from "@/lib/data";
import { genericPages } from "@/lib/content";
export const metadata: Metadata = { title: "Projects", description: "DDC Solutions case studies: TSK Group, Higgins, Stiff & Trevillion and David Kohn Architects." };
const PROJECT_SLUGS = ["st-modelling", "stiff-trevillion-architects", "higgins-im-cs", "higgins-accreditation"];
export default function Projects() {
  const extra = genericPages().filter(p => PROJECT_SLUGS.includes(p.slug));
  return (<div className="wrap py-16 md:py-28"><Eyebrow>Projects</Eyebrow><SplitText as="h1" className="display max-w-4xl text-[clamp(2.5rem,5.6vw,5.2rem)]" text="Case studies" />
    <div className="mt-20 space-y-24">{projects.map((p, i) => (
      <article key={p.slug} className="grid items-end gap-8 md:grid-cols-12"><MaskImage className={`md:col-span-7 ${i % 2 ? "md:col-start-6 md:row-start-1" : ""}`}><Link href={`/projects/${p.slug}`} aria-label={p.client}><ProjectPhoto src={p.image} alt={p.illustrative ? `Illustrative BIM visual for ${p.client}, not project photography` : `${p.client} project`} illustrative={p.illustrative} ratio="aspect-[4/3]" sizes="(min-width:768px) 58vw, 100vw" /></Link></MaskImage>
        <Reveal className={`md:col-span-4 ${i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-9"}`}><p className="text-sm text-stone">{p.sector}{p.place ? `, ${p.place}` : ""}</p><h2 className="display mt-3 text-3xl md:text-4xl">{p.client}</h2><p className="mt-2">{p.title}</p><Link href={`/projects/${p.slug}`} className="link-u mt-5 inline-block text-sm">View case study →</Link></Reveal></article>
    ))}</div>
    {extra.length > 0 && <div className="mt-28"><h2 className="eyebrow">More case studies</h2><ul className="divide-y divide-line border-y border-line">{extra.map(p => <li key={p.slug}><Link href={`/p/${p.slug}`} className="group block py-6"><span className="display text-2xl transition-transform group-hover:translate-x-1.5 md:text-3xl">{p.title}</span></Link></li>)}</ul></div>}</div>);
}
