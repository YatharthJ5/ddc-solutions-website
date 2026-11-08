export const dynamic = "force-static";

const base = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://yatharthj5.github.io/ddc-solutions-website"
).replace(/\/$/, "");

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}