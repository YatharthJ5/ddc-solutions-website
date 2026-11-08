// Full content migration from the live WordPress site. Run on a machine with internet access:  npm run migrate
// Needs Node 18+. No dependencies. Writes: content/*.json, public/assets/migrated/**, public/assets/brand/**, MIGRATION_REPORT.md
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { mapPath, SERVICES } from "../lib/legacy-redirects.mjs";

const BASE = (process.env.SOURCE_URL || "https://ddcsolutions.co.uk").replace(/\/$/, "");
const HOST = new URL(BASE).host;
const UA = { "user-agent": "Mozilla/5.0 (DDC content migration)" };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = async (u, o = {}) => { for (let i = 0; ; i++) { try { return await fetch(u, { headers: UA, redirect: "follow", ...o }); } catch (e) { if (i >= 2) return { ok: false, status: 0, text: async () => "", json: async () => null, headers: new Headers() }; await sleep(600 * (i + 1)); } } };
const text = async u => { const r = await get(u); return r.ok ? await r.text() : ""; };
const dec = s => s.replace(/&amp;/g, "&").replace(/&#0?38;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&#8216;/g, "‘").replace(/&#8220;|&#8221;/g, "“").replace(/&#8211;/g, "–").replace(/&#8212;/g, "—").replace(/&hellip;|&#8230;/g, "…").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;|&#034;/g, '"').replace(/&#0?39;/g, "'");
const strip = h => dec((h || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const rel = u => { try { const x = new URL(u, BASE); return x.host === HOST ? x.pathname.replace(/\/+$/, "") : null; } catch { return null; } };
// Editorial tidy: remove em dashes and spaced en dashes, keep numeric ranges.
const tidy = s => s.replace(/\s*—\s*/g, ", ").replace(/(\D)\s+–\s+(\D)/g, "$1, $2").replace(/,\s*,/g, ",");

// 1. URL discovery: sitemaps + WordPress REST + homepage links
const discovered = new Map(); // pathname -> {url, src:Set}
const add = (u, src) => { const p = rel(u); if (p === null) return; const k = p || "/"; const e = discovered.get(k) || { url: new URL(u, BASE).href, src: new Set() }; e.src.add(src); discovered.set(k, e); };
const imagesFromSitemaps = new Set();
async function walkSitemap(u, depth = 0) {
  const xml = await text(u); if (!xml || depth > 3) return false;
  for (const m of xml.matchAll(/<image:loc>\s*([^<\s]+)\s*<\/image:loc>/g)) imagesFromSitemaps.add(dec(m[1]));
  for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) { const l = dec(m[1]); if (/\.xml(\?|$)/.test(l)) await walkSitemap(l, depth + 1); else add(l, "sitemap"); }
  return true;
}
for (const s of ["/sitemap_index.xml", "/wp-sitemap.xml", "/sitemap.xml", "/page-sitemap.xml", "/post-sitemap.xml"]) await walkSitemap(BASE + s);
add(BASE + "/", "home");
const homeHtml = await text(BASE + "/");
for (const m of homeHtml.matchAll(/href=["']([^"'#]+)["']/g)) add(dec(m[1]), "homepage-link");

async function wp(type) {
  const out = [];
  for (let page = 1; page < 200; page++) {
    const r = await get(`${BASE}/wp-json/wp/v2/${type}?per_page=100&page=${page}&_embed=1`);
    if (!r.ok) break; const j = await r.json().catch(() => null); if (!Array.isArray(j) || !j.length) break;
    out.push(...j); if (page >= (+r.headers.get("x-wp-totalpages") || 1)) break;
  }
  return out;
}
const types = (await (await get(BASE + "/wp-json/wp/v2/types")).json?.().catch(() => null)) || {};
const skip = new Set(["attachment", "nav_menu_item", "wp_block", "wp_template", "wp_template_part", "wp_navigation", "wp_font_family", "wp_font_face", "wp_global_styles", "elementor_library", "e-floating-buttons", "e-landing-page"]);
const restTypes = Object.values(types).filter(t => t.rest_base && !skip.has(t.slug)).map(t => t.rest_base);
if (!restTypes.length) restTypes.push("posts", "pages");
const items = []; // {kind, ...}
for (const t of restTypes) for (const x of await wp(t)) { items.push({ restType: t, x }); add(x.link, "rest:" + t); }
const cats = await wp("categories"), tags = await wp("tags"), media = await wp("media");
for (const c of [...cats, ...tags]) add(c.link, "rest:taxonomy");

// 2. Assets
const assetMap = {}; const failed = []; let queue = new Set();
const upl = u => { try { const x = new URL(u, BASE); return x.host === HOST && /\/wp-content\/uploads\//.test(x.pathname) ? x : null; } catch { return null; } };
const localOf = x => "/assets/migrated/" + decodeURIComponent(x.pathname.split("/wp-content/uploads/")[1]);
const want = u => { const x = upl(u); if (!x) return null; queue.add(x.href); return localOf(x); };
async function download(href) {
  const x = new URL(href); const dest = path.join("public", localOf(x)); if (existsSync(dest)) { assetMap[href] = localOf(x); return; }
  const full = href.replace(/-\d{2,4}x\d{2,4}(\.[a-z0-9]+)$/i, "$1");
  for (const u of full !== href ? [full, href] : [href]) {
    const r = await get(u); if (!r.ok) continue;
    await mkdir(path.dirname(dest), { recursive: true }); await writeFile(dest, Buffer.from(await r.arrayBuffer())); assetMap[href] = localOf(x); return;
  }
  failed.push(href);
}
async function pool(list, n, fn) { const it = [...list][Symbol.iterator](); await Promise.all(Array.from({ length: n }, async () => { for (let v = it.next(); !v.done; v = it.next()) await fn(v.value); })); }

// 3. HTML cleaning
const OK = new Set("h1 h2 h3 h4 h5 h6 p ul ol li a img figure figcaption blockquote strong b em i br hr table thead tbody tr th td".split(" "));
const attr = (a, n) => { const m = a.match(new RegExp(`(?:^|\\s)${n}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i")); return m ? dec(m[1] ?? m[2]) : ""; };
const esc = s => s.replace(/"/g, "&quot;").replace(/</g, "&lt;");
function bgImages(html) { return [...html.matchAll(/url\(\s*(?:&quot;|["']?)(https?:[^)"'&\s]*wp-content\/uploads[^)"'&\s]*)/g)].map(m => dec(m[1])); }
function collect(html) { for (const m of html.matchAll(/(?:src|data-src|data-lazy-src|href)=["']([^"']+)["']/g)) want(dec(m[1])); for (const b of bgImages(html)) want(b); }
function clean(html) {
  html = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style|noscript|svg|form|button|select|iframe|nav|header|footer)\b[\s\S]*?<\/\1>/gi, "");
  html = html.replace(/<\/?([a-z][a-z0-9]*)\b([^>]*)>/gi, (m, tag, a) => {
    tag = tag.toLowerCase(); if (!OK.has(tag)) return ""; if (m.startsWith("</")) return `</${tag}>`;
    let o = "<" + tag;
    if (tag === "a") { const h = attr(a, "href"); if (h) { const l = upl(h) ? localOf(upl(h)) : h.startsWith(BASE) ? (mapPath(rel(h)) ?? h) : h; o += ` href="${esc(l)}"` + (/^https?:/.test(l) ? ' target="_blank" rel="noopener noreferrer"' : ""); } }
    if (tag === "img") { const s = [attr(a, "data-lazy-src"), attr(a, "data-src"), attr(a, "src")].find(v => v && !v.startsWith("data:")); if (!s) return ""; o += ` src="${esc(upl(s) ? localOf(upl(s)) : s)}" alt="${esc(attr(a, "alt"))}" loading="lazy"`; }
    return o + (["br", "hr", "img"].includes(tag) ? " />" : ">");
  });
  return tidy(html.replace(/<(p|h[1-6]|li|a|strong|em|b|i)>\s*<\/\1>/g, "").replace(/\n\s*\n+/g, "\n").trim());
}
const imgsOf = h => [...h.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);

// 4. Build records
const classify = (p, kind) => kind === "posts" ? "blog-post" : p === "/" ? "home" : mapPath(p.slice(1)) === "/team" ? "team" : mapPath(p.slice(1)) === "/about" ? "about" : mapPath(p.slice(1)) === "/contact" ? "contact" : SERVICES.includes(p.slice(1)) ? "service" : p.slice(1) in { "david-kohn-architects": 1, "stiff-trevillions": 1, "ddc-higgins": 1, "st-modelling": 1, "stiff-trevillion-architects": 1, "higgins-im-cs": 1, "higgins-accreditation": 1 } ? "project" : "page";
const posts = [], pages = {}, redirects = [], inventory = [];
const tr = x => x._embedded?.["wp:term"]?.flat() || [];
for (const { restType, x } of items) {
  const p = rel(x.link) || "/"; const raw = x.content?.rendered || "";
  collect(raw); if (x.yoast_head_json?.og_image) for (const i of x.yoast_head_json.og_image) want(i.url);
  const feat = x._embedded?.["wp:featuredmedia"]?.[0]?.source_url; if (feat) want(feat);
  x.__raw = raw; x.__feat = feat; x.__p = p;
}
// logos & favicon (official brand files)
const brand = [["ddc-logo-header", "/wp-content/uploads/2024/06/logoVector-Smart-Object.png"], ["ddc-logo-footer", "/wp-content/uploads/2024/02/Vector-Smart-Object.png"], ["ddc-logo-white", "/wp-content/uploads/2023/10/DDC-Logo-White-02.png"], ["ddc-favicon", "/wp-content/uploads/2023/12/cropped-Untitled-10-180x180-1.png"]];
for (const m of homeHtml.matchAll(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/g)) brand.push(["ddc-favicon-detected", m[1]]);
await mkdir("public/assets/brand", { recursive: true });
for (const [name, p] of brand) { const u = p.startsWith("http") ? p : BASE + p; const r = await get(u); if (r.ok) { await writeFile(`public/assets/brand/${name}${path.extname(new URL(u).pathname) || ".png"}`, Buffer.from(await r.arrayBuffer())); } else failed.push(u); }
for (const m of media) if (m.source_url) want(m.source_url);
for (const u of imagesFromSitemaps) want(u);
for (const b of bgImages(homeHtml)) want(b); collect(homeHtml);
console.log(`Downloading ${queue.size} assets...`); await pool(queue, 6, download);
const L = u => (u && assetMap[upl(u)?.href]) || (u && upl(u) ? localOf(upl(u)) : u);

for (const { restType, x } of items) {
  const p = x.__p, html = clean(x.__raw); const title = tidy(strip(x.title?.rendered || ""));
  const type = classify(p, restType);
  if (restType === "posts") {
    const terms = tr(x); posts.push({ id: x.id, slug: x.slug, path: p, title, date: x.date_gmt || x.date, modified: x.modified_gmt || x.modified, author: x._embedded?.author?.[0]?.name || "", excerpt: tidy(strip(x.excerpt?.rendered || "")).slice(0, 300), html,
      cats: terms.filter(t => t.taxonomy === "category").map(t => ({ slug: t.slug, name: t.name })), tags: terms.filter(t => t.taxonomy === "post_tag").map(t => ({ slug: t.slug, name: t.name })), featured: L(x.__feat) || null, images: imgsOf(html) });
    const to = "/blog/" + x.slug; inventory.push({ url: x.link, type, title, newPath: to, status: "migrated" }); redirects.push({ from: p, to });
  } else {
    const key = p.replace(/^\//, "") || "home"; const mapped = mapPath(key);
    pages[key] = { slug: key, path: p, title, html, date: x.date_gmt || x.date, modified: x.modified_gmt || x.modified, parent: x.parent || 0, featured: L(x.__feat) || null, images: [...new Set([L(x.__feat), ...imgsOf(html), ...bgImages(x.__raw).map(L)].filter(Boolean))], type, resources: [...x.__raw.matchAll(/href=["']([^"']+\.(?:pdf|docx?|xlsx?|zip))["']/gi)].map(m => L(dec(m[1]))) };
    const to = mapped || "/p/" + key; inventory.push({ url: x.link, type, title, newPath: to, status: "migrated" }); if (!mapped) redirects.push({ from: p, to });
  }
}
// URLs seen but without REST content
const have = new Set(inventory.map(i => rel(i.url) || "/"));
for (const [p, e] of discovered) if (!have.has(p)) {
  const kind = /\/(category|tag)\//.test(p) ? "taxonomy" : /\/author\//.test(p) ? "author-archive" : /\.(pdf|docx?|xlsx?|zip)$/i.test(p) ? "resource" : /^\/(feed|wp-|xmlrpc)/.test(p) || /\/feed$/.test(p) ? "system" : /\/page\/\d+$/.test(p) ? "pagination" : "page";
  const mp = p === "/" ? "/" : mapPath(p.slice(1)); const cat = p.match(/\/category\/([^/]+)/);
  inventory.push({ url: e.url, type: kind, title: "", newPath: mp || (cat ? "/blog?category=" + cat[1] : kind === "pagination" ? "/blog" : kind === "system" || kind === "author-archive" ? null : null), status: mp || cat || kind === "pagination" ? "migrated" : kind === "system" ? "not applicable" : "missing content (not exposed via REST)" });
  if (cat) redirects.push({ from: p, to: "/blog?category=" + cat[1] });
}
const resources = [...new Set(Object.values(pages).flatMap(p => p.resources))].map(u => ({ url: u, title: path.basename(u) }));
await mkdir("content", { recursive: true });
const W = (f, d) => writeFile("content/" + f, JSON.stringify(d, null, 1));
await W("posts.json", posts.sort((a, b) => b.date.localeCompare(a.date))); await W("pages.json", pages); await W("taxonomy.json", { categories: cats.map(c => ({ slug: c.slug, name: c.name, count: c.count })), tags: tags.map(c => ({ slug: c.slug, name: c.name, count: c.count })) });
await W("resources.json", resources); await W("redirects.json", redirects); await W("inventory.json", inventory); await W("assets.json", assetMap);
const by = k => inventory.filter(i => i.type === k).length, miss = inventory.filter(i => i.status.startsWith("missing"));
const md = `# Migration report\nSource: ${BASE}\n\n| Metric | Count |\n|---|---|\n| Original URLs discovered | ${inventory.length} |\n| Blog posts migrated | ${posts.length} |\n| Pages migrated | ${Object.keys(pages).length} |\n| Services | ${by("service")} |\n| Projects | ${by("project")} |\n| Categories / tags | ${cats.length} / ${tags.length} |\n| Downloadable resources | ${resources.length} |\n| Assets downloaded | ${Object.keys(assetMap).length} |\n| Failed downloads | ${failed.length} |\n| URLs without recoverable content | ${miss.length} |\n\n## URL mapping\n| Original website | New website | Type | Status |\n|---|---|---|---|\n${inventory.map(i => `| ${i.url} | ${i.newPath ?? ""} | ${i.type} | ${i.status} |`).join("\n")}\n\n## Failed downloads\n${failed.map(f => "- " + f).join("\n") || "None"}\n`;
await writeFile("MIGRATION_REPORT.md", md); console.log(md.split("## URL mapping")[0]);
