import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Motion } from "@/components/motion";
import { contact, socials } from "@/lib/data";
import { brand } from "@/lib/assets";
import { withBasePath } from "@/lib/paths";
const site = process.env.NEXT_PUBLIC_SITE_URL || "https://ddcsolutions.co.uk";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Top BIM Consultants in UK - DDC Solutions", template: "%s | DDC Solutions" },
  description: "Bespoke BIM consultancy and dedicated modeling support tailored for UK firms. We work as part of your team to reduce overheads, remove technical bottlenecks and keep your pipeline moving.",
  icons: { icon: withBasePath(brand.favicon) },
  openGraph: { siteName: "DDC Solutions", type: "website", locale: "en_GB", images: ["https://ddcsolutions.co.uk/wp-content/uploads/2026/08/49.png"] },
  twitter: { card: "summary_large_image" },
};
const ld = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "DDC Solutions", url: site, telephone: contact.tel, email: contact.email,
  address: { "@type": "PostalAddress", streetAddress: "36 Scotts Road", addressLocality: "Bromley", postalCode: "BR1 3QD", addressCountry: "GB" }, sameAs: socials.map(s => s[1]) };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB"><body>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-ink focus:p-3 focus:text-paper">Skip to content</a>
      <Motion><Nav logo={brand.header} /><main id="main">{children}</main><Footer /></Motion>
    </body></html>
  );
}
