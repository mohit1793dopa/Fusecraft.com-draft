"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { collaborators } from "@/data/site";

export function CollaboratorsBand() {
  const reduce = useReducedMotion();
  const loop = [...collaborators, ...collaborators];

  return (
    <section className="bg-sand py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-mocha">Collaborators</p>
              <h2 className="type-headline mt-2 max-w-xl text-2xl md:text-3xl lg:text-4xl">
                Studios who share the standard.
              </h2>
            </div>
            <p className="type-annotation max-w-sm md:text-right">
              Architects, interior designers, and agencies we enter early with.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-sand via-sand/80 to-transparent md:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-sand via-sand/80 to-transparent md:w-24"
        />

        <div
          className={
            reduce
              ? "no-scrollbar flex gap-3 overflow-x-auto px-5 md:gap-4 md:px-8"
              : "collab-marquee flex w-max gap-3 md:gap-4"
          }
        >
          {(reduce ? collaborators : loop).map((studio, i) => (
            <article
              key={`${studio.name}-${i}`}
              className="group w-[200px] shrink-0 overflow-hidden bg-cream sm:w-[220px] md:w-[240px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-almond">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  sizes="240px"
                  quality={70}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-3.5 py-3.5 md:px-4 md:py-4">
                <p className="text-[0.58rem] tracking-[0.16em] text-mocha/50 uppercase">
                  {studio.role}
                </p>
                <h3 className="mt-1 font-display text-base font-medium text-ink md:text-lg">
                  {studio.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
