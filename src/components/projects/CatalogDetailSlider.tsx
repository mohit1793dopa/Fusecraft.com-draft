"use client";

type Props = {
  title: string;
  images: readonly string[];
};

/** Portrait catalog — continuous linear L→R loop */
export function CatalogDetailSlider({ title, images }: Props) {
  if (images.length === 0) return null;

  // Duplicate track for seamless loop
  const loop = [...images, ...images];
  // ~4s per card, min 24s
  const durationSec = Math.max(24, images.length * 4);

  return (
    <section
      className="overflow-hidden border-t border-line py-12 md:py-16"
      style={{ background: "#fcf4e3", borderColor: "#ddd6c7" }}
    >
      {/* Keyframes inlined — globals.css sometimes fails to emit in turbopack */}
      <style>{`
        @keyframes catalog-marquee-ltr {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .catalog-marquee-track:hover {
          animation-play-state: paused !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .catalog-marquee-track { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-8 sm:mb-10">
          <p className="eyebrow text-mocha">Detail catalog</p>
          <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Product &amp; chair details
          </h2>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16"
          style={{
            background:
              "linear-gradient(to right, #fcf4e3, transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16"
          style={{
            background:
              "linear-gradient(to left, #fcf4e3, transparent)",
          }}
        />

        <div style={{ overflow: "hidden" }}>
          <div
            className="catalog-marquee-track"
            style={{
              display: "flex",
              width: "max-content",
              gap: 20,
              paddingTop: 4,
              paddingBottom: 4,
              willChange: "transform",
              animation: `catalog-marquee-ltr ${durationSec}s linear infinite`,
            }}
          >
            {loop.map((src, i) => {
              const n = (i % images.length) + 1;
              return (
                <article
                  key={`${src}-${i}`}
                  className="relative overflow-hidden rounded bg-sand ring-1 ring-line"
                  style={{
                    width: 280,
                    height: 420,
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${title} — detail ${n}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading={i < images.length ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-moss-ink/60 to-transparent px-4 pb-4 pt-16">
                    <p className="text-[0.62rem] tracking-[0.16em] text-sand/80 uppercase">
                      Detail
                    </p>
                    <p className="mt-0.5 font-display text-lg font-medium text-sand">
                      {String(n).padStart(2, "0")}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
