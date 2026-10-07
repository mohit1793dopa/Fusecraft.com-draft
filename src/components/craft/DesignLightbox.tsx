"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  SqueezeCarousel,
  type SqueezeSlide,
} from "@/components/ui/carousel-squeeze";

type DesignLightboxProps = {
  open: boolean;
  title: string;
  subcategory?: string;
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

function useMaxCarouselHeight() {
  const [maxH, setMaxH] = useState(560);
  useEffect(() => {
    const update = () => setMaxH(Math.round(window.innerHeight * 0.68));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return maxH;
}

export function DesignLightbox({
  open,
  title,
  subcategory,
  images,
  index,
  onClose,
  onIndexChange,
}: DesignLightboxProps) {
  const reduce = useReducedMotion();
  const labelId = useId();
  const count = images.length;
  const current = images[index] ?? images[0];
  const closeRef = useRef<HTMLButtonElement>(null);
  const maxCarouselHeight = useMaxCarouselHeight();

  const slides: SqueezeSlide[] = useMemo(
    () =>
      images.map((src, i) => ({
        id: `${src}-${i}`,
        image: src,
        imageAlt: `${title} — view ${i + 1}`,
        overlay: (
          <span className="rounded-full bg-moss-ink/45 px-2.5 py-1 text-[0.62rem] tracking-[0.14em] text-sand/90 uppercase backdrop-blur-sm">
            {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        ),
      })),
    [images, title, count],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (count < 2) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onIndexChange((index + 1) % count);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onIndexChange((index - 1 + count) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, onIndexChange, index, count]);

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          className="fixed inset-0 z-[80] flex flex-col"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute inset-0 bg-[#0e0f0a]/92 backdrop-blur-md"
            onClick={onClose}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-[18%] z-[1] rounded-full bg-almond/10 blur-3xl"
          />

          <div className="relative z-20 flex items-start justify-between gap-4 px-5 pt-5 sm:px-10 sm:pt-7 md:px-14 md:pt-8 lg:px-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.35 }}
              className="min-w-0"
            >
              {subcategory ? (
                <p className="text-[0.62rem] tracking-[0.2em] text-almond/60 uppercase">
                  {subcategory}
                </p>
              ) : null}
              <h2
                id={labelId}
                className="mt-1.5 font-display text-[1.65rem] leading-tight font-medium tracking-tight text-sand sm:text-3xl md:text-[2.25rem]"
              >
                {title}
              </h2>
            </motion.div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-ink shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-almond"
              aria-label="Close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:rotate-90"
              >
                <path
                  d="M4.5 4.5l9 9M13.5 4.5l-9 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* More side padding; carousel sized to image ratio */}
          <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-6 pb-8 sm:px-12 sm:pb-10 md:px-20 lg:px-28">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="mx-auto w-full max-w-[920px]"
              onClick={(e) => e.stopPropagation()}
            >
              {count > 1 ? (
                <SqueezeCarousel
                  slides={slides}
                  activeIndex={index}
                  onActiveChange={onIndexChange}
                  fitToImage
                  maxHeight={maxCarouselHeight}
                  gap={12}
                  slatWidth={count >= 5 ? 40 : count >= 4 ? 48 : 56}
                  radius={10}
                  duration={800}
                  hoverGrow
                  autoplay={false}
                  controls
                />
              ) : (
                <div className="relative mx-auto flex max-h-[min(72vh,640px)] w-full items-center justify-center overflow-hidden rounded-[10px] bg-moss-ink/30 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current}
                    alt={title}
                    className="max-h-[min(72vh,640px)] w-auto max-w-full object-contain"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
