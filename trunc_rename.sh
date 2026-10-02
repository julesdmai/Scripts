# pair.sh - rename RAF/JPG to first 15 chars (YYYYMMDD-HHMMSS) + extension.

#   pair.sh <folder>           preview
#   pair.sh <folder> --apply   rename (never overwrites; anything left over is listed as SKIPPED)

cd "$1" || { echo "Usage: $0 <folder> [--apply]"; exit 1; }
 
for f in 2*_*.RAF 2*_*.JPG; do
  [ -e "$f" ] || continue
  new="${f:0:15}.${f##*.}"
  if [ "$2" = "--apply" ]; then mv -n "$f" "$new" 2>/dev/null; else echo "$f -> $new"; fi
done
 
if [ "$2" = "--apply" ]; then
  ls 2*_*.RAF 2*_*.JPG 2>/dev/null | sed 's/^/SKIPPED: /'
fi
 
# LINE 1 = DRY RUN
# LINE 2 = REAL RUN
# bash trunc_rename.sh "/Volumes/ARCHIVE/PHOTOS/2024/2024-06-07"
# bash trunc_rename.sh "/Volumes/ARCHIVE/PHOTOS/2024/2024-09-07" --apply
