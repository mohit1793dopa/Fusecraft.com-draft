"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type DesignLightboxProps = {
  open: boolean;
  title: string;
  subcategory?: string;
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const SWIPE_THRESHOLD = 56;

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
  const dragStartX = useRef<number | null>(null);
  const wheelLock = useRef(false);
  const [direction, setDirection] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count < 2) return;
      setDirection(dir);
      onIndexChange((index + dir + count) % count);
    },
    [count, index, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 24 && Math.abs(e.deltaX) < 24) return;
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 420);
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        go(e.deltaX > 0 ? 1 : -1);
      } else {
        go(e.deltaY > 0 ? 1 : -1);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, go]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || count < 2) return;
    dragStartX.current = e.clientX;
    setDragging(true);
    setDragX(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current == null) return;
    setDragX(e.clientX - dragStartX.current);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current == null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    setDragging(false);
    setDragX(0);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    go(delta < 0 ? 1 : -1);
  };

  const slideVariants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({
          x: dir === 0 ? 0 : dir > 0 ? 80 : -80,
          opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({
          x: dir === 0 ? 0 : dir > 0 ? -64 : 64,
          opacity: 0,
        }),
      };

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

          {/* Ambient glow behind the photo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[18%] z-[1] rounded-full bg-almond/10 blur-3xl"
          />

          {/* Top bar */}
          <div className="relative z-20 flex items-start justify-between gap-4 px-4 pt-4 sm:px-7 sm:pt-6 md:px-10 md:pt-8">
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
              {count > 1 ? (
                <p className="mt-2.5 tabular-nums text-[0.7rem] tracking-[0.16em] text-sand/45 uppercase">
                  {String(index + 1).padStart(2, "0")}
                  <span className="mx-1.5 text-sand/25">/</span>
                  {String(count).padStart(2, "0")}
                </p>
              ) : null}
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

          {/* Stage */}
          <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-2 sm:px-6 md:px-20">
            {count > 1 ? (
              <>
                <NavButton
                  side="left"
                  label="Previous image"
                  onClick={() => go(-1)}
                />
                <NavButton
                  side="right"
                  label="Next image"
                  onClick={() => go(1)}
                />
              </>
            ) : null}

            <div
              className="relative mx-auto h-full w-full max-w-6xl touch-pan-y select-none"
              style={{
                cursor: dragging ? "grabbing" : count > 1 ? "grab" : "default",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: reduce ? 0.15 : 0.36,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    x: dragging ? dragX * 0.55 : undefined,
                    opacity: dragging
                      ? Math.max(0.55, 1 - Math.abs(dragX) / 420)
                      : undefined,
                  }}
                  className="absolute inset-0 flex items-center justify-center p-1 sm:p-2"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[2px] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                    <Image
                      src={current}
                      alt={`${title} — view ${index + 1}`}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1152px"
                      quality={85}
                      unoptimized
                      className="object-contain pointer-events-none"
                      priority
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Filmstrip */}
          {count > 1 ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative z-20 px-4 pb-5 pt-2 sm:px-8 sm:pb-8"
            >
              <div
                className="no-scrollbar mx-auto flex w-fit max-w-full gap-2.5 overflow-x-auto px-1 py-1"
                role="tablist"
                aria-label="Gallery views"
              >
                {images.map((src, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={src}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-label={`View ${i + 1}`}
                      onClick={() => {
                        if (i === index) return;
                        setDirection(i > index ? 1 : -1);
                        onIndexChange(i);
                      }}
                      className={`relative h-[3.75rem] w-[5.25rem] shrink-0 overflow-hidden rounded-[4px] transition-all duration-300 sm:h-16 sm:w-[5.75rem] ${
                        active
                          ? "opacity-100 ring-2 ring-sand ring-offset-2 ring-offset-[#0e0f0a]"
                          : "opacity-40 ring-1 ring-white/10 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="92px"
                        unoptimized
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <div className="relative z-20 h-8" />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-sand/95 text-ink shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-almond md:h-14 md:w-14 ${
        isLeft ? "left-1 sm:left-3 md:left-4" : "right-1 sm:right-3 md:right-4"
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
        className={isLeft ? "" : "rotate-180"}
      >
        <path
          d="M13.5 5.5L8 11l5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
