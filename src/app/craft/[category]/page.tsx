import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CraftCategoryView } from "@/components/craft/CraftCategoryView";
import {
  craftCategorySummaries,
  getCraftCategory,
} from "@/data/craft-portfolio";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return craftCategorySummaries.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const summary = craftCategorySummaries.find((c) => c.slug === slug);
  if (!summary) return { title: "Collection" };
  return {
    title: summary.title,
    description: `${summary.title} designs from the Fusecrafts workshop.`,
  };
}

export default async function CraftCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = await getCraftCategory(slug);
  if (!category) notFound();

  const others = craftCategorySummaries
    .filter((c) => c.slug !== category.slug)
    .map((c) => ({ slug: c.slug, title: c.title, href: c.href }));

  return <CraftCategoryView category={category} others={others} />;
}
