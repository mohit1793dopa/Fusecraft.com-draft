"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { MorphGallery } from "@/components/ui/morph-gallery";
import { showcaseSlides } from "@/data/site";

const AUTO_MS = 4500;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

const copyVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.2,
    },
  },
  leave: {
    opacity: 0,
    transition: { duration: 0.22, ease: EASE_INOUT },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export function RoomGrid() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = showcaseSlides[index];
  const featuredIn =
    "featuredIn" in slide ? slide.featuredIn : undefined;

  const items = useMemo(
    () =>
      showcaseSlides.map((s) => ({
        src: s.image,
        thumb: s.image,
        alt: s.title,
      })),
    [],
  );

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + showcaseSlides.length) % showcaseSlides.length);
    },
    [],
  );

  return (
    <section className="bg-moss-ink px-5 pb-8 pt-2 md:px-8 md:pb-10 md:pt-4">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative aspect-[16/9] max-h-[600px] min-h-[320px] w-full overflow-hidden rounded-[24px] bg-moss-deep md:min-h-[420px]">
          <MorphGallery
            items={items}
            autoplay={reduce ? false : AUTO_MS}
            index={index}
            onIndexChange={setIndex}
            showArrows={false}
            className="absolute inset-0"
          />

          {/* Gradients + copy sit above the morph canvas */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-moss-ink/78 via-moss-ink/25 to-transparent md:from-moss-ink/68" />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-moss-ink/72 via-transparent to-moss-ink/10" />

          <AnimatePresence mode="wait">
            {featuredIn ? (
              <motion.div
                key={`featured-${slide.image}`}
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="pointer-events-none absolute top-4 right-4 z-[3] flex flex-col items-end gap-1.5 md:top-6 md:right-6"
              >
                <p className="text-[0.58rem] tracking-[0.18em] text-sand/55 uppercase">
                  Featured in
                </p>
                <div className="relative h-10 w-[7.5rem] md:h-12 md:w-36">
                  <Image
                    src={featuredIn.logo}
                    alt={featuredIn.name}
                    fill
                    sizes="144px"
                    className="object-contain object-right mix-blend-screen"
                    unoptimized
                  />
                </div>
              </motion.div>
            ) : null}

            <motion.div
              key={slide.image}
              variants={reduce ? undefined : copyVariants}
              initial={reduce ? false : "hidden"}
              animate="show"
              exit="leave"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex flex-col items-start p-6 md:max-w-xl md:p-10 lg:max-w-2xl lg:p-12"
            >
              <motion.p
                variants={lineVariants}
                className="text-[0.65rem] font-medium tracking-[0.18em] text-sand/50 uppercase"
              >
                {slide.tags.join(" · ")}
              </motion.p>

              <motion.h2
                variants={lineVariants}
                className="mt-3 font-display text-2xl font-medium tracking-[0.02em] text-sand md:mt-4 md:text-3xl lg:text-[2.35rem]"
              >
                <Link
                  href={slide.primary.href}
                  className="pointer-events-auto transition hover:text-almond"
                >
                  {slide.title}
                </Link>
              </motion.h2>

              <motion.p
                variants={lineVariants}
                className="mt-2 max-w-sm text-sm leading-relaxed text-sand/65 md:mt-3 md:text-[0.95rem]"
              >
                {slide.blurb}
              </motion.p>

              <motion.div
                variants={lineVariants}
                className="pointer-events-auto mt-5 flex flex-wrap items-center gap-4 md:mt-6"
              >
                <Link
                  href={slide.primary.href}
                  className="btn-subtle !border-sand/40 !px-5 !py-2.5 !text-[0.65rem] !text-sand hover:!border-sand hover:!bg-sand hover:!text-ink"
                >
                  <span>{slide.primary.label}</span>
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href={slide.secondary.href}
                  className="btn-ghost link-underline text-sand/80"
                >
                  {slide.secondary.label} ›
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Extra hit targets in case canvas captures pointers oddly */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-sand/15 text-xl text-sand backdrop-blur-sm transition hover:scale-105 hover:bg-sand/25 active:scale-95 md:left-5"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-sand/15 text-xl text-sand backdrop-blur-sm transition hover:scale-105 hover:bg-sand/25 active:scale-95 md:right-5"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
