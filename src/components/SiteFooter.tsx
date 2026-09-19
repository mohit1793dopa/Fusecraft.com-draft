import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { brand, navLinks } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-moss text-sand">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:px-8 md:py-20">
        <div>
          <BrandLogo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-almond/80">
            Detail design and manufacturing for the in-betweens of architectural
            work. {brand.tagline}
          </p>
          <p className="mt-4 text-sm text-sand/70">
            Est. {brand.est} · {brand.location}
          </p>
        </div>

        <div>
          <p className="eyebrow text-almond/45">Navigate</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-sand/90 transition-colors hover:text-almond"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-almond/45">Studio</p>
          <p className="mt-5 text-sm leading-relaxed text-sand/90">
            {brand.location}
            <br />
            <a
              href={`mailto:${brand.email}`}
              className="mt-2 inline-block text-almond underline decoration-chestnut/50 underline-offset-4 transition-colors hover:text-cream"
            >
              {brand.email}
            </a>
          </p>
          <Link
            href="/contact"
            className="btn-ghost mt-8 text-almond hover:text-cream"
          >
            Start a conversation →
          </Link>
        </div>
      </div>

      {/* End mark — official Stamp logo */}
      <div className="border-t border-white/10 px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6">
          <BrandLogo
            variant="stamp"
            tone="light"
            href={null}
            className="h-20 w-20 opacity-90 transition-opacity duration-500 hover:opacity-100 md:h-24 md:w-24"
          />
          <div className="flex w-full flex-col items-center justify-between gap-3 text-center text-xs tracking-wide text-almond/40 sm:flex-row sm:text-left">
            <p>© {new Date().getFullYear()} Fusecrafts. All rights reserved.</p>
            <p>
              {brand.location} · Detail design & manufacturing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
