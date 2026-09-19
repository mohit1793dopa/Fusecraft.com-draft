import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { disciplines, works } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected facade, lighting, furniture, and partition work resolved by Fusecrafts.",
};

export default function WorkPage() {
  return (
    <main className="bg-sand px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="eyebrow text-mocha">Work</p>
          <h1 className="type-display mt-3 max-w-3xl text-4xl md:text-6xl">
            Selected pieces from the workshop.
          </h1>
          <p className="type-body mt-5 max-w-xl text-base md:text-lg">
            Furniture, lighting, partitions, and facade details designed with
            the architect — tested at full scale, finished by hand.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-6">
          <Link href="/work" className="nav-link text-moss">
            All
          </Link>
          {disciplines.map((d) => (
            <Link
              key={d.slug}
              href={`#${d.slug}`}
              className="nav-link text-mocha transition-colors hover:text-moss"
            >
              {d.title}
            </Link>
          ))}
        </Reveal>

        <div className="mt-14 space-y-20">
          {disciplines.map((discipline) => {
            const items = works.filter((w) => w.discipline === discipline.slug);
            if (items.length === 0) return null;
            return (
              <section key={discipline.slug} id={discipline.slug}>
                <Reveal>
                  <p className="eyebrow text-chestnut">{discipline.title}</p>
                  <p className="mt-2 max-w-md text-sm text-mocha">
                    {discipline.note}
                  </p>
                </Reveal>
                <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-14">
                  {items.map((work, i) => (
                    <Reveal
                      key={work.slug}
                      delay={(i % 2) * 0.08}
                      className={i % 2 === 1 ? "md:mt-12" : undefined}
                    >
                      <article className="group">
                        <ParallaxImage
                          src={work.image}
                          alt={work.title}
                          className="aspect-[4/5]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="mt-5">
                          <h2 className="type-headline text-2xl transition-colors group-hover:text-chestnut md:text-3xl">
                            {work.title}
                          </h2>
                          <p className="type-annotation mt-2">{work.materials}</p>
                          <p className="type-body mt-3 max-w-md text-sm md:text-base">
                            {work.blurb}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <Reveal className="mt-20 border-t border-line pt-10">
          <p className="type-body max-w-lg">
            Have a facade detail, a fixture, or a piece that needs to belong to
            the room?
          </p>
          <Link
            href="/contact"
            className="btn-primary mt-6 inline-flex"
          >
            Discuss a commission →
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
