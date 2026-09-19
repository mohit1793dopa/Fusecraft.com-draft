import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { approachSteps, messagingPillars } from "@/data/site";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Fusecrafts enters early, fuses materials and crafts, mocks up at full scale, and resolves detail.",
};

export default function ApproachPage() {
  return (
    <main className="bg-sand">
      <section className="px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <p className="eyebrow text-mocha">Approach</p>
            <h1 className="type-display mt-3 max-w-3xl text-4xl md:text-6xl">
              Fusion is not a trend. It is a methodology.
            </h1>
            <p className="type-body mt-6 max-w-2xl text-base md:text-lg">
              We begin where others end. Detail is not a finishing touch — it is
              a discipline. Stepping into the project early as a thinking
              partner, we reject assumptions in favor of workshop
              experimentation, full-scale mockups, and iterative testing.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative aspect-[16/9] md:aspect-[2.4/1]">
        <Image
          src="/images/approach-mockup.jpg"
          alt="Workshop mockup and material testing"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-moss/25" />
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[900px]">
          {approachSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.05}>
              <div className="grid gap-4 border-b border-line py-10 md:grid-cols-[100px_1fr] md:gap-10">
                <span className="font-display text-2xl text-chestnut">
                  {step.num}
                </span>
                <div>
                  <h2 className="type-headline text-2xl md:text-3xl">
                    {step.title}
                  </h2>
                  <p className="type-body mt-3 text-base md:text-lg">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <p className="eyebrow text-mocha">What we stand for</p>
            <h2 className="type-display mt-3 max-w-xl text-3xl md:text-4xl">
              Ideas that run beneath everything we make.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {messagingPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06}>
                <article className="border-t border-line pt-6">
                  <h3 className="type-subhead text-xl md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="type-body mt-3 text-sm md:text-base">
                    {pillar.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-moss px-5 py-20 text-sand md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <p className="font-display text-2xl font-medium leading-snug md:text-4xl">
            We do not merely build pieces to sit inside a room — we resolve them
            so deeply that they truly belong to it.
          </p>
          <Link
            href="/contact"
            className="btn-primary mt-10 inline-flex bg-cream text-ink hover:bg-almond"
          >
            Start a project →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
