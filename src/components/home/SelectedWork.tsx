import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { works } from "@/data/site";

export function SelectedWork() {
  const featured = works.slice(0, 4);

  return (
    <section className="bg-cream px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-mocha">Selected work</p>
              <h2 className="type-display mt-3 max-w-xl text-3xl md:text-5xl">
                Pieces resolved for the rooms they belong to.
              </h2>
            </div>
            <Link href="/work" className="btn-ghost text-chestnut">
              View all work
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-12 md:gap-5">
          {featured.map((work, i) => {
            const large = i === 0 || i === 3;
            const span = large ? "md:col-span-7" : "md:col-span-5";
            const height = large
              ? "aspect-[4/5] md:aspect-[5/4]"
              : "aspect-[5/4]";

            return (
              <Reveal key={work.slug} delay={i * 0.08} className={span}>
                <Link href={`/work#${work.discipline}`} className="group block">
                  <ParallaxImage
                    src={work.image}
                    alt={work.title}
                    className={height}
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-chestnut">{work.category}</p>
                      <p className="type-headline mt-2 text-xl md:text-2xl">
                        {work.title}
                      </p>
                      <p className="type-annotation mt-1">{work.materials}</p>
                    </div>
                    <span className="nav-link mt-1 translate-x-0 text-chestnut opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                      View →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
