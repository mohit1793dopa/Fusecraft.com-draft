import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectSectors } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectSectors.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectSectors.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.blurb,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectSectors.find((p) => p.slug === slug);
  if (!project) notFound();

  const others = projectSectors.filter((p) => p.slug !== project.slug);

  return (
    <main className="bg-cream">
      <section className="relative min-h-[55vh] md:min-h-[70vh]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moss-ink/85 via-moss-ink/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-8 md:pb-14">
          <div className="mx-auto max-w-[1440px]">
            <p className="text-[0.65rem] tracking-[0.2em] text-sand/55 uppercase">
              Project · {project.tag}
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-sand md:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-xl text-base text-sand/75 md:text-lg">
              {project.blurb}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-mocha">The brief</p>
            <h2 className="mt-3 font-display text-2xl font-medium text-ink md:text-3xl">
              Designed for how the project lives.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-mocha/80 md:text-lg">
            {project.body}
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-[1440px] flex-wrap gap-4">
          <Link href="/contact" className="btn-primary">
            Start a project →
          </Link>
          <Link href="/work" className="btn-subtle">
            View work →
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-sand px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow text-mocha">More projects</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-almond"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="33vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moss-ink/70 to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-xl text-sand">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/projects"
            className="btn-ghost mt-10 inline-flex text-chestnut"
          >
            All projects ›
          </Link>
        </div>
      </section>
    </main>
  );
}
