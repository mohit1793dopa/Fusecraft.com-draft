"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

/** Soft zoom on hover — 21st.dev / Motion Primitives inspired image treatment */
export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden bg-almond", className)}>
      <motion.div
        className="absolute inset-0"
        whileHover={reduce ? undefined : { scale: 1.04 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
