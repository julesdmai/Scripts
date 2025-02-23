const fs = require('fs');
const path = require('path');

// User must set these paths
const jpegDirectory = ''; // Directory containing culled JPEGs
const rawSourceDirectory = ''; // Directory containing all RAW files
const rawDestinationDirectory = ''; // Directory where matching RAWs should be moved

// Set to true for actual file moves, false for dry run
const PRODUCTION_MODE = false;

// Allowed RAW file extensions (update if using a different format)
const RAW_EXTENSIONS = new Set(['RAF']);

function extractMatchingRaws(jpegDir, rawSrcDir, rawDestDir, isProdMode) {
    console.log(`Scanning JPEG directory: ${jpegDir}`);
    console.log(`Scanning RAW source directory: ${rawSrcDir}`);
    console.log(`RAW files will be moved to: ${rawDestDir}`);
    console.log(isProdMode ? 'Running in PRODUCTION mode: Files will be moved.' : 'Dry run mode: No files will be moved.');

    // Ensure all directories exist
    if (!fs.existsSync(jpegDir)) {
        console.error(`Error: The JPEG directory "${jpegDir}" does not exist.`);
        return;
    }
    if (!fs.existsSync(rawSrcDir)) {
        console.error(`Error: The RAW source directory "${rawSrcDir}" does not exist.`);
        return;
    }
    if (!fs.existsSync(rawDestDir)) {
        console.error(`Error: The RAW destination directory "${rawDestDir}" does not exist.`);
        return;
    }

    // Get all JPEG file names (without extension)
    const jpegFiles = new Set(
        fs.readdirSync(jpegDir)
            .filter(file => file.toLowerCase().endsWith('.jpg'))
            .map(file => path.parse(file).name)
    );
    console.log(`JPEGs found: ${jpegFiles.size}`);

    // Short-circuit if no JPEGs found
    if (jpegFiles.size === 0) {
        console.error("Error: No JPEGs found in the directory. Ensure you have culled images before running the script.");
        return;
    }

    // Find matching RAW files and move them
    let movedCounter = 0;
    let failedCounter = 0;
    const rawFiles = fs.readdirSync(rawSrcDir);

    rawFiles.forEach(file => {
        const ext = file.split('.').pop().toLowerCase();
        if (!RAW_EXTENSIONS.has(ext)) return; // This file is not a RAW file

        const rawFileName = path.parse(file).name;
        if (!jpegFiles.has(rawFileName)) return; // This matching JPG did not survive culling

        // Checks passed, moving file
        if (isProdMode) {
            try {
                fs.renameSync(
                    path.join(rawSrcDir, file),
                    path.join(rawDestDir, file)
                );
                movedCounter++;
            } catch (error) {
                console.error(`Failed to move ${file}: ${error.message}`);
                failedCounter++;
            }
        } else {
            movedCounter++;
        }
    });

    if (isProdMode) {
        console.log(`RAW files successfully moved: ${movedCounter}`);
        console.log(`Failed to move files: ${failedCounter}`);
    } else if (!isProdMode) {
        console.log(`[Dry Run] RAW files that would have been moved: ${movedCounter}`);
    }
}

extractMatchingRaws(jpegDirectory, rawSourceDirectory, rawDestinationDirectory, PRODUCTION_MODE);
