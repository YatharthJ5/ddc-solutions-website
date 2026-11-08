
import Link from "next/link";
import { contact, socials, services } from "@/lib/data";
import { brand } from "@/lib/assets";
import { withBasePath } from "@/lib/paths";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="wrap py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <img
            src={withBasePath(brand.white)}
            alt="DDC Solutions"
            className="h-12 w-auto md:col-span-4"
          />
          <p className="display max-w-xl text-2xl text-paper/90 md:col-span-7 md:col-start-6 md:text-3xl">
            Bespoke BIM consultancy and dedicated modeling support for UK firms.
          </p>
        </div>

        <div className="mt-16 grid gap-12 border-t border-paper/15 pt-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h2 className="mb-4 text-sm text-silver">Contact</h2>
            <ul className="space-y-2 text-sm text-paper/80">
              <li>
                <a
                  className="link-u"
                  href={`tel:${contact.tel.replace(/\s/g, "")}`}
                >
                  {contact.tel}
                </a>
              </li>
              <li>
                <a className="link-u" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li>{contact.address}</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm text-silver">Company</h2>
            <ul className="space-y-2 text-sm text-paper/80">
              {[
                ["/about", "About"],
                ["/team", "Our Team"],
                ["/projects", "Projects"],
                ["/blog", "Insights"],
                ["/contact", "Contact"],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link className="link-u" href={h}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm text-silver">Services</h2>
            <ul className="space-y-2 text-sm text-paper/80">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link className="link-u" href={`/services/${s.slug}`}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm text-silver">Follow</h2>
            <ul className="space-y-2 text-sm text-paper/80">
              {socials.map(([n, u]) => (
                <li key={n}>
                  <a
                    className="link-u"
                    href={u}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {n}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 text-xs text-silver">
          © 2026, All Rights Reserved | DDC Solutions
        </p>
      </div>
    </footer>
  );
}
