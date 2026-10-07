"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import {
  PhantomImageTrail,
  type PhantomImage,
} from "@/components/ui/phantom-image-trail";

type Props = {
  title: string;
  eyebrow?: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  trailImages: PhantomImage[];
  hint?: string;
};

export function CraftInteractiveHero({
  title,
  eyebrow = "Collection",
  headline,
  subtext,
  ctaLabel,
  ctaHref,
  secondaryLabel = "‹ All collections",
  secondaryHref = "/#selected-work",
  trailImages,
  hint = "Move across the page — designs trail behind your cursor.",
}: Props) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-line bg-cream">
      {/* Soft base so trail reads on cream */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(230,204,178,0.35),transparent_68%)]"
      />

      {/* Copy — events pass through except CTAs */}
      <div className="pointer-events-none relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-6 pt-28 pb-24 text-center sm:px-8 md:pt-36 md:pb-28">
        <Reveal className="mx-auto flex w-full max-w-2xl flex-col items-center">
          <p className="eyebrow text-mocha">{eyebrow}</p>
          <p className="mt-3 text-[0.7rem] tracking-[0.2em] text-mocha/45 uppercase">
            {title}
          </p>
          <h1 className="type-headline mx-auto mt-3 max-w-[18ch] text-4xl leading-[1.08] md:text-5xl lg:text-[3.35rem]">
            {headline}
          </h1>
          <p className="type-body mx-auto mt-5 max-w-md text-base text-mocha/80 md:text-lg">
            {subtext}
          </p>

          <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={ctaHref} className="btn-primary">
              <span>{ctaLabel}</span>
              <span aria-hidden>→</span>
            </Link>
            {secondaryHref ? (
              <Link href={secondaryHref} className="btn-ghost text-chestnut">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </Reveal>
      </div>

      {/* Trail above copy so images show; listens on section via bindToParent */}
      <PhantomImageTrail
        images={trailImages}
        bindToParent
        className="absolute inset-0 z-30"
        imageMultiplier={2}
        enableRotation
        triggerDistance={58}
        popOutDuration={1.05}
        fadeOutDuration={0.72}
      >
        {/* Fade under header so nav stays clear */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-cream via-cream/70 to-transparent md:h-32"
        />
      </PhantomImageTrail>

      <p className="pointer-events-none absolute inset-x-0 bottom-6 z-40 px-6 text-center text-[0.65rem] tracking-[0.16em] text-mocha/40 uppercase md:bottom-8">
        {hint}
      </p>
    </section>
  );
}
