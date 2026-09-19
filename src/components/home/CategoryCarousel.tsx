"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { categories } from "@/data/site";

export function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const scrollTrack = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = Math.min(track.clientWidth * 0.55, 360);
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-cream px-5 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-mocha">Disciplines</p>
            <h2 className="type-headline mt-2 text-xl md:text-2xl">
              Browse by craft.
            </h2>
          </div>
          <p className="type-annotation max-w-xs md:text-right">
            Facade, furniture, light, joinery — the work we make.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-cream via-cream/85 to-transparent md:w-14"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-cream via-cream/85 to-transparent md:w-14"
          />

          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollTrack(-1)}
            className="absolute top-[38%] left-0 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-sand text-lg leading-none text-ink ring-1 ring-line transition hover:bg-almond md:left-1"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollTrack(1)}
            className="absolute top-[38%] right-0 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-sand text-lg leading-none text-ink ring-1 ring-line transition hover:bg-almond md:right-1"
          >
            ›
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-10 pb-1 md:gap-5 md:px-12"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="w-[96px] shrink-0 snap-start md:w-[108px]"
              >
                <Link
                  href={cat.href}
                  className="group flex w-full flex-col items-center"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-full bg-almond ring-1 ring-line">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="112px"
                      quality={70}
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2.5 text-center text-[0.62rem] tracking-[0.14em] text-mocha/70 uppercase transition-colors group-hover:text-ink md:text-[0.68rem]">
                    {cat.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
