#!/bin/bash
# trunc_rename_recursive.sh - recursively rename RAF/JPG to first 15 chars (YYYYMMDD_HHMMSS) + extension
#   trunc_rename_recursive.sh <folder>           preview
#   trunc_rename_recursive.sh <folder> --apply   rename (never overwrites; leftovers listed as SKIPPED)

folder="$1"
mode="$2"

# Guard if folder arg is not a directory
[ -d "$folder" ] || { echo "Usage: $0 <folder> [--apply]"; exit 1; }

find_photos() {
  find "$folder" -type f \( -name '2*_*.RAF' -o -name '2*_*.JPG' \)
}

find_photos | while IFS= read -r path; do
  dir="${path%/*}"      # strip shortest "/..." suffix  → parent directory
  name="${path##*/}"    # strip longest ".../" prefix   → basename
  stamp="${name:0:15}"  # substring, offset 0, length 15 → YYYYMMDD_HHMMSS
  ext="${name##*.}"     # strip longest "*." prefix     → extension

  if [ "$mode" = "--apply" ]; then
    mv -n "$path" "$dir/$stamp.$ext" 2>/dev/null
  else
    echo "$path -> $stamp.$ext"
  fi
done

if [ "$mode" = "--apply" ]; then
  find_photos | sed 's/^/SKIPPED: /'
fi