import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const media = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src", "data", "project-media.json"), "utf8"),
);
let site = fs.readFileSync(path.join(ROOT, "src", "data", "site.ts"), "utf8");

function formatList(arr) {
  if (!arr.length) return "";
  return arr.map((x) => `      "${x}"`).join(",\n") + "\n";
}

for (const [slug, data] of Object.entries(media)) {
  const galleryInner = formatList(data.gallery);
  const catalogInner = formatList(data.catalog);
  const block =
    `gallery: [\n${galleryInner}    ],\n` +
    `    catalog: [\n${catalogInner}    ],`;

  // Replace from gallery through the last catalog before color/closing
  const pattern = new RegExp(
    `(slug: "${slug}"[\\s\\S]*?)gallery: \\[[\\s\\S]*?\\],\\s*(?:catalog: \\[[\\s\\S]*?\\],\\s*)+`,
    "m",
  );

  if (!pattern.test(site)) {
    console.warn("no match", slug);
    continue;
  }

  site = site.replace(pattern, `$1${block}\n    `);
  console.log(
    "updated",
    slug,
    "gallery",
    data.gallery.length,
    "catalog",
    data.catalog.length,
  );
}

fs.writeFileSync(path.join(ROOT, "src", "data", "site.ts"), site);
console.log("synced site.ts");
