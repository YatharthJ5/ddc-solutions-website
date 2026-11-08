import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { withBasePath } from "@/lib/paths";

const aboutMarks = [
  {
    src: "/images/achievements/elite-business-100-2022.png",
    width: 457,
    height: 85,
    alt: "Elite Business 100 Top SME Businesses 2022, winner of Rising Star of the Year Award",
    title: "Elite Business 100 Â· Top SME 2022",
    detail: "Winner Â· Rising Star of the Year Award",
  },
  {
    src: "/images/achievements/safe-supplier.png",
    width: 275,
    height: 59,
    alt: "SafeSupplier logo",
    title: "SafeSupplier",
    detail: "DDC achievement mark",
  },
];

const caseStudyMarks = [
  {
    src: "/images/achievements/award-ddc.webp",
    width: 1515,
    height: 280,
    alt: "Elite Business 100 Top SME Businesses 2024, winner of Rising Star of the Year Award",
    title: "Elite Business 100 Â· Top SME 2024",
    detail: "Winner Â· Rising Star of the Year Award",
  },
  {
    src: "/images/achievements/safe-supplier-badge.png",
    width: 1600,
    height: 344,
    alt: "SafeSupplier badge",
    title: "SafeSupplier",
    detail: "DDC achievement mark",
  },
];

function Marks({ compact = false, caseStudy = false }: { compact?: boolean; caseStudy?: boolean }) {
  const marks = caseStudy ? caseStudyMarks : aboutMarks;
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${compact ? "" : "md:gap-6"}`}>
      {marks.map((mark, i) => (
        <li key={mark.src}>
          <Reveal delay={i * 0.08} className={`h-full border border-line bg-paper2 ${compact ? "p-4 md:p-5" : "p-6 md:p-9"}`}>
            <div className={`flex h-full flex-col justify-between ${compact ? "gap-3" : "gap-6"}`}>
              <Image
                src={withBasePath(mark.src)}
                alt={mark.alt}
                width={mark.width}
                height={mark.height}
                sizes={compact ? "(min-width:768px) 25vw, 42vw" : "(min-width:768px) 40vw, 85vw"}
                className={`w-full object-contain object-left ${compact ? "max-h-12" : "max-h-20"}`}
              />
              <div>
                <h3 className={`display ${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"}`}>{mark.title}</h3>
                <p className="mt-1 text-sm text-stone">{mark.detail}</p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function AboutAchievements() {
  return (
    <section aria-labelledby="about-achievements" className="border-y border-line bg-paper2 py-20 md:py-28">
      <div className="wrap">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">Recognition</p>
            <h2 id="about-achievements" className="display text-4xl md:text-5xl">Our Achievements</h2>
          </div>
          <p className="text-sm text-mute md:col-span-4 md:col-start-9">
            Recognition and supplier marks shown on the original DDC Solutions About page.
          </p>
        </div>
        <Marks />
      </div>
    </section>
  );
}

export function ProjectAchievements() {
  return (
    <section aria-labelledby="project-achievements" className="border-y border-line bg-paper2 py-16 md:py-20">
      <div className="wrap">
        <h2 id="project-achievements" className="eyebrow mb-6">Our Achievements</h2>
        <Marks caseStudy />
      </div>
    </section>
  );
}

export function AchievementsPreview() {
  return (
    <section aria-labelledby="achievements-preview" className="border-y border-line bg-paper2 py-12 md:py-16">
      <div className="wrap grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4">
          <p className="eyebrow">Recognition</p>
          <h2 id="achievements-preview" className="display text-3xl md:text-4xl">Our Achievements</h2>
          <Link href="/about" className="link-u mt-4 inline-block text-sm">Discover more about DDC â†’</Link>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Marks compact />
        </div>
      </div>
    </section>
  );
}


