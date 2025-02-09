#!/bin/bash


# IMPORTANT - IMPORTANT - IMPORTANT: User must input the path to their source and destination folders
# IMPORTANT - IMPORTANT - IMPORTANT: Need the trailing "/"
SOURCE="/"
DESTINATION="/"

# Count the number of files in the source directory
FILE_COUNT=$(find "$SOURCE" -type f | wc -l)
echo "$FILE_COUNT files in the source directory."

# "--whole-file" disables the delta-transfer algorithm
rsync -av --whole-file --progress "$SOURCE" "$DESTINATION"
echo "$(date): Transferred $FILE_COUNT files from SD card to Intake" >> ~/transfer_log.txt

# Notify when done
osascript -e "display notification \"File transfer complete! $FILE_COUNT files copied.\" with title \"Photo Import\""