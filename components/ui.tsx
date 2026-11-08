
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { WA } from "@/lib/data";
import { addBasePathToHtml, withBasePath } from "@/lib/paths";

export const CTA = ({
  children = "Book a Consultation",
  variant = "",
}: {
  children?: React.ReactNode;
  variant?: string;
}) => (
  <a
    href={WA}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn ${variant}`}
  >
    {children}
    <ArrowUpRight size={16} aria-hidden />
    <span className="sr-only"> (opens WhatsApp in a new tab)</span>
  </a>
);

export const BtnLink = ({
  href,
  children,
  variant = "btn-line",
}: {
  href: string;
  children: React.ReactNode;
  variant?: string;
}) => (
  <Link href={href} className={`btn ${variant}`}>
    {children}
    <ArrowRight size={16} aria-hidden />
  </Link>
);

export const Eyebrow = ({
  children,
}: {
  children: React.ReactNode;
}) => <p className="eyebrow">{children}</p>;

export function Photo({
  src,
  alt,
  ratio = "aspect-[4/5]",
  sizes = "(min-width:1024px) 50vw, 100vw",
  priority = false,
  className = "",
  pos = "object-center",
  badge,
}: {
  src?: string | null;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  pos?: string;
  badge?: string;
}) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`Image unavailable: ${alt}`}
        className={`relative border border-line bg-paper2 ${ratio} ${className}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg,transparent 0 14px,#E5E3DE 14px 15px)",
        }}
      >
        {badge && (
          <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] bg-paper/95 px-2 py-1 text-[11px] leading-snug text-ink">
            {badge}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-line ${ratio} ${className}`}>
      <Image
        src={withBasePath(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        className={`object-cover ${pos}`}
      />
      {badge && (
        <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] bg-paper/95 px-2 py-1 text-[11px] leading-snug text-ink">
          {badge}
        </span>
      )}
    </div>
  );
}

export function ProjectPhoto({
  src,
  alt,
  illustrative = false,
  ...props
}: {
  src?: string | null;
  alt: string;
  illustrative?: boolean;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  pos?: string;
}) {
  return (
    <Photo
      src={src}
      alt={alt}
      {...props}
      badge={
        illustrative
          ? "Illustrative BIM visual · not project photography"
          : undefined
      }
    />
  );
}

export const Prose = ({ html }: { html: string }) => (
  <div
    className="prose-lux"
    dangerouslySetInnerHTML={{ __html: addBasePathToHtml(html) }}
  />
);
