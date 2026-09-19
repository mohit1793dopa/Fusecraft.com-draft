import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { materials } from "@/data/site";

export function MaterialsBand() {
  return (
    <section className="bg-sand px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="eyebrow text-mocha">Material fusion</p>
          <h2 className="type-display mt-3 max-w-2xl text-3xl md:text-5xl">
            Fusion is a methodology, not an aesthetic.
          </h2>
          <p className="type-body mt-5 max-w-lg text-base md:text-lg">
            Wood, metal, stone, rattan — each combination tested, refined, and
            resolved before it is delivered. The question is never what the
            workshop is set up for. It is what the detail actually needs.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {materials.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <article className="group">
                <ParallaxImage
                  src={m.image}
                  alt={m.name}
                  className="aspect-[3/4]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <h3 className="type-headline mt-4 text-lg transition-colors group-hover:text-chestnut md:text-xl">
                  {m.name}
                </h3>
                <p className="type-annotation mt-1">{m.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
