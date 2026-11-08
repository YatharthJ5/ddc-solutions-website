import type { Metadata } from "next";
import { Reveal, SplitText, Parallax } from "@/components/motion";
import { Eyebrow, BtnLink, CTA, Photo, Prose } from "@/components/ui";
import { whyUs, team, contact } from "@/lib/data";
import { img, APPROACH } from "@/lib/assets";
import { getPage } from "@/lib/content";
import { AboutAchievements } from "@/components/achievements";
export const metadata: Metadata = { title: "About Us", description: "DDC Solutions is a UK BIM consultancy that works as part of your team. ISO 19650 and UK BIM Framework aligned, with over 20 years of experience." };
export default function About() {
  const f = team[0], full = getPage("about-us-2026") ?? getPage("about-us");
  return (<>
    <section className="wrap grid gap-10 pb-16 pt-14 md:grid-cols-12 md:pt-24"><div className="md:col-span-7"><Eyebrow>About us</Eyebrow><SplitText as="h1" className="display text-[clamp(2.5rem,5.6vw,5.2rem)]" text="Trusted BIM partners for UK firms." /></div>
      <p className="self-end text-lg text-mute md:col-span-4 md:col-start-9">Bespoke BIM consultancy and dedicated modeling support, delivered by Revit experts, BIM pioneers, information managers and architectural technicians.</p></section>
    <Parallax amount={18} className="wrap"><Photo src={APPROACH} alt="DDC Solutions at work" ratio="aspect-[16/9] md:aspect-[21/9]" sizes="100vw" /></Parallax>
    <section className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32"><h2 className="display text-3xl md:col-span-4 md:text-4xl">Who we are</h2>
      <div className="space-y-6 text-lg text-mute md:col-span-7 md:col-start-6"><p>DDC Solutions aligns directly with your project deadlines and business goals. We bring real-time expertise into your team to improve efficiency, resolve complex design clashes and reduce production overheads.</p>
        <p>With over 20 years of experience, DDC Solutions offers specialized BIM consultancy and services. We are based in Bromley, South East London ({contact.address}).</p></div></section>
    <section className="bg-paper2 py-24"><div className="wrap grid items-center gap-12 md:grid-cols-12">
      <div className="md:col-span-4"><Photo src={img(f[3])} alt={`Portrait of ${f[0]}, ${f[1]}`} ratio="aspect-[4/5]" pos="object-top" sizes="(min-width:768px) 33vw, 100vw" /></div>
      <Reveal className="md:col-span-6 md:col-start-6"><Eyebrow>Founder</Eyebrow><h2 className="display text-4xl md:text-5xl">{f[0]}</h2><p className="mt-5 text-lg text-mute">{f[2]}</p><div className="mt-8"><BtnLink href="/team">Meet the whole team</BtnLink></div></Reveal></div></section>
    <section className="wrap py-24 md:py-32"><Eyebrow>How we work</Eyebrow><dl className="grid gap-x-16 gap-y-10 md:grid-cols-2">{whyUs.map(([t, d]) => <Reveal key={t} className="border-t border-ink pt-5"><dt className="display text-2xl">{t}</dt><dd className="mt-2 text-mute">{d}</dd></Reveal>)}</dl></section>
    <section aria-labelledby="mission-vision-values" className="border-y border-line bg-paper2 py-20 md:py-28">
      <div className="wrap">
        <Eyebrow>Purpose and principles</Eyebrow>
        <h2 id="mission-vision-values" className="display mb-10 text-4xl md:mb-14 md:text-5xl">Mission, Vision and Values</h2>
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <Reveal className="border-t border-ink pt-5 md:col-span-5">
            <h3 className="display text-2xl md:text-3xl">Mission</h3>
            <p className="mt-3 text-mute">To revolutionise project delivery in construction by putting people and businesses at the forefront through efficient process solutions that reduce costs and minimise waste.</p>
          </Reveal>
          <Reveal className="border-t border-ink pt-5 md:col-span-5 md:col-start-8">
            <h3 className="display text-2xl md:text-3xl">Vision</h3>
            <p className="mt-3 text-mute">To be the global benchmark in the industry's digital transformation, guiding businesses toward safe, sustainable, and highly profitable growth.</p>
          </Reveal>
          <div className="border-t border-line pt-5 md:col-span-12">
            <h3 className="display text-2xl md:text-3xl">Our Values</h3>
            <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["People-Centric", "We put people at the heart of every process."],
                ["Efficiency", "Direct, practical solutions that accelerate delivery and reduce costs."],
                ["Global Impact", "Supporting emerging economies and forward-looking projects."],
                ["Sustainability", "Conscious practices to build a better future."],
              ].map(([title, detail]) => (
                <Reveal key={title}>
                  <dt className="display text-xl">{title}</dt>
                  <dd className="mt-2 text-sm text-mute">{detail}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
    <AboutAchievements />
    {full?.html && <section className="border-t border-line bg-paper2 py-24"><div className="wrap grid gap-10 md:grid-cols-12"><h2 className="display text-3xl md:col-span-4">Company overview</h2><div className="md:col-span-8"><Prose html={full.html} /></div></div></section>}
    <section className="on-dark bg-ink py-20 text-paper"><div className="wrap flex flex-wrap items-center justify-between gap-6"><p className="display text-3xl md:text-4xl">Let’s discuss your next project.</p><CTA /></div></section>
  </>);
}
