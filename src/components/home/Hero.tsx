"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "@/components/BrandLogo";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { brand } from "@/data/site";

/** Studio photography — portrait crops from /public/images/hero (h1–h10) */
const STREAM_IMAGES = [
  { src: "/images/hero/h1.jpg", alt: "" },
  { src: "/images/hero/h2.jpg", alt: "" },
  { src: "/images/hero/h3.jpg", alt: "" },
  { src: "/images/hero/h4.jpg", alt: "" },
  { src: "/images/hero/h5.jpg", alt: "" },
  { src: "/images/hero/h6.jpg", alt: "" },
  { src: "/images/hero/h7.jpg", alt: "" },
  { src: "/images/hero/h8.jpg", alt: "" },
  { src: "/images/hero/h9.jpg", alt: "" },
  { src: "/images/hero/h10.jpg", alt: "" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <ImageStreamHero
      images={STREAM_IMAGES}
      cards={STREAM_IMAGES.length}
      speed={32}
      axis={52}
      className="min-h-[100svh] w-full bg-cream-soft"
      path={{
        cardWidth: 15,
        cardHeight: 22,
        cardRadius: 0.5,
        birthHeight: 2.3,
        exitHeight: 42,
        railExit: 38,
        fan: 2.8,
        turnExit: 22,
        stops: 56,
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
