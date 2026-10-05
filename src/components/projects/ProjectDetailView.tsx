"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CatalogDetailSlider } from "@/components/projects/CatalogDetailSlider";

export type ProjectDetail = {
  slug: string;
  title: string;
  tag: string;
  label: string;
  location: string;
  area: string;
  scope: string;
  collaborator?: string;
  blurb: string;
  body: string;
  cover: string;
  gallery: readonly string[];
  catalog: readonly string[];
};

type OtherProject = {
  slug: string;
  title: string;
  cover: string;
};

type Props = {
  project: ProjectDetail;
  others: OtherProject[];
};

export function ProjectDetailView({ project, others }: Props) {
  return (
    <main className="bg-cream">
      {/* Side-by-side cover + details */}
      <section className="px-6 pt-28 pb-12 sm:px-8 md:px-12 md:pt-36 md:pb-16 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] items-stretch gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-almond sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex h-full flex-col justify-center lg:py-4">
              <p className="text-[0.65rem] tracking-[0.2em] text-mocha/50 uppercase">
                Project · {project.tag}
              </p>
              <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl lg:text-[3.25rem]">
                {project.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-mocha/80 md:text-lg">
                {project.blurb}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-2 border-t border-line pt-7">
                {[
                  { label: "Location", value: project.location },
                  { label: "Scale", value: project.area },
                  { label: "Scope", value: project.scope },
                  { label: "Type", value: project.tag },
                  ...(project.collaborator
                    ? [{ label: "With", value: project.collaborator }]
                    : []),
                  { label: "Focus", value: project.label },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-full bg-sand px-3.5 py-2.5 ring-1 ring-line"
                  >
                    <p className="text-[0.55rem] tracking-[0.14em] text-mocha/45 uppercase">
                      {item.label}
                    </p>
                    <p className="mt-0.5 truncate text-[0.78rem] leading-snug text-ink md:text-[0.82rem]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 max-w-xl text-[0.95rem] leading-[1.75] text-mocha/80 md:text-base md:leading-[1.8]">
                {project.body}
              </p>

              <div className="mt-9">
                <Link href="/contact" className="btn-primary">
                  Start a project →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Site gallery — cleaner alternating grid */}
      {project.gallery.length > 0 ? (
        <section className="border-t border-line px-6 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <Reveal>
              <p className="eyebrow text-mocha">Site gallery</p>
              <h2 className="mt-2 font-display text-2xl font-medium text-ink md:text-[1.75rem]">
                Spaces from the project.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-3 md:space-y-4">
              {chunkPairs(project.gallery).map((pair, row) => {
                const flip = row % 2 === 1;
                return (
                  <div
                    key={pair.join("-")}
                    className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4"
                  >
                    {pair.map((src, i) => {
                      const wide = flip ? i === 1 : i === 0;
                      const alone = pair.length === 1;
                      return (
                        <div
                          key={src}
                          className={`relative h-64 w-full overflow-hidden bg-sand sm:h-72 md:h-80 ${
                            alone
                              ? "md:col-span-12"
                              : wide
                                ? "md:col-span-7"
                                : "md:col-span-5"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt={`${project.title} — view ${row * 2 + i + 1}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Detail catalog — auto slider L→R */}
      {project.catalog.length > 0 ? (
        <CatalogDetailSlider title={project.title} images={project.catalog} />
      ) : null}

      {/* More projects */}
      <section className="border-t border-line bg-sand px-6 py-14 sm:px-8 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow text-mocha">More projects</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {others.slice(0, 3).map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-almond"
              >
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  sizes="33vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moss-ink/75 to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-xl text-sand md:text-2xl">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/projects"
            className="btn-ghost mt-10 inline-flex text-chestnut"
          >
            All projects ›
          </Link>
        </div>
      </section>
    </main>
  );
}

function chunkPairs(items: readonly string[]): string[][] {
  const rows: string[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}
