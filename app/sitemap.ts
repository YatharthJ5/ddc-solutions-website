import type { MetadataRoute } from "next";
import { services, projects } from "@/lib/data";
import { migratedPosts, genericPages } from "@/lib/content";
const b = process.env.NEXT_PUBLIC_SITE_URL || "https://ddcsolutions.co.uk";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/team", "/services", "/projects", "/blog", "/contact", ...services.map(s => `/services/${s.slug}`), ...projects.map(p => `/projects/${p.slug}`), ...migratedPosts().map(p => `/blog/${p.slug}`), ...genericPages().map(p => `/p/${p.slug}`)].map(p => ({ url: b + p }));
}
