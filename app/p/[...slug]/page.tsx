
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { genericPages, getPage, resources } from "@/lib/content";
import { Eyebrow, Photo, Prose, CTA } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return genericPages().map((page) => ({
    slug: page.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug.join("/"));

  return page ? { title: page.title } : {};
}

export default async function Generic({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = getPage(slug.join("/"));

  if (!page) notFound();

  const docs = resources().filter((resource) =>
    page.resources.includes(resource.url)
  );

  return (
    <>
      <header className="wrap max-w-4xl pb-10 pt-14 md:pt-24">
        <Eyebrow>DDC Solutions</Eyebrow>
        <h1 className="display text-[clamp(2.2rem,5vw,4.4rem)]">
          {page.title}
        </h1>
      </header>

      {(page.featured ?? page.images[0]) && (
        <div className="wrap">
          <Photo
            src={page.featured ?? page.images[0]}
            alt=""
            ratio="aspect-[16/9] md:aspect-[21/9]"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <div className="wrap py-14">
        <Prose html={page.html} />

        {docs.length > 0 && (
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {docs.map((doc) => (
              <li key={doc.url}>
                <a href={doc.url} download className="block py-4 link-u">
                  Download: {doc.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <section className="on-dark bg-ink py-16 text-paper">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="display text-3xl">Talk to DDC Solutions.</p>
          <CTA />
        </div>
      </section>
    </>
  );
}
