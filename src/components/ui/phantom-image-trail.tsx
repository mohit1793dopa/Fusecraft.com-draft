"use client";

/**
 * Phantom Image Trail — Hyperiux / 21st.dev style
 * Images ghost behind the cursor path (GSAP).
 */

import { Expo, gsap } from "gsap";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type PhantomImage = { src: string; alt?: string } | string;

type Props = {
  images?: PhantomImage[];
  className?: string;
  imageClassName?: string;
  imageMultiplier?: number;
  enableRotation?: boolean;
  triggerDistance?: number;
  popOutDuration?: number;
  fadeOutDuration?: number;
  /**
   * Listen for pointer moves on the parent element (e.g. full hero section)
   * so overlays with pointer-events-none still drive the trail.
   */
  bindToParent?: boolean;
  children?: ReactNode;
};

function normalizeImages(images?: PhantomImage[]) {
  if (!images?.length) return [];
  return images
    .map((image, index) => {
      if (typeof image === "string") {
        return { src: image, alt: `Trail ${index + 1}` };
      }
      if (image?.src) {
        return { src: image.src, alt: image.alt || `Trail ${index + 1}` };
      }
      return null;
    })
    .filter(Boolean) as { src: string; alt: string }[];
}

export function PhantomImageTrail({
  images,
  className = "",
  imageClassName = "",
  imageMultiplier = 2,
  enableRotation = true,
  triggerDistance = 60,
  popOutDuration = 1,
  fadeOutDuration = 0.7,
  bindToParent = false,
  children,
}: Props) {
  const resolvedImages = useMemo(() => normalizeImages(images), [images]);
  const totalImages = Math.max(
    1,
    resolvedImages.length * Math.max(1, imageMultiplier),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastTriggerRef = useRef<{ x: number; y: number } | null>(null);
  const zIndexRef = useRef(2);
  const imageIndexRef = useRef(0);
  const disabledRef = useRef(false);

  const showNextImage = useCallback(
    (clientX: number, clientY: number) => {
      if (!resolvedImages.length || disabledRef.current) return;
      const el = imagesRef.current[imageIndexRef.current];
      if (!el) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Ignore moves outside the trail bounds
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }

      const width = el.offsetWidth || 150;
      const height = el.offsetHeight || 180;
      const x = clientX - rect.left - width / 2;
      const y = clientY - rect.top - height / 2;

      gsap.killTweensOf(el);

      const startRot = enableRotation ? gsap.utils.random(-28, 28) : 0;
      const exitRot = enableRotation ? gsap.utils.random(-12, 12) : 0;

      gsap
        .timeline()
        .set(el, {
          opacity: 1,
          scale: 0.28,
          rotateZ: startRot,
          zIndex: zIndexRef.current,
          x,
          y,
          pointerEvents: "none",
        })
        .to(el, {
          ease: Expo.easeOut,
          rotateZ: 0,
          opacity: 1,
          scale: 1,
          duration: popOutDuration,
          x,
          y,
        })
        .to(el, {
          ease: "power3.inOut",
          opacity: 0,
          rotateZ: exitRot,
          duration: fadeOutDuration,
          delay: 0.12,
          scale: 0.2,
        });

      zIndexRef.current += 1;
      imageIndexRef.current = (imageIndexRef.current + 1) % totalImages;
    },
    [
      resolvedImages.length,
      enableRotation,
      popOutDuration,
      fadeOutDuration,
      totalImages,
    ],
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (disabledRef.current) return;
      const last = lastTriggerRef.current;
      if (!last) {
        lastTriggerRef.current = { x: clientX, y: clientY };
        showNextImage(clientX, clientY);
        return;
      }
      const dist = Math.hypot(clientX - last.x, clientY - last.y);
      if (dist > triggerDistance) {
        lastTriggerRef.current = { x: clientX, y: clientY };
        showNextImage(clientX, clientY);
      }
    },
    [showNextImage, triggerDistance],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    disabledRef.current = reduce;
  }, []);

  // Bind pointer tracking — parent section when bindToParent, else self
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !resolvedImages.length) return;

    const target =
      bindToParent && container.parentElement
        ? container.parentElement
        : container;

    const onMove = (e: PointerEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    target.addEventListener("pointermove", onMove, { passive: true });
    return () => target.removeEventListener("pointermove", onMove);
  }, [bindToParent, handleMove, resolvedImages.length]);

  if (!resolvedImages.length) {
    return (
      <div ref={containerRef} className={cn("relative h-full w-full", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden",
        bindToParent && "pointer-events-none",
        className,
      )}
    >
      {children}

      <div className="pointer-events-none absolute inset-0 z-10">
        {Array.from({ length: totalImages }).map((_, index) => {
          const image = resolvedImages[index % resolvedImages.length];
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${image.src}-${index}`}
              ref={(node) => {
                imagesRef.current[index] = node;
              }}
              src={image.src}
              alt=""
              draggable={false}
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-0 left-0 h-[170px] w-[140px] max-w-none rounded-2xl object-cover opacity-0 shadow-[0_16px_48px_rgba(29,30,18,0.22)] will-change-[transform,opacity] sm:h-[200px] sm:w-[160px] md:h-[230px] md:w-[185px]",
                imageClassName,
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PhantomImageTrail;
