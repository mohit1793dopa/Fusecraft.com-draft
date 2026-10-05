"use client";

import { pressBrands } from "@/data/site";

function PressLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex h-12 shrink-0 items-center opacity-80 transition-opacity duration-300 hover:opacity-100 md:h-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={name}
        width={220}
        height={56}
        loading="lazy"
        decoding="async"
        className="h-9 w-auto max-w-[200px] object-contain object-left mix-blend-screen md:h-11 md:max-w-[240px]"
      />
    </div>
  );
}

export function PressStrip() {
  const row = [...pressBrands, ...pressBrands];

  return (
    <section className="overflow-hidden bg-moss-ink py-11 md:py-14">
      <p className="mb-8 text-center text-[0.65rem] tracking-[0.22em] text-sand/45 uppercase">
        Featured in
      </p>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-moss-ink via-moss-ink/85 to-transparent md:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-moss-ink via-moss-ink/85 to-transparent md:w-32"
        />

        <div className="press-marquee flex w-max items-center gap-12 md:gap-16">
          {row.map((brand, i) => (
            <PressLogo
              key={`${brand.name}-${i}`}
              name={brand.name}
              logo={brand.logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
