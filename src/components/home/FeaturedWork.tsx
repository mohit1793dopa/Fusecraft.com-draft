"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { works } from "@/data/site";

export function FeaturedWork() {
  const reduce = useReducedMotion();
  const featured = works.slice(0, 8);

  return (
    <section
      id="selected-work"
      className="bg-sand px-5 py-12 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-mocha">Selected work</p>
              <h2 className="type-headline mt-2 text-2xl md:text-3xl">
                Pieces for the room.
              </h2>
            </div>
            <p className="type-annotation max-w-sm md:text-right">
              Beds, chairs, doors, jhula, lightings, partitions, sofa, and
              tables.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-3.5">
          {featured.map((work, i) => (
            <motion.div
              key={work.slug}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
            >
              <Link
                href={work.href}
                className="group relative block aspect-square overflow-hidden rounded-[24px] bg-almond"
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  quality={75}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moss-ink/75 via-transparent to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-3.5">
                  <p className="text-[0.55rem] tracking-[0.14em] text-sand/55 uppercase">
                    {work.category}
                  </p>
                  <h3 className="mt-1 font-display text-sm font-medium text-sand md:text-base">
                    {work.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/craft/beds" className="btn-primary">
            Browse collections →
          </Link>
        </div>
      </div>
    </section>
  );
}
