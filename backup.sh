#!/bin/bash

# Define the source directories
output_dir="./output"
uploads_dir="./uploads"

# Get today's date and timestamp
today_date_timestamp=$(date +'%Y%m%d%H%M%S')

# Define the destination backup directory
backup_dir="../backup-files/$today_date_timestamp"

# Create the destination directory if it doesn't exist
mkdir -p "$backup_dir"

# Copy the files from the output directory to the backup output subdirectory
cp -r "$output_dir" "$backup_dir/output"

# Copy the files from the uploads directory to the backup uploads subdirectory
cp -r "$uploads_dir" "$backup_dir/uploads"

# Delete files within the output directory (not the directory itself)
find "$output_dir" -type f -exec rm {} \;

# Delete files within the uploads directory (not the directory itself)
find "$uploads_dir" -type f -exec rm {} \;

echo "Files copied to $backup_dir"
