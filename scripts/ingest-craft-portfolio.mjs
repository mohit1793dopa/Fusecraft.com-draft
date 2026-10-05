import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_MAJOR = path.join(
  ROOT,
  "public",
  "images",
  "8 major categories and its inner categories",
);
const SRC_BROWSE = path.join(ROOT, "public", "images", "browse by craft");
const OUT_CRAFT = path.join(ROOT, "public", "images", "craft");
const OUT_BROWSE = path.join(ROOT, "public", "images", "browse-by-craft");
const OUT_DATA = path.join(ROOT, "src", "data", "craft-portfolio.ts");

const WEB_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const CATEGORY_MAP = [
  { folder: "BEDS", slug: "beds", title: "Beds" },
  { folder: "CHAIRS", slug: "chairs", title: "Chairs" },
  { folder: "DOORS", slug: "doors", title: "Doors" },
  { folder: "JHULA", slug: "jhula", title: "Jhula" },
  { folder: "LIGHTINGS", slug: "lightings", title: "Lightings" },
  { folder: "PARTITIONS", slug: "partitions", title: "Partitions" },
  { folder: "SOFA", slug: "sofa", title: "Sofa" },
  { folder: "TABLES", slug: "tables", title: "Tables" },
];

const BROWSE_COVERS = [
  { src: "1 bed.png", out: "beds.jpg", slug: "beds" },
  { src: "2 chair.jpeg", out: "chairs.jpg", slug: "chairs" },
  { src: "3 doors.jpg", out: "doors.jpg", slug: "doors" },
  { src: "4  jhula.jpeg", out: "jhula.jpg", slug: "jhula" },
  { src: "5 chandliaer.jpg", out: "lightings.jpg", slug: "lightings" },
  { src: "6 partition.jpg", out: "partitions.jpg", slug: "partitions" },
  { src: "7 sofa.jpg", out: "sofa.jpg", slug: "sofa" },
  { src: "8 center table.png", out: "tables.jpg", slug: "tables" },
];

function slugify(input) {
  return String(input)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "item";
}

function titleize(input) {
  const raw = String(input)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // bed codes like bd1
  if (/^bd\s*\d+$/i.test(raw)) {
    return `Bed ${raw.replace(/\D/g, "").padStart(2, "0")}`;
  }
  const fixes = {
    ornage: "Orange",
    laonge: "Lounge",
    beench: "Bench",
    anguar: "Angular",
    entrace: "Entrance",
    mian: "main",
    ding: "dining",
    chnadilier: "chandelier",
    chandilier: "chandelier",
    parttion: "partition",
    cosole: "console",
    centter: "center",
    marrble: "marble",
  };
  return raw
    .split(" ")
    .map((w) => {
      const lower = w.toLowerCase();
      if (fixes[lower]) return fixes[lower];
      if (/^(fc|tv)$/i.test(w)) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

function isWebImage(file) {
  return WEB_EXT.has(path.extname(file).toLowerCase());
}

function isMainName(name) {
  return /main/i.test(name);
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter(isWebImage);
}

async function optimizeToJpeg(srcPath, destPath, { width = 1600, height = 1600, quality = 82 } = {}) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const tmp = destPath + ".tmp.jpg";
  await sharp(srcPath)
    .rotate()
    .resize({ width, height, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(tmp);
  if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
  fs.renameSync(tmp, destPath);
}

function pickMainAndGallery(files) {
  const mains = files.filter(isMainName);
  const main = mains[0] || files[0];
  if (!main) return { main: null, gallery: [] };
  const gallery = files.filter((f) => f !== main);
  // Prefer main first in gallery list for lightbox continuity
  return { main, gallery: [main, ...gallery] };
}

/**
 * Collect design leaf folders.
 * Returns array of { subcategory, group, designName, absPath }
 */
function collectDesigns(categoryAbs) {
  const results = [];
  const topDirs = listDirs(categoryAbs);
  const topFiles = listFiles(categoryAbs);

  // JHULA-style: images at category root
  if (topFiles.length && topDirs.length === 0) {
    results.push({
      subcategory: "All",
      group: null,
      designName: path.basename(categoryAbs),
      absPath: categoryAbs,
      flatFiles: true,
    });
    return results;
  }

  for (const top of topDirs) {
    const topPath = path.join(categoryAbs, top);
    const midDirs = listDirs(topPath);
    const midFiles = listFiles(topPath);

    // Design folder directly under category (Beds, Doors, Sofa, Partitions)
    if (midFiles.length > 0 && midDirs.length === 0) {
      results.push({
        subcategory: "All",
        group: null,
        designName: top,
        absPath: topPath,
      });
      continue;
    }

    // Subcategory with designs (or nested groups)
    for (const mid of midDirs) {
      const midPath = path.join(topPath, mid);
      const leafDirs = listDirs(midPath);
      const leafFiles = listFiles(midPath);

      if (leafFiles.length > 0 && leafDirs.length === 0) {
        results.push({
          subcategory: top,
          group: null,
          designName: mid,
          absPath: midPath,
        });
        continue;
      }

      // Nested group (e.g. FC clap / red black chair)
      if (leafDirs.length > 0) {
        for (const leaf of leafDirs) {
          const leafPath = path.join(midPath, leaf);
          const files = listFiles(leafPath);
          if (files.length === 0) continue;
          results.push({
            subcategory: top,
            group: mid,
            designName: leaf,
            absPath: leafPath,
          });
        }
        continue;
      }

      // CORNER TABLES style: subcategory folder that is itself a design (files only under TABLES/CORNER TABLES)
      // handled above when mid has files
    }

    // Rare: subcategory folder that only has files (treated as one design)
    if (midFiles.length > 0 && midDirs.length === 0) {
      // already handled
    }
  }

  // TABLES/CORNER TABLES: top is CORNER TABLES with files only — handled as design under All if no midDirs
  // Also handle when top has both? skip

  return results;
}

async function ingestCategory(cat) {
  const categoryAbs = path.join(SRC_MAJOR, cat.folder);
  if (!fs.existsSync(categoryAbs)) {
    console.warn("missing category", cat.folder);
    return null;
  }

  const designsRaw = collectDesigns(categoryAbs);
  const usedSlugs = new Set();
  const bySub = new Map();

  for (const d of designsRaw) {
    const files = listFiles(d.absPath);
    if (files.length === 0) {
      console.log("  skip (no web images):", cat.slug, d.designName);
      continue;
    }

    const { main, gallery } = pickMainAndGallery(files);
    if (!main) continue;

    const designSlugBase = slugify(
      [d.group, d.designName].filter(Boolean).join("-") || d.designName,
    );
    let designSlug = designSlugBase;
    let n = 2;
    while (usedSlugs.has(designSlug)) {
      designSlug = `${designSlugBase}-${n++}`;
    }
    usedSlugs.add(designSlug);

    const finalOut = path.join(OUT_CRAFT, cat.slug, designSlug);
    fs.mkdirSync(finalOut, { recursive: true });

    await optimizeToJpeg(path.join(d.absPath, main), path.join(finalOut, "main.jpg"), {
      width: 1400,
      height: 1400,
      quality: 80,
    });

    const images = [`/images/craft/${cat.slug}/${designSlug}/main.jpg`];
    let idx = 1;
    for (const g of gallery) {
      if (g === main) continue;
      const name = String(idx).padStart(2, "0") + ".jpg";
      await optimizeToJpeg(path.join(d.absPath, g), path.join(finalOut, name), {
        width: 1600,
        height: 1600,
        quality: 80,
      });
      images.push(`/images/craft/${cat.slug}/${designSlug}/${name}`);
      idx++;
    }

    const subKey = d.subcategory || "All";
    if (!bySub.has(subKey)) bySub.set(subKey, []);
    const title = d.flatFiles
      ? cat.title
      : titleize([d.group, d.designName].filter(Boolean).join(" — "));

    bySub.get(subKey).push({
      slug: designSlug,
      title,
      main: `/images/craft/${cat.slug}/${designSlug}/main.jpg`,
      images,
    });

    console.log("  +", cat.slug, "/", designSlug, `(${images.length} imgs)`);
  }

  const coverBrowse = BROWSE_COVERS.find((c) => c.slug === cat.slug);
  const cover = coverBrowse
    ? `/images/browse-by-craft/${coverBrowse.out}`
    : bySub.values().next().value?.[0]?.main || "";

  /** Preferred filter order for category chips (unlisted titles keep discovery order). */
  const SUBCATEGORY_ORDER = {
    chairs: ["dining and cafe chairs", "lounge chairs", "benches"],
  };

  const preferred = SUBCATEGORY_ORDER[cat.slug] ?? [];
  const entries = [...bySub.entries()].sort(([a], [b]) => {
    const ia = preferred.indexOf(a.toLowerCase());
    const ib = preferred.indexOf(b.toLowerCase());
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  const subcategories = entries.map(([title, designs]) => ({
    slug: slugify(title),
    title: title === "All" ? "All designs" : titleize(title),
    designs,
  }));

  return {
    slug: cat.slug,
    title: cat.title,
    cover,
    href: `/craft/${cat.slug}`,
    subcategories,
  };
}

async function ingestBrowseCovers() {
  fs.mkdirSync(OUT_BROWSE, { recursive: true });
  for (const c of BROWSE_COVERS) {
    const src = path.join(SRC_BROWSE, c.src);
    if (!fs.existsSync(src)) {
      console.warn("missing browse cover", c.src);
      continue;
    }
    const dest = path.join(OUT_BROWSE, c.out);
    await optimizeToJpeg(src, dest, { width: 1200, height: 1200, quality: 82 });
    console.log("cover", c.out);
  }
}

function emitTs(categories) {
  const craftDir = path.join(ROOT, "src", "data", "craft");
  fs.mkdirSync(craftDir, { recursive: true });

  const index = categories.map((c) => ({
    slug: c.slug,
    title: c.title,
    cover: c.cover,
    href: c.href,
    designCount: c.subcategories.reduce((n, s) => n + s.designs.length, 0),
  }));

  for (const c of categories) {
    fs.writeFileSync(
      path.join(craftDir, `${c.slug}.json`),
      JSON.stringify(c, null, 2),
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
  fs.writeFileSync(OUT_DATA, body, "utf8");
  console.log("wrote", OUT_DATA);
}

async function main() {
  console.log("Ingesting browse covers…");
  await ingestBrowseCovers();

  if (fs.existsSync(OUT_CRAFT)) {
    fs.rmSync(OUT_CRAFT, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_CRAFT, { recursive: true });

  const categories = [];
  for (const cat of CATEGORY_MAP) {
    console.log("\nCategory", cat.folder);
    const result = await ingestCategory(cat);
    if (result) categories.push(result);
  }

  emitTs(categories);
  console.log("\nDone.", categories.length, "categories");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
