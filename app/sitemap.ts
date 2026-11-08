import type { MetadataRoute } from "next";
import { services, projects } from "@/lib/data";
import { migratedPosts, genericPages } from "@/lib/content";

export const dynamic = "force-static";

const base = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://yatharthj5.github.io/ddc-solutions-website"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/team",
    "/services",
    "/projects",
    "/blog",
    "/contact",
    ...services.map(s => `/services/${s.slug}`),
    ...projects.map(p => `/projects/${p.slug}`),
    ...migratedPosts().map(p => `/blog/${p.slug}`),
    ...genericPages().map(p => `/p/${p.slug}`),
  ];

  return pages.map(path => ({
    url: `${base}${path}/`,
  }));
}