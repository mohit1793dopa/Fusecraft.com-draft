import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function ContactCTA() {
  return (
    <section className="bg-sand px-5 py-20 md:px-8 md:py-28">
      <Reveal className="mx-auto max-w-[1440px] overflow-hidden bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-mocha">Begin a project</p>
            <h2 className="type-display mt-4 max-w-2xl text-3xl md:text-5xl">
              Tell us about the room — and the detail that holds it together.
            </h2>
            <p className="type-body mt-5 max-w-lg text-base md:text-lg">
              Architects, designers, and clients: we collaborate early across
              facade, lighting, furniture, and partitions.
            </p>
          </div>
          <Link href="/contact" className="btn-primary w-fit">
            Get in touch →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
