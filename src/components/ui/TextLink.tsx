"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
};

export function TextLink({
  href,
  children,
  className,
  underline = true,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 text-sm font-medium tracking-[0.14em] uppercase transition-colors",
        className,
      )}
    >
      <span>{children}</span>
      <motion.span
        aria-hidden
        className="inline-block"
        initial={false}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        →
      </motion.span>
      {underline && (
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      )}
    </Link>
  );
}
