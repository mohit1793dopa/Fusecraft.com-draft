"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { CraftInteractiveHero } from "@/components/craft/CraftInteractiveHero";
import { DesignLightbox } from "@/components/craft/DesignLightbox";
import type { CraftCategory } from "@/data/craft-portfolio";

type OtherCategory = { slug: string; title: string; href: string };

type Props = {
  category: CraftCategory;
  others: OtherCategory[];
};

/** Chairs first — one main image per design for the cursor trail */
function trailImagesForCategory(category: CraftCategory) {
  return category.subcategories.flatMap((section) =>
    section.designs.map((design) => ({
      src: design.main,
      alt: design.title,
    })),
  );
}

export function CraftCategoryView({ category, others }: Props) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<{
    title: string;
    subcategory: string;
    images: string[];
    index: number;
  } | null>(null);

  const sections = useMemo(() => {
    if (filter === "all") return category.subcategories;
    return category.subcategories.filter((s) => s.slug === filter);
  }, [category.subcategories, filter]);

  const total = category.subcategories.reduce(
    (n, s) => n + s.designs.length,
    0,
  );

  const isChairsHero = category.slug === "chairs";
  const trailImages = useMemo(
    () => (isChairsHero ? trailImagesForCategory(category) : []),
    [category, isChairsHero],
  );

  return (
    <main className="bg-cream">
      {isChairsHero ? (
        <CraftInteractiveHero
          title="Chairs"
          eyebrow="Collection"
          headline="Seating built for how the room is used."
          subtext={`${total} designs across dining, lounge, and benches.`}
          ctaLabel="Browse designs"
          ctaHref="#dining-and-cafe-chairs"
          secondaryLabel="‹ All collections"
          secondaryHref="/#selected-work"
          trailImages={trailImages}
          hint="Move across the page — designs trail behind your cursor."
        />
      ) : (
        <section className="relative overflow-hidden">
          <div className="relative mx-auto grid max-w-[1440px] gap-8 px-6 pt-28 pb-10 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:pt-36 md:pb-14 lg:px-16">
            <Reveal>
              <p className="eyebrow text-mocha">Collection</p>
              <h1 className="type-headline mt-3 text-4xl md:text-5xl lg:text-6xl">
                {category.title}
              </h1>
              <p className="type-body mt-4 max-w-md text-base text-mocha/80">
                {total} design{total === 1 ? "" : "s"} from the workshop — open
                any piece to browse its views.
              </p>
              <Link
                href="/#selected-work"
                className="btn-ghost mt-6 inline-flex text-chestnut"
              >
                ‹ All collections
              </Link>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-almond md:aspect-[5/4]">
                <Image
                  src={category.cover}
                  alt={category.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  quality={75}
                  unoptimized
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {category.subcategories.length > 1 ? (
        <div className="sticky top-[4.125rem] z-40 px-4 sm:px-6 md:top-[calc(6.05rem+4px)] md:px-8">
          <div className="mx-auto flex max-w-[760px] justify-center">
            <div
              role="tablist"
              aria-label="Filter by type"
              className="no-scrollbar relative flex w-full max-w-full gap-1 overflow-x-auto rounded-full border border-white/65 bg-white/50 px-1 py-1 shadow-[0_8px_32px_rgba(29,30,18,0.1),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/45 via-transparent to-almond/20"
              />
              <Chip
                active={filter === "all"}
                onClick={() => setFilter("all")}
                label="All"
              />
              {category.subcategories.map((s) => (
                <Chip
                  key={s.slug}
                  active={filter === s.slug}
                  onClick={() => setFilter(s.slug)}
                  label={s.title}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-[1440px] space-y-16 px-6 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16">
        {sections.map((section) => (
          <section key={section.slug} id={section.slug}>
            {category.subcategories.length > 1 ||
            section.title !== "All designs" ? (
              <Reveal>
                <p className="eyebrow text-mocha">{section.title}</p>
                <h2 className="type-headline mt-2 text-2xl md:text-3xl">
                  {section.designs.length} piece
                  {section.designs.length === 1 ? "" : "s"}
                </h2>
              </Reveal>
            ) : null}

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {section.designs.map((design, i) => (
                <motion.button
                  key={design.slug}
                  type="button"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: (i % 6) * 0.04, duration: 0.5 }}
                  onClick={() =>
                    setActive({
                      title: design.title,
                      subcategory: section.title,
                      images: design.images,
                      index: 0,
                    })
                  }
                  className="group relative aspect-square overflow-hidden rounded-[20px] bg-almond text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut"
                >
                  <Image
                    src={design.main}
                    alt={design.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    quality={70}
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-moss-ink/80 via-moss-ink/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4">
                    <p className="text-[0.55rem] tracking-[0.14em] text-sand/55 uppercase">
                      {design.images.length > 1
                        ? `${design.images.length} views`
                        : "View"}
                    </p>
                    <h3 className="mt-1 font-display text-sm font-medium text-sand md:text-base">
                      {design.title}
                    </h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        ))}

        {total === 0 ? (
          <p className="type-body text-center text-mocha/70">
            Designs for this collection are being prepared.
          </p>
        ) : null}

        <div className="border-t border-line pt-10">
          <p className="eyebrow text-mocha">More collections</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={c.href}
                className="rounded-full bg-sand px-4 py-2 text-[0.68rem] tracking-[0.12em] text-ink uppercase ring-1 ring-line transition hover:bg-almond"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <DesignLightbox
        open={!!active}
        title={active?.title ?? ""}
        subcategory={active?.subcategory}
        images={active?.images ?? []}
        index={active?.index ?? 0}
        onClose={() => setActive(null)}
        onIndexChange={(i) =>
          setActive((prev) => (prev ? { ...prev, index: i } : prev))
        }
      />
    </main>
  );
}

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative z-10 shrink-0 rounded-full px-3.5 py-2 text-[0.62rem] tracking-[0.12em] uppercase transition duration-300 sm:px-4 ${
        active
          ? "bg-moss-ink text-sand shadow-[0_4px_14px_rgba(29,30,18,0.2)]"
          : "text-mocha hover:bg-white/55 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
