import fs from "node:fs";
import { staticRedirects } from "./lib/legacy-redirects.mjs";
let gen = []; try { gen = JSON.parse(fs.readFileSync("content/redirects.json", "utf8")); } catch {}
const seen = new Set(); const ok = /^\/[A-Za-z0-9_\-\/]+$/;
const redirects = [...staticRedirects, ...gen].filter(r => r.from !== r.to && ok.test(r.from) && !seen.has(r.from) && seen.add(r.from));
export default {
  eslint: { ignoreDuringBuilds: true },
  images: { remotePatterns: [{ protocol: "https", hostname: "ddcsolutions.co.uk" }] },
  async redirects() { return redirects.map(r => ({ source: r.from, destination: r.to, permanent: true })); },
};
