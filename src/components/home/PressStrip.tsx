"use client";

import { useState } from "react";
import { pressBrands } from "@/data/site";

function PressLogo({
  name,
  domain,
  logo,
}: {
  name: string;
  domain: string;
  logo: string;
}) {
  const [src, setSrc] = useState(
    `https://logo.clearbit.com/${domain}?size=180`,
  );

  return (
    <div className="flex h-9 shrink-0 items-center opacity-75 transition-opacity duration-300 hover:opacity-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={160}
        height={36}
        loading="lazy"
        decoding="async"
        className="h-6 w-auto max-w-[170px] object-contain object-left brightness-0 invert md:h-7"
        onError={() => setSrc(logo)}
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

        <div className="press-marquee flex w-max items-center gap-14 md:gap-20">
          {row.map((brand, i) => (
            <PressLogo
              key={`${brand.name}-${i}`}
              name={brand.name}
              domain={brand.domain}
              logo={brand.logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
