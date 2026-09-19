"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { disciplines } from "@/data/site";

export function DisciplinesBand() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-sand px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-mocha">Disciplines</p>
              <h2 className="type-display mt-3 max-w-xl text-3xl md:text-5xl">
                Where the project is decided.
              </h2>
            </div>
            <p className="type-body max-w-sm text-sm md:text-base">
              Facade, lighting, furniture, and partitions — the in-betweens no
              one else treats as a design problem.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {disciplines.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.08}>
              <Link
                href={`/work#${item.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-almond"
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={reduce ? undefined : { scale: 1.06 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-moss/85 via-moss/25 to-transparent transition-opacity duration-500 group-hover:from-moss/90" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="eyebrow text-almond/70">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-2xl text-sand md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[16rem] text-sm text-sand/75 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                    {item.note}
                  </p>
                  <span className="nav-link mt-4 inline-flex text-almond transition-transform duration-500 group-hover:translate-x-1">
                    Explore →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
