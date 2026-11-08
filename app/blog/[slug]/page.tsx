
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { migratedPosts, fmtDate } from "@/lib/content";
import { Eyebrow, Photo, Prose, CTA } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return migratedPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = migratedPosts().find((item) => item.slug === slug);

  return post
    ? {
        title: post.title,
        description: post.excerpt || undefined,
        openGraph: {
          type: "article",
          publishedTime: post.date,
        },
      }
    : {};
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = migratedPosts();
  const index = all.findIndex((post) => post.slug === slug);

  if (index < 0) notFound();

  const post = all[index];
  const newer = all[index - 1];
  const older = all[index + 1];
  const categories = post.cats.map((category) => category.slug);

  const related = all
    .filter(
      (item) =>
        item.slug !== slug &&
        item.cats.some((category) => categories.includes(category.slug))
    )
    .slice(0, 3);

  return (
    <article>
      <header className="wrap max-w-4xl pb-10 pt-14 md:pt-24">
        <Eyebrow>
          {post.cats.map((category) => category.name).join(", ") || "Insights"}
        </Eyebrow>

        <h1 className="display text-[clamp(2.1rem,4.8vw,4.2rem)]">
          {post.title}
        </h1>

        <p className="mt-5 text-sm text-stone">
          {fmtDate(post.date)}
          {post.author ? `, ${post.author}` : ""}
        </p>
      </header>

      {post.featured && (
        <div className="wrap">
          <Photo
            src={post.featured}
            alt=""
            ratio="aspect-[16/9] md:aspect-[21/9]"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <div className="wrap py-14">
        <Prose html={post.html ?? ""} />
      </div>

      <nav
        aria-label="More articles"
        className="wrap grid gap-6 border-t border-line py-10 md:grid-cols-2"
      >
        {newer ? (
          <Link href={`/blog/${newer.slug}`} className="link-u">
            <span className="block text-sm text-stone">Newer</span>
            <span className="display text-xl">{newer.title}</span>
          </Link>
        ) : (
          <span />
        )}

        {older && (
          <Link href={`/blog/${older.slug}`} className="md:text-right">
            <span className="block text-sm text-stone">Older</span>
            <span className="display text-xl">{older.title}</span>
          </Link>
        )}
      </nav>

      {related.length > 0 && (
        <section className="wrap border-t border-line py-14">
          <h2 className="eyebrow">Related articles</h2>
          <ul className="divide-y divide-line border-y border-line">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="block py-5 display text-2xl"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="on-dark bg-ink py-16 text-paper">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="display text-3xl">Talk to DDC Solutions.</p>
          <CTA />
        </div>
      </section>
    </article>
  );
}
