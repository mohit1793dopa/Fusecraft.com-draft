"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "@/components/BrandLogo";
import { brand, primaryNav } from "@/data/site";
import { cn } from "@/lib/utils";

const glassBar =
  "border border-white/70 bg-white/45 shadow-[0_8px_40px_rgba(29,30,18,0.1),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl";

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Utility strip — info only */}
      <div className="pointer-events-auto hidden border-b border-line bg-moss-ink text-sand/70 md:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-8 py-2 text-[0.62rem] tracking-[0.14em] uppercase">
          <p className="shrink-0">
            {brand.location} · Est. {brand.est}
          </p>
          <p className="hidden text-center text-almond/85 lg:block">
            {brand.tagline}
          </p>
          <a
            href={`mailto:${brand.email}`}
            className="shrink-0 transition hover:text-sand"
          >
            {brand.email}
          </a>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-auto mx-auto flex justify-center px-4 transition-[padding] duration-500 md:px-6",
          scrolled ? "pt-3 md:pt-3" : "pt-3.5 md:pt-4",
        )}
      >
        <div
          className={cn(
            "relative flex w-full max-w-[920px] items-center justify-between gap-5 rounded-full px-4 py-2.5 md:gap-8 md:px-6 md:py-3",
            glassBar,
            "transition-shadow duration-500",
            scrolled &&
              "shadow-[0_12px_48px_rgba(29,30,18,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]",
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-almond/15"
          />

          <div className="relative z-10 shrink-0">
            <BrandLogo
              tone="dark"
              priority
              className="!h-7 !w-auto md:!h-8"
            />
          </div>

          <nav aria-label="Primary" className="relative z-10 hidden md:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "nav-link relative inline-flex rounded-full px-3.5 py-1.5 text-mocha transition-colors duration-300 hover:text-moss",
                        active && "text-moss",
                      )}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3.5 -bottom-0.5 h-px bg-chestnut"
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <Link
              href="/contact"
              className="btn-primary hidden !px-5 !py-2 text-[0.62rem] md:inline-flex"
            >
              Inquire →
            </Link>
            <button
              type="button"
              className="nav-link rounded-full px-2.5 py-1.5 text-moss md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-auto mt-2 w-full max-w-[920px] px-4 md:hidden"
          >
            <nav
              aria-label="Mobile"
              className={cn(
                "overflow-hidden rounded-[1.75rem] px-5 py-4",
                glassBar,
              )}
            >
              <ul className="flex flex-col">
                {primaryNav.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      className="block border-b border-line/60 py-3.5 font-display text-xl font-medium text-moss"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.35 }}
                  className="pt-4"
                >
                  <Link href="/contact" className="btn-primary w-full">
                    Inquire →
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
