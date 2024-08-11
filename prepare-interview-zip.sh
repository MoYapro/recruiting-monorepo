#!/bin/bash

# Get today's date
TODAY=$(date +"%Y%m%d")

# Define available options
BACKEND_OPTIONS=("csharp" "java" "kotlin" "api-mock")
FRONTEND_OPTIONS=("angular" "react" "vue")

# Function to prompt the user to select an option
select_option() {
    PS3="Please choose $1: "
    select opt in "${!2}"; do
        if [[ -n $opt ]]; then
            echo "$opt"
            break
        else
            echo "Invalid option. Try again."
        fi
    done
}

# Prompt user for backend and frontend selection
BACKEND=$(select_option "backend" BACKEND_OPTIONS[@])
echo 
FRONTEND=$(select_option "frontend" FRONTEND_OPTIONS[@])
echo
echo "Processing..."

# Create target folder
TARGET_FOLDER="coding_case_${TODAY}"
mkdir -p "${TARGET_FOLDER}/backend"
mkdir -p "${TARGET_FOLDER}/frontend"

# Copy necessary files
cp -r openapi "$TARGET_FOLDER/"
if [ "$BACKEND" == "api-mock" ]; then
    cp -r "api-mock" "${TARGET_FOLDER}/backend/"
else
    cp -r "backend/${BACKEND}" "${TARGET_FOLDER}/backend/"
    cp backend/*.sql "${TARGET_FOLDER}/backend/"
fi
cp -r "frontend/${FRONTEND}" "${TARGET_FOLDER}/frontend/"

# Zip the folder, overwrite if the zip already exists
ZIP_FILE="${TARGET_FOLDER}.zip"
rm -f "$ZIP_FILE"
zip -rq "$ZIP_FILE" "$TARGET_FOLDER"

# Delete the temp folder
rm -rf "$TARGET_FOLDER"

echo "Coding case prepared and zipped into $(pwd)/${ZIP_FILE}"
