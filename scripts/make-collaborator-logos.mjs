import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images", "collaborators");
fs.mkdirSync(dir, { recursive: true });

const marks = [
  ["studio-tint", "Studio Tint", "ST"],
  ["venetian-design", "Venetian Design", "VD"],
  ["stoneage-nagpur", "Stoneage Nagpur", "SA"],
  ["variety-enterprises", "Variety Enterprises", "VE"],
  ["moksh-lightings", "Moksh Lightings", "ML"],
  ["wall-souls", "Wall Souls", "WS"],
];

function svg(name, initials) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
  <rect width="480" height="480" fill="#E6CCB2"/>
  <circle cx="240" cy="200" r="78" fill="none" stroke="#31331F" stroke-width="3"/>
  <text x="240" y="214" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="600" fill="#31331F">${initials}</text>
  <text x="240" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-weight="500" fill="#31331F">${name}</text>
</svg>`;
}

for (const [slug, name, init] of marks) {
  const out = path.join(dir, `${slug}.png`);
  await sharp(Buffer.from(svg(name, init))).png().toFile(out);
  console.log("wrote", out);
}

const firdos = path.join(dir, "firdos-furnitures.png");
if (fs.existsSync(firdos)) {
  const tmp = path.join(dir, "firdos-tmp.png");
  await sharp(firdos)
    .resize(480, 480, {
      fit: "contain",
      background: { r: 230, g: 204, b: 178, alpha: 1 },
    })
    .png()
    .toFile(tmp);
  fs.renameSync(tmp, firdos);
  console.log("optimized firdos");
}
