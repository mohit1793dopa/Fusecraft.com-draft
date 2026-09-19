import type { Metadata } from "next";
import { ProjectsHoverList } from "@/components/projects/ProjectsHoverList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Café, residential, commercial, and hospitality projects — furniture and objects designed for the brief.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-cream pt-28 md:pt-36">
      <ProjectsHoverList />
    </main>
  );
}
