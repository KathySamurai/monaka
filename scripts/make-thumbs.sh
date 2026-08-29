#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/images"
DEST="$ROOT/public/images/thumbs"
mkdir -p "$DEST"

find "$SRC" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) | while IFS= read -r file; do
  name="$(basename "$file")"
  stem="${name%.*}"
  sips -Z 480 -s format jpeg "$file" --out "$DEST/${stem}.jpg" >/dev/null
done
