import { readdir } from "fs/promises";
import path from "path";
import { asset } from "@/lib/asset";
import type { SnapshotPhoto } from "@/lib/snapshots";

const PHOTO_DIR = path.join(process.cwd(), "public/images");
const PHOTO_EXT = /\.(jpe?g|png|webp|gif)$/i;

export async function getSnapshotPhotos(): Promise<SnapshotPhoto[]> {
  try {
    const files = await readdir(PHOTO_DIR, { withFileTypes: true });
    return files
      .filter((entry) => entry.isFile() && PHOTO_EXT.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((file, index) => {
        const stem = file.replace(/\.[^.]+$/, "");
        return {
          src: asset(`/images/thumbs/${stem}.jpg`),
          fullSrc: asset(`/images/${file}`),
          alt: `もなかのようす ${index + 1}`,
        };
      });
  } catch {
    return [];
  }
}
