import type { Metadata } from "next";
import { SplitText } from "@/components/motion";
import { Eyebrow } from "@/components/ui";
import { BlogBrowser } from "@/components/blog-browser";
import { allPosts, hasArchive } from "@/lib/content";
export const metadata: Metadata = { title: "Insights", description: "Perspectives on technical standards, risk management and the future of digital asset delivery in the UK." };
export default function Blog() {
  const posts = allPosts().map(p => ({ slug: p.slug, title: p.title, date: p.date, excerpt: p.excerpt, cats: p.cats, href: p.external ?? `/blog/${p.slug}`, external: !!p.external }));
  return (<div className="wrap py-16 md:py-28"><Eyebrow>Insights</Eyebrow><SplitText as="h1" className="display text-[clamp(2.5rem,5.6vw,5.2rem)]" text="Blog" />
    <p className="mb-12 mt-6 max-w-xl text-lg text-mute">Perspectives on technical standards, risk management and the future of digital asset delivery in the UK.</p>
    {!hasArchive() && <p className="mb-8 border border-line bg-paper2 p-4 text-sm text-mute">Showing a short list of articles. Run the content migration (see README) to import the full archive with article pages, categories and images.</p>}
    <BlogBrowser posts={posts} /></div>);
}
