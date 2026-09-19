"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { blogPosts } from "@/data/site";

export function DesignBlog() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-cream px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-mocha">Design journal</p>
              <h2 className="type-display mt-3 text-3xl md:text-4xl">
                Notes from the workshop.
              </h2>
            </div>
            <Link href="/approach" className="btn-ghost text-chestnut">
              All notes ›
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group flex flex-col"
            >
              <Link href="/approach" className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-almond">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="mt-4 inline-block rounded-full bg-ink px-2.5 py-1 text-[0.58rem] tracking-[0.14em] text-sand uppercase">
                  {post.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium leading-snug tracking-wide text-chestnut uppercase md:text-xl">
                  {post.title}
                </h3>
                <p className="mt-2 text-[0.65rem] tracking-[0.14em] text-mocha/45 uppercase">
                  {post.author}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mocha/75">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[0.68rem] tracking-[0.14em] text-chestnut uppercase transition group-hover:gap-2">
                  Read more <span aria-hidden>→</span>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
