"use client";

/**
 * Squeeze Carousel — accordion image strip
 * One expanded panel; the rest collapse into thin clickable slats.
 */

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type SqueezeSlide = {
  id: string;
  title?: string;
  description?: string;
  action?: string;
  overlay?: ReactNode;
  image: string;
  imageAlt?: string;
};

type SqueezeCarouselProps = {
  slides: SqueezeSlide[];
  label?: string;
  /** Fixed pixel height (ignored when fitToImage is true) */
  height?: number;
  /**
   * Size the track from the active image’s natural aspect ratio
   * so the open panel isn’t cropped.
   */
  fitToImage?: boolean;
  /** Max track height when fitToImage is on */
  maxHeight?: number;
  gap?: number;
  slatGap?: number;
  slatWidth?: number;
  radius?: number;
  duration?: number;
  hoverGrow?: boolean;
  autoplay?: boolean;
  interval?: number;
  controls?: boolean;
  className?: string;
  style?: CSSProperties;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
};

function loadNaturalSize(src: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () =>
      resolve({
        w: img.naturalWidth || 1,
        h: img.naturalHeight || 1,
      });
    img.onerror = () => resolve({ w: 4, h: 3 });
    img.src = src;
  });
}

export function SqueezeCarousel({
  slides,
  label,
  height: heightProp = 420,
  fitToImage = false,
  maxHeight = 640,
  gap = 10,
  slatWidth = 56,
  radius = 10,
  duration = 700,
  hoverGrow = true,
  autoplay = false,
  interval = 6000,
  controls = true,
  className,
  style,
  activeIndex: controlledIndex,
  onActiveChange,
}: SqueezeCarouselProps) {
  const labelId = useId();
  const [internal, setInternal] = useState(0);
  const active = controlledIndex ?? internal;
  const count = slides.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(heightProp);
  const [trackWidth, setTrackWidth] = useState<number | null>(null);
  const [ratios, setRatios] = useState<Record<string, number>>({});

  const setActive = useCallback(
    (index: number) => {
      const next = ((index % count) + count) % count;
      if (controlledIndex === undefined) setInternal(next);
      onActiveChange?.(next);
    },
    [count, controlledIndex, onActiveChange],
  );

  // Prefetch natural aspect ratios
  useEffect(() => {
    if (!fitToImage) return;
    let cancelled = false;
    void Promise.all(
      slides.map(async (s) => {
        const { w, h } = await loadNaturalSize(s.image);
        return [s.id, h / w] as const;
      }),
    ).then((entries) => {
      if (cancelled) return;
      setRatios(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, [slides, fitToImage]);

  // Size track from active image ratio + available width
  useLayoutEffect(() => {
    if (!fitToImage) {
      setTrackHeight(heightProp);
      setTrackWidth(null);
      return;
    }

    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const parent = el.parentElement;
      const available = parent?.clientWidth || el.clientWidth || 800;
      const slide = slides[active];
      const ratio = (slide && ratios[slide.id]) || 3 / 4; // default portrait-ish
      const slatsTotal =
        Math.max(0, count - 1) * slatWidth + Math.max(0, count - 1) * gap;
      const openW = Math.max(160, available - slatsTotal);
      let h = openW * ratio;
      let totalW = available;

      if (h > maxHeight) {
        h = maxHeight;
        const fittedOpen = h / ratio;
        totalW = fittedOpen + slatsTotal;
      }

      // Floor so short landscape shots don’t go tiny
      h = Math.max(h, 280);
      if (h > maxHeight) h = maxHeight;

      setTrackHeight(Math.round(h));
      setTrackWidth(Math.round(Math.min(totalW, available)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [
    fitToImage,
    heightProp,
    maxHeight,
    slides,
    active,
    ratios,
    count,
    slatWidth,
    gap,
  ]);

  useEffect(() => {
    if (!autoplay || count < 2) return;
    const id = window.setInterval(() => setActive(active + 1), interval);
    return () => window.clearInterval(id);
  }, [autoplay, interval, count, active, setActive]);

  if (count === 0) return null;

  const ease = `cubic-bezier(0.22, 1, 0.36, 1)`;
  const height = fitToImage ? trackHeight : heightProp;

  return (
    <div
      ref={rootRef}
      className={cn("w-full", fitToImage && "mx-auto", className)}
      style={{
        ...style,
        width: fitToImage && trackWidth != null ? trackWidth : undefined,
        maxWidth: "100%",
        transition: fitToImage
          ? `width ${duration}ms ${ease}, max-width ${duration}ms ${ease}`
          : undefined,
      }}
    >
      {label ? (
        <p
          id={labelId}
          className="mb-4 text-[0.65rem] tracking-[0.18em] text-sand/50 uppercase"
        >
          {label}
        </p>
      ) : null}

      <div
        role="listbox"
        aria-labelledby={label ? labelId : undefined}
        aria-label={label || "Image gallery"}
        tabIndex={0}
        className="flex w-full outline-none"
        style={{
          height,
          gap,
          transition: fitToImage ? `height ${duration}ms ${ease}` : undefined,
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            setActive(active + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            setActive(active - 1);
          }
        }}
      >
        {slides.map((slide, i) => {
          const isOpen = i === active;
          return (
            <button
              key={slide.id}
              type="button"
              role="option"
              aria-selected={isOpen}
              aria-label={slide.imageAlt || slide.title || `View ${i + 1}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => {
                if (hoverGrow && !isOpen) setActive(i);
              }}
              className="group relative h-full min-w-0 overflow-hidden bg-moss-ink/40 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-almond"
              style={{
                flexGrow: isOpen ? 1 : 0,
                flexShrink: isOpen ? 1 : 0,
                flexBasis: isOpen ? "0%" : slatWidth,
                width: isOpen ? undefined : slatWidth,
                borderRadius: radius,
                transition: `flex-grow ${duration}ms ${ease}, flex-basis ${duration}ms ${ease}, width ${duration}ms ${ease}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={slide.imageAlt || ""}
                draggable={false}
                className={cn(
                  "absolute inset-0 h-full w-full transition-transform duration-700",
                  // Open panel: contain so nothing is cut; slats stay cover for texture
                  isOpen ? "object-contain scale-100" : "object-cover scale-110",
                )}
              />

              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 bg-moss-ink/40 transition-opacity duration-500",
                  isOpen ? "opacity-0" : "opacity-100",
                )}
              />

              {isOpen ? (
                <>
                  {slide.overlay ? (
                    <div className="absolute top-3 left-3 z-10 md:top-4 md:left-4">
                      {slide.overlay}
                    </div>
                  ) : null}
                  {(slide.title || slide.description) && (
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-moss-ink/70 to-transparent p-4 md:p-5">
                      {slide.title ? (
                        <p className="font-display text-base font-medium text-sand md:text-lg">
                          {slide.title}
                        </p>
                      ) : null}
                      {slide.description ? (
                        <p className="mt-1 max-w-md text-sm leading-relaxed text-sand/70">
                          {slide.description}
                        </p>
                      ) : null}
                    </div>
                  )}
                </>
              ) : (
                <span className="pointer-events-none absolute inset-x-0 bottom-2 z-10 text-center text-[0.55rem] tracking-[0.14em] text-sand/75 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {controls && count > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="tabular-nums text-[0.68rem] tracking-[0.16em] text-sand/45 uppercase">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-1.5 text-sand/25">/</span>
            {String(count).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setActive(active - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/95 text-ink transition hover:bg-cream"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setActive(active + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/95 text-ink transition hover:bg-cream"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SqueezeCarousel;
