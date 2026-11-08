import fs from "node:fs"; import path from "node:path";
import { remote } from "./data";
const pub = (p: string) => path.join(process.cwd(), "public", p);
// Resolve an original upload path ("2026/08/49.png") to the local migrated copy when it exists, otherwise the original URL (interim).
export const img = (p?: string) => { if (!p) return undefined; if (p.startsWith("/") || p.startsWith("http")) return p; const l = `/assets/migrated/${p}`; return fs.existsSync(pub(l)) ? l : remote(p); };
const brandFile = (base: string, fallback: string) => { try { const f = fs.readdirSync(pub("assets/brand")).find(n => n.startsWith(base + ".")); if (f) return `/assets/brand/${f}`; } catch {} return remote(fallback); };
export const brand = { header: brandFile("ddc-logo-header", "2024/06/logoVector-Smart-Object.png"), white: brandFile("ddc-logo-white", "2023/10/DDC-Logo-White-02.png"), favicon: brandFile("ddc-favicon", "2023/12/cropped-Untitled-10-180x180-1.png") };
export const HERO = img("2026/08/49.png"); export const APPROACH = img("2026/08/5.png");
