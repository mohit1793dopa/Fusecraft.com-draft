"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projectSectors } from "@/data/site";
import { cn } from "@/lib/utils";

type ModalState = { active: boolean; index: number };

const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.28, ease: [0.32, 0, 0.67, 0] },
  },
};

type ProjectsHoverListProps = {
  className?: string;
  showIntro?: boolean;
};

export function ProjectsHoverList({
  className,
  showIntro = true,
}: ProjectsHoverListProps) {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-cream px-5 py-12 md:px-8 md:py-16",
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1440px]">
        {showIntro ? (
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-mocha">Projects</p>
              <h2 className="type-headline mt-2 text-2xl md:text-3xl lg:text-4xl">
                Built for the brief.
              </h2>
            </div>
            <p className="type-annotation max-w-sm md:text-right">
              Café, home, workplace, hospitality — furniture and objects
              resolved to the plan, not the catalogue.
            </p>
          </div>
        ) : null}

        <div className="relative">
          <div className="flex w-full flex-col">
            {projectSectors.map((project, index) => (
              <ProjectRow
                key={project.slug}
                index={index}
                title={project.title}
                label={project.label}
                href={`/projects/${project.slug}`}
                setModal={setModal}
              />
            ))}
          </div>

          {!reduce ? (
            <HoverModal modal={modal} projects={projectSectors} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  index,
  title,
  label,
  href,
  setModal,
}: {
  index: number;
  title: string;
  label: string;
  href: string;
  setModal: (value: ModalState) => void;
}) {
  return (
    <Link
      href={href}
      className="group flex w-full cursor-pointer items-baseline justify-between gap-6 border-t border-line py-4 transition-opacity duration-200 last:border-b hover:opacity-45 md:py-5"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h3 className="m-0 font-display text-xl font-medium tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1.5 md:text-2xl lg:text-[1.75rem]">
        {title}
      </h3>
      <p className="shrink-0 text-right text-[0.7rem] tracking-[0.14em] text-mocha/55 uppercase transition-transform duration-300 group-hover:-translate-x-1.5 md:text-xs">
        {label}
      </p>
    </Link>
  );
}

function HoverModal({
  modal,
  projects,
}: {
  modal: ModalState;
  projects: typeof projectSectors;
}) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalEl = modalContainer.current;
    const cursorEl = cursor.current;
    const labelEl = cursorLabel.current;
    if (!modalEl || !cursorEl || !labelEl) return;

    const xMoveContainer = gsap.quickTo(modalEl, "left", {
      duration: 0.75,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalEl, "top", {
      duration: 0.75,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursorEl, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursorEl, "top", {
      duration: 0.45,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(labelEl, "left", {
      duration: 0.4,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(labelEl, "top", {
      duration: 0.4,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xMoveContainer(e.clientX);
      yMoveContainer(e.clientY);
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
      xMoveCursorLabel(e.clientX);
      yMoveCursorLabel(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[238px] w-[340px] overflow-hidden bg-almond shadow-[0_24px_64px_rgba(29,30,18,0.22)] md:block lg:h-[272px] lg:w-[390px]"
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="relative h-full w-full"
              style={{ backgroundColor: project.color }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 390px, 340px"
                quality={90}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-20 w-20 items-center justify-center rounded-full bg-chestnut md:flex"
      />
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-20 w-20 items-center justify-center rounded-full text-xs tracking-[0.14em] text-sand uppercase md:flex"
      >
        View
      </motion.div>
    </>
  );
}
