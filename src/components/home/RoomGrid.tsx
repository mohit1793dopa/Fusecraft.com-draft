"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { showcaseSlides } from "@/data/site";

const AUTO_MS = 7000;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? "10%" : "-10%",
    scale: 1.08,
    filter: "blur(10px)",
  }),
  center: {
    opacity: 1,
    x: "0%",
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? "-8%" : "8%",
    scale: 1.04,
    filter: "blur(6px)",
  }),
};

const copyVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.28,
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
  const [direction, setDirection] = useState(1);
  const [tick, setTick] = useState(0);
  const count = showcaseSlides.length;
  const slide = showcaseSlides[index];

  const go = useCallback(
    (dir: -1 | 1) => {
      setDirection(dir);
      setIndex((i) => (i + dir + count) % count);
      setTick((t) => t + 1);
    },
    [count],
  );

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [go, reduce, tick]);

  return (
    <section className="bg-moss-ink px-5 pb-8 pt-2 md:px-8 md:pb-10 md:pt-4">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative aspect-[16/9] max-h-[600px] min-h-[320px] w-full overflow-hidden rounded-[24px] bg-moss-deep md:min-h-[420px]">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={slide.image}
              custom={direction}
              variants={reduce ? undefined : slideVariants}
              initial={reduce ? false : "enter"}
              animate="center"
              exit={reduce ? undefined : "exit"}
              transition={{
                duration: 1.05,
                ease: EASE_OUT,
                opacity: { duration: 0.85, ease: EASE_INOUT },
                filter: { duration: 0.9, ease: EASE_INOUT },
              }}
              className="absolute inset-0 will-change-transform"
            >
              <motion.div
                className="absolute inset-0 origin-center"
                initial={
                  reduce
                    ? false
                    : {
                        scale: 1.02,
                        x: direction >= 0 ? "-1.5%" : "1.5%",
                      }
                }
                animate={
                  reduce
                    ? undefined
                    : {
                        scale: 1.1,
                        x: direction >= 0 ? "1.5%" : "-1.5%",
                      }
                }
                transition={{
                  duration: AUTO_MS / 1000,
                  ease: "linear",
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-r from-moss-ink/78 via-moss-ink/25 to-transparent md:from-moss-ink/68" />
              <div className="absolute inset-0 bg-gradient-to-t from-moss-ink/72 via-transparent to-moss-ink/10" />

              <motion.div
                key={`copy-${slide.image}`}
                variants={reduce ? undefined : copyVariants}
                initial={reduce ? false : "hidden"}
                animate="show"
                exit="leave"
                className="absolute inset-x-0 bottom-0 z-[1] flex flex-col items-start p-6 md:max-w-lg md:p-10 lg:p-12"
              >
                <motion.p
                  variants={lineVariants}
                  className="text-[0.65rem] font-medium tracking-[0.18em] text-sand/50 uppercase"
                >
                  {slide.tags.join(" · ")}
                </motion.p>

                <motion.h2
                  variants={lineVariants}
                  className="mt-3 font-display text-3xl font-medium tracking-[0.02em] text-sand md:mt-4 md:text-4xl lg:text-[2.75rem]"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  variants={lineVariants}
                  className="mt-2 max-w-sm text-sm leading-relaxed text-sand/65 md:mt-3 md:text-[0.95rem]"
                >
                  {slide.blurb}
                </motion.p>

                <motion.div
                  variants={lineVariants}
                  className="mt-5 flex flex-wrap items-center gap-4 md:mt-6"
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
            </motion.div>
          </AnimatePresence>

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
