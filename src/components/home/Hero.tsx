"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "@/components/BrandLogo";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { brand } from "@/data/site";

/** Studio photography — portrait 3:4 crops from /public/images/hero */
const STREAM_IMAGES = [
  { src: "/images/hero/hero-01.jpg", alt: "Fusecrafts detail" },
  { src: "/images/hero/hero-02.jpg", alt: "Fusecrafts interior" },
  { src: "/images/hero/hero-03.jpg", alt: "Fusecrafts piece" },
  { src: "/images/hero/hero-04.jpg", alt: "Fusecrafts detail work" },
  { src: "/images/hero/hero-05.jpg", alt: "Fusecrafts craft detail" },
  { src: "/images/hero/hero-06.jpg", alt: "Fusecrafts furniture" },
  { src: "/images/hero/hero-07.jpg", alt: "Fusecrafts seating" },
  { src: "/images/hero/hero-08.jpg", alt: "Fusecrafts room" },
  { src: "/images/hero/hero-09.jpg", alt: "Fusecrafts joinery" },
  { src: "/images/hero/hero-10.jpg", alt: "Fusecrafts study" },
  { src: "/images/hero/hero-11.jpg", alt: "Fusecrafts material" },
  { src: "/images/hero/hero-12.jpg", alt: "Fusecrafts workshop" },
  { src: "/images/hero/hero-13.jpg", alt: "Fusecrafts project" },
  { src: "/images/hero/hero-14.jpg", alt: "Fusecrafts finish" },
  { src: "/images/hero/hero-15.jpg", alt: "Fusecrafts space" },
  { src: "/images/hero/hero-16.jpg", alt: "Fusecrafts composition" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <ImageStreamHero
      images={STREAM_IMAGES}
      cards={9}
      speed={22}
      axis={52}
      className="min-h-[100svh] w-full bg-cream-soft"
      path={{
        cardWidth: 15,
        cardHeight: 22,
        cardRadius: 0.5,
        birthHeight: 2.3,
        exitHeight: 44,
        railExit: 40,
      }}
    >
      <h1 className="sr-only">{brand.name}</h1>

      {/* Center glass disc — stamp sits in the vanishing point of the corridor */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full border border-white/70 bg-white/45 shadow-[0_8px_40px_rgba(29,30,18,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl md:h-[9.5rem] md:w-[9.5rem]"
          style={{ marginTop: "2%" }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/55 via-transparent to-almond/20"
          />
          <BrandLogo
            variant="stamp"
            tone="dark"
            href={null}
            priority
            className="relative z-10 h-[4.75rem] w-[4.75rem] object-center md:h-[6rem] md:w-[6rem]"
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end px-5 pb-16 text-center md:px-8 md:pb-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-xl flex-col items-center gap-6"
        >
          <p className="font-display text-[clamp(1.15rem,2.4vw,1.45rem)] font-medium leading-snug tracking-tight text-ink">
            {brand.tagline} We enter early, fuse materials, and make what we
            draw.
          </p>
          <Link href="/work" className="btn-subtle">
            <span>Selected work</span>
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </ImageStreamHero>
  );
}
