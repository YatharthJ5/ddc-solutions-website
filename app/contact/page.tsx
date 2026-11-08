import type { Metadata } from "next";
import { contact, socials } from "@/lib/data";
import { CTA, Eyebrow } from "@/components/ui";
import { SplitText } from "@/components/motion";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = { title: "Contact Us", description: "Contact DDC Solutions: 0208 058 5031, info@ddcsolutions.co.uk, 36 Scotts Road, Bromley, BR1 3QD." };
export default function Contact() {
  const configured = false;
  return (<div className="wrap grid gap-16 py-20 md:grid-cols-12 md:py-32">
    <div className="md:col-span-5"><Eyebrow>Contact Us</Eyebrow><SplitText as="h1" className="display text-[clamp(2.3rem,5vw,4rem)]" text="Let’s make your digital construction predictable." />
      <dl className="mt-12 divide-y divide-line border-y border-line text-lg">
        <div className="py-4"><dt className="eyebrow">Telephone</dt><dd><a className="link-u" href={`tel:${contact.tel.replace(/\s/g, "")}`}>{contact.tel}</a></dd></div>
        <div className="py-4"><dt className="eyebrow">Email</dt><dd><a className="link-u" href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
        <div className="py-4"><dt className="eyebrow">Address</dt><dd>{contact.address}</dd></div></dl>
      <div className="mt-8"><CTA>Book Free Consultation</CTA></div>
      <ul className="mt-8 flex flex-wrap gap-6 text-sm">{socials.map(([n, u]) => <li key={n}><a className="link-u" href={u} target="_blank" rel="noopener noreferrer">{n}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul></div>
    <div className="md:col-span-6 md:col-start-7"><h2 className="display mb-8 text-3xl">Send us a message</h2><ContactForm configured={configured} /></div></div>);
}
