
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/data";
import { withBasePath } from "@/lib/paths";

export function Nav({ logo }: { logo: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);

  const cur = (h: string) =>
    path === h || path.startsWith(h + "/") ? "page" : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="wrap flex h-[4.5rem] items-center justify-between"
      >
        <Link
          href="/"
          aria-label="DDC Solutions, home"
          className="shrink-0"
        >
          <img
            src={withBasePath(logo)}
            alt="DDC Solutions"
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <ul className="hidden items-center gap-9 text-sm lg:flex">
          <li>
            <Link href="/about" aria-current={cur("/about")} className="link-u">
              About
            </Link>
          </li>
          <li>
            <Link href="/team" aria-current={cur("/team")} className="link-u">
              Our Team
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/services"
              aria-current={cur("/services")}
              className="link-u py-6"
            >
              Services
            </Link>
            <ul className="invisible absolute -left-5 top-full w-72 border border-line bg-paper2 p-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block px-3 py-2 hover:bg-paper"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/projects" aria-current={cur("/projects")} className="link-u">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blog" aria-current={cur("/blog")} className="link-u">
              Insights
            </Link>
          </li>
          <li>
            <Link href="/contact" className="btn !py-2.5">
              Contact Us
            </Link>
          </li>
        </ul>

        <button
          ref={menuButton}
          type="button"
          className="min-h-11 min-w-11 border border-ink px-4 py-2 text-sm lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mnav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="mnav"
          className="absolute inset-x-0 top-[4.5rem] max-h-[calc(100svh-4.5rem)] overflow-auto border-b border-line bg-paper lg:hidden"
        >
          <ul className="wrap divide-y divide-line py-2 text-lg">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/team", "Our Team"],
              ["/services", "Services"],
              ...services.map((s) => [`/services/${s.slug}`, s.name]),
              ["/projects", "Projects"],
              ["/blog", "Insights"],
              ["/contact", "Contact Us"],
            ].map(([h, l]) => (
              <li key={h}>
                <Link
                  href={h}
                  onClick={() => setOpen(false)}
                  className="block min-h-11 py-2.5"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
