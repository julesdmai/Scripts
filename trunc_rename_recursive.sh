#!/usr/bin/env bash
# pair.sh - recursively rename RAF/JPG to YYYYMMDD_HHMMSS.<ext>
#   pair.sh <folder>           preview
#   pair.sh <folder> --apply   rename (never overwrites; collisions listed as SKIPPED)
# Requires bash 4+ (associative array).
set -u

usage() { echo "Usage: $0 <folder> [--apply]" >&2; exit 1; }å

folder=${1:-}
mode=${2:-}

[[ -d $folder ]]                   || usageå
[[ -z $mode || $mode == --apply ]] || usage

# All RAF/JPG files (any case) under $folder, NUL-delimited, sorted
find_photos() {
  find "$folder" -type f \( -iname '*.raf' -o -iname '*.jpg' \) -print0 | sort -z
}

(( BASH_VERSINFO[0] >= 4 )) || { echo "bash 4+ required (brew install bash)" >&2; exit 1; }
declare -A claimed   # dir/stamp -> source stem that owns it

# Note: the piped loop runs in a subshell. Fine here ($claimed only matters
# inside the loop), but use `done < <(find_photos)` if you later need loop
# state afterward, e.g. a skip count summary.
find_photos | while IFS= read -r -d '' path; do
  dir=${path%/*}     # parent directory
  name=${path##*/}   # basename
  ext=${name##*.}    # extension, original case preserved

  # Skip anything not starting with YYYYMMDD_HHMMSS
  [[ $name =~ ^([0-9]{8}_[0-9]{6}) ]] || continue
  stamp=${BASH_REMATCH[1]}
  target="$dir/$stamp.$ext"

  stem=${name%.*}; key="$dir/$stamp"
  [[ $path == "$target" ]] && { claimed[$key]=$stamp; continue; }
  owner=${claimed[$key]:-}
  if [[ -e $target || ( -n $owner && $owner != "$stem" ) ]]; then
    echo "SKIPPED: $path ($stamp.$ext taken)"; continue
  fi
  claimed[$key]=$stem

  echo "$path -> $stamp.$ext"
  [[ $mode == --apply ]] && mv -n -- "$path" "$target"
done