/* Auto-generated craft portfolio index — do not edit by hand */

export type CraftDesign = {
  slug: string;
  title: string;
  main: string;
  images: string[];
};

export type CraftSubcategory = {
  slug: string;
  title: string;
  designs: CraftDesign[];
};

export type CraftCategory = {
  slug: string;
  title: string;
  cover: string;
  href: string;
  subcategories: CraftSubcategory[];
};

export type CraftCategorySummary = {
  slug: string;
  title: string;
  cover: string;
  href: string;
  designCount: number;
};

export const craftCategorySummaries: CraftCategorySummary[] = [
  {
    "slug": "beds",
    "title": "Beds",
    "cover": "/images/browse-by-craft/beds.jpg",
    "href": "/craft/beds",
    "designCount": 7
  },
  {
    "slug": "chairs",
    "title": "Chairs",
    "cover": "/images/browse-by-craft/chairs.jpg",
    "href": "/craft/chairs",
    "designCount": 10
  },
  {
    "slug": "doors",
    "title": "Doors",
    "cover": "/images/browse-by-craft/doors.jpg",
    "href": "/craft/doors",
    "designCount": 3
  },
  {
    "slug": "jhula",
    "title": "Jhula",
    "cover": "/images/browse-by-craft/jhula.jpg",
    "href": "/craft/jhula",
    "designCount": 1
  },
  {
    "slug": "lightings",
    "title": "Lightings",
    "cover": "/images/browse-by-craft/lightings.jpg",
    "href": "/craft/lightings",
    "designCount": 1
  },
  {
    "slug": "partitions",
    "title": "Partitions",
    "cover": "/images/browse-by-craft/partitions.jpg",
    "href": "/craft/partitions",
    "designCount": 2
  },
  {
    "slug": "sofa",
    "title": "Sofa",
    "cover": "/images/browse-by-craft/sofa.jpg",
    "href": "/craft/sofa",
    "designCount": 7
  },
  {
    "slug": "tables",
    "title": "Tables",
    "cover": "/images/browse-by-craft/tables.jpg",
    "href": "/craft/tables",
    "designCount": 17
  }
];

/** Lightweight list for nav / work page */
export const craftCategories = craftCategorySummaries;

const loaders: Record<string, () => Promise<{ default: CraftCategory }>> = {
  beds: () => import("./craft/beds.json"),
  chairs: () => import("./craft/chairs.json"),
  doors: () => import("./craft/doors.json"),
  jhula: () => import("./craft/jhula.json"),
  lightings: () => import("./craft/lightings.json"),
  partitions: () => import("./craft/partitions.json"),
  sofa: () => import("./craft/sofa.json"),
  tables: () => import("./craft/tables.json"),
};

export async function getCraftCategory(
  slug: string,
): Promise<CraftCategory | undefined> {
  const load = loaders[slug];
  if (!load) return undefined;
  const mod = await load();
  return mod.default;
}
