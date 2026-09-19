import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { approachSteps } from "@/data/site";

export function ApproachTeaser() {
  return (
    <section className="bg-moss px-5 py-20 text-sand md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow text-almond/60">The approach</p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
            Enter early, or pay for it later.
          </h2>
          <p className="mt-5 max-w-md text-base font-normal leading-relaxed text-sand/75 md:text-lg">
            Onboarded at the design stage, we can shape outcomes. Called in at
            execution, we can only limit the damage. We make the case for the
            former.
          </p>
          <Link
            href="/approach"
            className="btn-ghost mt-8 text-almond hover:text-cream"
          >
            Read the approach
          </Link>
        </Reveal>

        <div className="space-y-0 border-t border-sand/15">
          {approachSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="grid grid-cols-[auto_1fr] gap-5 border-b border-sand/15 py-6 md:gap-8 md:py-7">
                <span className="font-display text-sm text-chestnut">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm font-normal leading-relaxed text-sand/65 md:text-base">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
