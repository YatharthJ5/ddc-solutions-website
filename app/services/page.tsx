import type { Metadata } from "next";
import Link from "next/link";
import { SplitText, Reveal } from "@/components/motion";
import { Eyebrow, Photo } from "@/components/ui";
import { services } from "@/lib/data";
import { img } from "@/lib/assets";
export const metadata: Metadata = { title: "Services", description: "Technical and managerial BIM solutions designed to streamline delivery, ensure compliance and improve project efficiency." };
export default function Services() {
  return (<div className="wrap py-16 md:py-28"><Eyebrow>Services</Eyebrow><SplitText as="h1" className="display max-w-4xl text-[clamp(2.5rem,5.6vw,5.2rem)]" text="Our BIM and project services" />
    <ol className="mt-16 border-t border-ink">{services.map((s, i) => <li key={s.slug} className="border-b border-line"><Reveal><Link href={`/services/${s.slug}`} className="group grid items-center gap-6 py-8 md:grid-cols-12">
      <span className="text-sm text-stone md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
      <span className={`md:col-span-5 ${i % 2 ? "md:order-3 md:col-span-6 md:col-start-7" : ""}`}><span className="text-sm text-stone">{s.kicker}</span><span className="display mt-1 block text-3xl transition-transform duration-500 group-hover:translate-x-1.5 md:text-4xl">{s.name}</span><span className="mt-3 block max-w-lg text-mute">{s.blurb}</span></span>
      <span className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-span-5" : "md:col-start-8"}`}>{s.image ? <Photo src={img(s.image)} alt={s.name} ratio="aspect-[16/9]" sizes="(min-width:768px) 40vw, 100vw" className="transition duration-700 group-hover:opacity-90" /> : null}</span></Link></Reveal></li>)}</ol></div>);
}
