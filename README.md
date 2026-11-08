# DDC Solutions: Architectural Luxury redesign (v3)
Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion for React.

## 1. Run
    npm install
    npm run migrate     # ONE-TIME, needs internet: imports the full original site (see below)
    npm run dev         # http://localhost:3000
    npm run build && npm start

## 2. Content migration (`npm run migrate`)
The build sandbox could not reach ddcsolutions.co.uk, so the complete crawl has to be run once on a connected machine. `scripts/migrate.mjs` (Node 18+, no dependencies):
- discovers every URL from the XML sitemaps, the WordPress REST API (all post types, paginated), and homepage links;
- imports **every** blog post with full content, date, author, categories, tags and featured image; every page; and all taxonomy;
- downloads all `wp-content/uploads` images and PDFs referenced anywhere (content, featured images, CSS backgrounds, media library) into `public/assets/migrated/`, preferring full-size originals;
- downloads the official logos and favicon into `public/assets/brand/`;
- cleans the HTML to a safe allow-list, rewrites image and internal links, and removes em dashes;
- writes `content/*.json`, `content/redirects.json` (original URL to new URL) and **`MIGRATION_REPORT.md`** with the URL-by-URL table, counts, and anything it could not recover.

The site reads `content/*.json` automatically. Before you run it, the blog shows a short interim list and logos/images load from the original site; afterwards everything is local. Original blog URLs (`/some-post/`) redirect to `/blog/some-post`; other pages not in the new structure render at `/p/<slug>`; category archives redirect to `/blog?category=<slug>`.
The script was tested against a mock WordPress server (sitemap index, REST pagination, embedded media, CSS background images, PDFs, redirects). It has not been run against the live site.

## 3. Brand
Logo and favicon: the official files from the original site (header logo for the ivory header, white logo for the dark footer). Their exact variants could not be viewed in the sandbox, so confirm they look right and swap in `public/assets/brand/ddc-logo-header.*` or `ddc-logo-white.*` if needed.

## 4. Contact form
`/api/contact` sends through Resend only when `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` are set. Otherwise it returns 503 and the form uses a mailto link. Success is only shown on a real 2xx.

## 5. Needs company approval
- Hero headline "Better BIM. Smarter Project Delivery." and rewritten intro wording (original meaning kept).
- Hero and approach images are original-site images (`lib/assets.ts`: HERO, APPROACH) chosen without being able to view them; replace with preferred photography.
- "100% compliance alignment" and "Clash Free Guarantee" are the company's own claims, retained as published.
- Clash Detection, Revit Modeling and Scan to BIM descriptions are adapted from homepage wording until the migration brings in the full service pages.

## 6. Cinematic scroll experiences (homepage)
All built with Motion for React (`useScroll`/`useTransform`), sticky sections and inline SVG. No new dependencies. Code: `components/scroll/`.
| Section | File | Behaviour |
|---|---|---|
| Hero: BIM to reality | `bim-hero.tsx`, `building.tsx` | Wireframe (drawn on load) -> massing -> visualisation via two masked wipes with scan lines and a slow camera push |
| Exploded model | `exploded.tsx` | Isometric model separates into structure, mechanical, electrical, architecture, then reassembles. Legend highlights a layer |
| Clash detection | `clash.tsx` | Overlap -> conflict highlighted -> duct rerouted -> resolved. Labelled as illustrative |
| Services | `services-explorer.tsx` | Hover/tap a service to draw its technical diagram; real service image inset where available |
| Projects | `project-story.tsx` | Sticky desktop story with masked image reveals and parallax; stacked reveal layout on mobile and reduced motion |
| Workflow | `workflow.tsx` | Concept, BIM Modelling, Coordination, Project Delivery with a distinct visual per stage |
Rules followed: sticky sections are inside normal-height scroll containers (no scroll hijacking), `prefers-reduced-motion` freezes progress and removes the tall sticky containers, mobile has its own compositions (stacked text/graphic, zoomed crops), and all graphics are marked illustrative.
Project imagery in the story comes from the migrated case-study pages (`npm run migrate`); until then it shows clearly labelled placeholders. To use a licensed photograph instead of the drawn visualisation, replace the `<Render />` layer in `bim-hero.tsx` with a `<Photo />`.
