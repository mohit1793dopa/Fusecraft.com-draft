import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
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

  const others = projectSectors
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ slug: p.slug, title: p.title, cover: p.cover }));

  return (
    <ProjectDetailView
      project={{
        slug: project.slug,
        title: project.title,
        tag: project.tag,
        label: project.label,
        location: project.location,
        area: project.area,
        scope: project.scope,
        collaborator:
          "collaborator" in project
            ? (project.collaborator as string | undefined)
            : undefined,
        blurb: project.blurb,
        body: project.body,
        cover: project.cover,
        gallery: [...project.gallery],
        catalog: [...(("catalog" in project && project.catalog) || [])],
      }}
      others={others}
    />
  );
}
