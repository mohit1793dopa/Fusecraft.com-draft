import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public", "images", "projects");
const OUT = path.join(ROOT, "public", "images", "project-media");

const PROJECTS = [
  { folder: "1 matra cafe", slug: "matra-cafe", galleryEven: 6 },
  { folder: "2 akbar residence", slug: "akbr-residence", galleryEven: 6 },
  { folder: "3 fc clap", slug: "fc-clap", galleryEven: 4 },
  { folder: "4 riwayat dining", slug: "riwayat-fine-dining", galleryEven: 4 },
  { folder: "5 fidvi residence", slug: "fidvi-residence", galleryEven: 6 },
];

const WEB_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function optimize(src, dest, { width, quality = 82 } = {}) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(src)
    .rotate()
    .resize({ width, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(dest);
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => path.join(dir, d.name))
    .filter((f) => WEB_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function isCover(filePath) {
  return /(?:^|[\\/])1\s*cover\./i.test(filePath);
}

function uniqueFiles(files) {
  const seen = new Set();
  const out = [];
  for (const f of files) {
    const key = path.basename(f).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
}

function evenSlice(files, maxEven) {
  const n = Math.min(maxEven, files.length - (files.length % 2));
  return files.slice(0, n);
}

async function ingestOne(project) {
  const srcDir = path.join(SRC, project.folder);
  if (!fs.existsSync(srcDir)) {
    console.warn("missing", project.folder);
    return null;
  }

  const outDir = path.join(OUT, project.slug);
  const catalogDir = path.join(outDir, "catalog");
  fs.mkdirSync(catalogDir, { recursive: true });

  const rootImages = listImages(srcDir);
  const detailDirs = ["detail catelog", "detailed catelog", "detail catalog"]
    .map((n) => path.join(srcDir, n))
    .filter((d) => fs.existsSync(d));
  const detailImages = uniqueFiles(detailDirs.flatMap(listImages));

  const coverSrc =
    rootImages.find(isCover) || rootImages[0] || detailImages[0];
  if (!coverSrc) {
    console.warn("no images", project.slug);
    return null;
  }

  const galleryPool = uniqueFiles(
    rootImages.filter((f) => !isCover(f) && f !== coverSrc),
  );
  const gallerySrc = evenSlice(galleryPool, project.galleryEven);

  await optimize(coverSrc, path.join(outDir, "cover.jpg"), {
    width: 2200,
    quality: 84,
  });
  console.log("cover", project.slug);

  const gallery = [];
  for (let i = 0; i < gallerySrc.length; i++) {
    const name = `${String(i + 1).padStart(2, "0")}.jpg`;
    await optimize(gallerySrc[i], path.join(outDir, name), {
      width: 1800,
      quality: 82,
    });
    gallery.push(`/images/project-media/${project.slug}/${name}`);
    console.log("  gallery", name);
  }

  // Prefer detail-catalog JPGs; if folder is empty / CR3-only, reuse gallery
  // so every project still gets the Product & chair details marquee.
  const catalogSrc =
    detailImages.length > 0
      ? detailImages
      : uniqueFiles([...gallerySrc, ...galleryPool]).slice(0, 8);
  if (detailImages.length === 0 && catalogSrc.length > 0) {
    console.log(
      "  catalog fallback: no web images in detail folder — using gallery stills",
    );
  }

  const catalog = [];
  for (let i = 0; i < catalogSrc.length; i++) {
    const name = `${String(i + 1).padStart(2, "0")}.jpg`;
    await optimize(catalogSrc[i], path.join(catalogDir, name), {
      width: 1400,
      quality: 82,
    });
    catalog.push(`/images/project-media/${project.slug}/catalog/${name}`);
    console.log("  catalog", name);
  }

  return {
    slug: project.slug,
    cover: `/images/project-media/${project.slug}/cover.jpg`,
    gallery,
    catalog,
  };
}

async function main() {
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const results = {};
  for (const p of PROJECTS) {
    console.log("\nProject", p.slug);
    const r = await ingestOne(p);
    if (r) results[p.slug] = r;
  }

  fs.writeFileSync(
    path.join(ROOT, "src", "data", "project-media.json"),
    JSON.stringify(results, null, 2),
  );
  console.log("\ndone");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
