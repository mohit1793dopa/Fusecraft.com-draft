import fs from "fs";
import path from "path";

const src = fs.readFileSync("src/data/craft-portfolio.ts", "utf8");
const m = src.match(/export const craftCategories = (\[[\s\S]*?\])\s+satisfies/);
if (!m) {
  console.error("parse fail — expected craftCategories array");
  process.exit(1);
}

const cats = JSON.parse(m[1]);
const dir = path.join("src", "data", "craft");
fs.mkdirSync(dir, { recursive: true });

const index = cats.map((c) => ({
  slug: c.slug,
  title: c.title,
  cover: c.cover,
  href: c.href,
  designCount: c.subcategories.reduce((n, s) => n + s.designs.length, 0),
}));

for (const c of cats) {
  fs.writeFileSync(path.join(dir, `${c.slug}.json`), JSON.stringify(c, null, 2));
  console.log(
    "wrote",
    c.slug,
    c.subcategories.reduce((n, s) => n + s.designs.length, 0),
    "designs",
  );
}

const body = `/* Auto-generated craft portfolio index — do not edit by hand */

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

export const craftCategorySummaries: CraftCategorySummary[] = ${JSON.stringify(index, null, 2)};

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
`;

fs.writeFileSync("src/data/craft-portfolio.ts", body);
console.log("rewrote craft-portfolio.ts index");
