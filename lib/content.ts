import fs from "node:fs"; import path from "node:path";
import { interimPosts, type Post } from "./data";
function load<T>(f: string, d: T): T { try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", f), "utf8")) as T; } catch { return d; } }
export type MPage = { slug: string; path: string; title: string; html: string; date: string; images: string[]; featured: string | null; resources: string[]; type: string };
export const migratedPosts = (): Post[] => load<Post[]>("posts.json", []);
export const allPosts = (): Post[] => { const m = migratedPosts(); return m.length ? m : interimPosts; };
export const hasArchive = () => migratedPosts().length > 0;
export const pages = () => load<Record<string, MPage>>("pages.json", {});
export const getPage = (slug?: string) => (slug ? pages()[slug] : undefined);
export const resources = () => load<{ url: string; title: string }[]>("resources.json", []);
const core = new Set(["home", "about-us-2026", "about-us", "our-team", "team", "contact-us", "blog", "projects"]);
export const genericPages = () => Object.values(pages()).filter(p => p.slug !== "home" && !core.has(p.slug) && !p.slug.match(/^(bim-information-management|clash-detection-services|revit-modeling-services|revit-4-project-delivery|training-service|ddc-subscription-service|scan-to-bim-services|david-kohn-architects|stiff-trevillions|ddc-higgins)$/));
export const tidy = (s: string) => s.replace(/\s*—\s*/g, ", ").replace(/(\D)\s+–\s+(\D)/g, "$1, $2");
export const fmtDate = (d: string) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "");
