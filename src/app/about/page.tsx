import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { brand, workshopTrades } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Fusecrafts story — architectural thinking at the object scale in Nagpur.",
};

export default function AboutPage() {
  return (
    <main className="bg-sand">
      <section className="px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <p className="eyebrow text-mocha">About</p>
            <h1 className="type-display mt-3 max-w-3xl text-4xl md:text-6xl">
              Architectural thinking at the object scale.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-5 md:px-8">
        <Reveal className="relative mx-auto aspect-[16/10] max-w-[1440px] overflow-hidden">
          <Image
            src="/images/about-studio.jpg"
            alt="Studio and crafted interior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 className="type-headline text-2xl md:text-3xl">
              The brand story
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="type-body space-y-5 text-base md:text-lg">
              <p>
                We begin where others end. At Fusecrafts, detail is not a
                finishing touch — it is a discipline. Built by an architect who
                chose the scale of the object rather than the building, our
                studio lives in the in-betweens: facade, lighting, furniture,
                and partitions that hold a space together.
              </p>
              <p>
                For us, fusion is not a trend; it is a rigorous methodology. We
                cross lines others avoid, marrying wood with metal, stone with
                rattan, and raw industrial strength with precise hand finishing.
              </p>
              <p>
                Stepping into the project early as a thinking partner, we reject
                assumptions in favor of relentless workshop experimentation,
                full-scale mockups, and iterative testing. Ten years of that
                practice is what makes the result dependable.
              </p>
            </div>
            <Link
              href="/approach"
              className="btn-primary mt-8 inline-flex"
            >
              How we work →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-cream px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-3">
          {[
            {
              label: "Studio",
              value: "Nagpur",
              note: `Established ${brand.est}`,
            },
            {
              label: "Focus",
              value: "In-betweens",
              note: "Facade, lighting, furniture, partitions",
            },
            {
              label: "Method",
              value: "Fusion",
              note: "Material + craft + workshop rigor",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <p className="eyebrow text-mocha">{item.label}</p>
              <p className="type-headline mt-3 text-2xl md:text-3xl">
                {item.value}
              </p>
              <p className="type-annotation mt-2">{item.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <p className="eyebrow text-mocha">Many hands, one standard</p>
            <h2 className="type-display mt-3 max-w-xl text-3xl md:text-4xl">
              Every piece moves through our own workshop.
            </h2>
            <p className="type-body mt-5 max-w-lg">
              Metalworkers, painters, upholsterers, and carpenters turn a
              drawing into something you can actually touch.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {workshopTrades.map((trade, i) => (
              <Reveal key={trade} delay={i * 0.06}>
                <div className="border border-line bg-cream px-5 py-8 text-center">
                  <p className="type-subhead text-lg md:text-xl">{trade}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
