import Link from "next/link";
import { MaskImage, Reveal, SplitText, Parallax } from "@/components/motion";
import { BimHero } from "@/components/scroll/bim-hero";
import { ExplodedModel } from "@/components/scroll/exploded";
import { ClashDetection } from "@/components/scroll/clash";
import { Workflow } from "@/components/scroll/workflow";
import { ProjectStory } from "@/components/scroll/project-story";
import { ServicesExplorer } from "@/components/scroll/services-explorer";
import { CTA, BtnLink, Eyebrow, Photo } from "@/components/ui";
import { PostLink } from "@/components/post-link";
import { AchievementsPreview } from "@/components/achievements";
import { services, projects, whyUs, testimonials, logos, team } from "@/lib/data";
import { img, HERO, APPROACH } from "@/lib/assets";
import { getPage, allPosts, fmtDate } from "@/lib/content";
const pimg = (src?: string, fallback?: string) => { const p = getPage(src); return p?.images?.[0] ?? p?.featured ?? fallback ?? null; };
export default function Home() {
  const posts = allPosts().slice(0, 4), [f, ...rest] = posts;
  return (<>
    <BimHero>
      <p className="eyebrow">BIM consultancy for UK firms</p>
      <SplitText as="h1" delay={0.2} className="display max-w-[15ch] text-[clamp(2.4rem,5.6vw,5.6rem)]" text="Better BIM. Smarter Project Delivery." />
      <p className="mt-5 line-clamp-3 max-w-md text-base text-mute md:mt-8 md:line-clamp-none md:text-lg">Bespoke BIM consultancy and dedicated modeling support for UK firms. We work as part of your team to reduce overheads, remove technical bottlenecks and keep your pipeline moving.</p>
      <div className="mt-6 flex flex-wrap gap-3 md:mt-10"><CTA /><BtnLink href="/services">Explore Services</BtnLink></div>
    </BimHero>

    <section className="border-y border-line bg-paper2"><div className="wrap grid items-center gap-8 py-12 md:grid-cols-12">
      <p className="md:col-span-3 text-sm text-stone">Trusted by industry leaders</p>
      <ul className="flex flex-wrap items-center gap-x-14 gap-y-6 md:col-span-9">{logos.map(([l, n]) => <li key={l}><img src={img(l)} alt={n} loading="lazy" className="h-9 w-auto opacity-70 grayscale" /></li>)}</ul></div></section>

    <section className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-36">
      <div className="md:col-span-7"><Eyebrow>Who we are</Eyebrow>
        <SplitText className="display text-[clamp(2rem,4.2vw,3.7rem)]" text="We don’t just consult. We integrate as your trusted BIM partners." />
        <Reveal><p className="mt-8 max-w-2xl text-lg text-mute">Unlike conventional firms that focus on ticking boxes with acronyms, DDC Solutions aligns directly with your project deadlines and business goals. We bring real-time expertise into your team to improve efficiency, resolve complex design clashes and reduce production overheads.</p>
          <div className="mt-8"><Link href="/about" className="link-u">About DDC Solutions →</Link></div></Reveal></div>
      <Parallax amount={20} className="md:col-span-4 md:col-start-9"><Photo src={APPROACH} alt="The DDC Solutions approach" ratio="aspect-[3/4]" sizes="(min-width:768px) 30vw, 100vw" /></Parallax>
    </section>

    <ExplodedModel />

    <section className="py-24 md:py-32"><div className="wrap"><div className="mb-12 grid gap-6 md:grid-cols-12"><div className="md:col-span-6"><Eyebrow>Services</Eyebrow><h2 className="display text-4xl md:text-5xl">Technical and managerial BIM solutions</h2></div>
      <p className="self-end text-mute md:col-span-4 md:col-start-9">Designed to streamline delivery, ensure compliance and improve project efficiency.</p></div>
      <ServicesExplorer items={services.map(s => ({ slug: s.slug, name: s.name, kicker: s.kicker, blurb: s.blurb, image: s.image ? img(s.image) : undefined }))} /></div></section>

    <ClashDetection />

    <ProjectStory items={projects.map(p => ({ slug: p.slug, client: p.client, title: p.title, sector: p.sector, place: p.place, body: p.body, image: pimg(p.src, p.image) ?? null, illustrative: p.illustrative }))} />

    <AchievementsPreview />

    <Workflow />

    <section className="bg-paper2 py-24 md:py-32"><div className="wrap"><Eyebrow>Our approach and expertise</Eyebrow>
      <div className="grid gap-12 md:grid-cols-12"><h2 className="display text-4xl md:col-span-5 md:text-5xl">Rigorous standards, practical delivery.</h2>
        <dl className="grid gap-10 md:col-span-7 sm:grid-cols-2">
          {[["Standards", "ISO 19650 and the UK BIM Framework, applied from execution planning through to audit."], ["Production", "Structural and architectural Revit modeling, and Revit 4 Project Delivery (R4PD) support."], ["Coordination", "Clash detection, conflict resolution and information management that reduce on-site remodeling."], ["Capability", "Training, Scan to BIM and in-house BIM management that leave your team more self-sufficient."]].map(([t, d]) => <Reveal key={t} className="border-t border-ink pt-5"><dt className="display text-2xl">{t}</dt><dd className="mt-2 text-mute">{d}</dd></Reveal>)}</dl></div></div></section>

    <section className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-36"><div className="md:col-span-5"><Eyebrow>Why DDC Solutions</Eyebrow><SplitText className="display text-4xl md:text-5xl" text="Why clients work with us." /></div>
      <ol className="divide-y divide-line border-y border-line md:col-span-7">{whyUs.map(([t, d], i) => <li key={t}><Reveal className="grid gap-2 py-8 sm:grid-cols-[3rem_1fr]"><span className="text-sm text-stone">{String(i + 1).padStart(2, "0")}</span><div><h3 className="display text-2xl">{t}</h3><p className="mt-2 text-mute">{d}</p></div></Reveal></li>)}</ol></section>

    <section className="border-t border-line bg-paper2 py-24 md:py-32"><div className="wrap"><Eyebrow>What our partners say</Eyebrow>
      <div className="grid gap-12 md:grid-cols-12"><figure className="md:col-span-7"><blockquote className="display text-2xl leading-snug md:text-4xl">“{testimonials[0][2]}”</blockquote><figcaption className="mt-6 text-sm text-stone">{testimonials[0][0]}, {testimonials[0][1]}</figcaption></figure>
        <div className="space-y-10 md:col-span-4 md:col-start-9">{testimonials.slice(1).map(([r, o, q]) => <figure key={o} className="border-t border-ink pt-5"><blockquote className="text-mute">“{q}”</blockquote><figcaption className="mt-4 text-sm text-stone">{r}, {o}</figcaption></figure>)}</div></div></div></section>

    <section className="wrap py-24 md:py-36"><div className="grid gap-10 md:grid-cols-12"><div className="md:col-span-4"><Eyebrow>Our team</Eyebrow><h2 className="display text-4xl md:text-5xl">The people behind the work.</h2><p className="mt-5 text-mute">Revit experts, BIM pioneers, information managers and architectural technicians.</p><div className="mt-8"><BtnLink href="/team">Meet the team</BtnLink></div></div>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:col-span-8 md:grid-cols-4">{team.slice(0, 4).map(([n, r, , p], i) => <li key={n} className={i % 2 ? "md:mt-12" : ""}><Photo src={img(p)} alt={`Portrait of ${n}`} ratio="aspect-[4/5]" pos="object-top" sizes="(min-width:768px) 17vw, 45vw" /><p className="display mt-3 text-lg">{n}</p><p className="text-sm text-stone">{r}</p></li>)}</ul></div></section>

    <section className="border-t border-line py-20"><div className="wrap"><div className="flex flex-wrap items-end justify-between gap-4"><div><Eyebrow>Latest insights</Eyebrow><h2 className="display text-4xl">From the blog</h2></div><Link href="/blog" className="link-u">All articles →</Link></div>
      <div className="mt-10 grid gap-10 md:grid-cols-12"><PostLink post={f} className="group md:col-span-7"><p className="text-sm text-stone">{fmtDate(f.date)}{f.author ? `, ${f.author}` : ""}</p><h3 className="display mt-3 text-3xl transition-transform group-hover:translate-x-1.5 md:text-4xl">{f.title}</h3>{f.excerpt && <p className="mt-3 text-mute">{f.excerpt}</p>}</PostLink>
        <ul className="divide-y divide-line border-y border-line md:col-span-4 md:col-start-9">{rest.map(p => <li key={p.slug}><PostLink post={p} className="group block py-5"><span className="text-sm text-stone">{fmtDate(p.date)}</span><span className="display mt-1 block text-xl transition-transform group-hover:translate-x-1">{p.title}</span></PostLink></li>)}</ul></div></div></section>

    <section className="on-dark bg-ink py-24 text-paper"><div className="wrap grid gap-10 md:grid-cols-12 md:items-end"><h2 className="display text-4xl md:col-span-7 md:text-6xl">Control your project risk. Keep your delivery predictable.</h2>
      <div className="md:col-span-4 md:col-start-9"><p className="text-paper/75">Partner with DDC Solutions to put an ISO 19650-aligned information framework in place, tailored to your business goals.</p><div className="mt-8 flex flex-wrap gap-3"><CTA>Book a Consultation</CTA><BtnLink href="/contact" variant="btn-line">Contact details</BtnLink></div></div></div></section>
  </>);
}
