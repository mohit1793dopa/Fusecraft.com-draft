import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { craftCategorySummaries } from "@/data/craft-portfolio";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Browse beds, chairs, doors, jhula, lightings, partitions, sofa, and tables from Fusecrafts.",
};

export default function WorkPage() {
  return (
    <main className="bg-sand px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="eyebrow text-mocha">Work</p>
          <h1 className="type-display mt-3 max-w-3xl text-4xl md:text-6xl">
            Collections from the workshop.
          </h1>
          <p className="type-body mt-5 max-w-xl text-base md:text-lg">
            Open a category to see every design — then view the full photo set
            for each piece.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {craftCategorySummaries.map((cat, i) => {
            const count = cat.designCount;
            return (
              <Reveal key={cat.slug} delay={(i % 4) * 0.05}>
                <Link
                  href={cat.href}
                  className="group relative block aspect-square overflow-hidden rounded-[24px] bg-almond"
                >
                  <Image
                    src={cat.cover}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    quality={75}
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-moss-ink/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[0.55rem] tracking-[0.14em] text-sand/55 uppercase">
                      {count} design{count === 1 ? "" : "s"}
                    </p>
                    <h2 className="mt-1 font-display text-lg font-medium text-sand md:text-xl">
                      {cat.title}
                    </h2>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </main>
  );
}
