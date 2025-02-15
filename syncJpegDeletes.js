/* 
The purpose of this script is to synchronize deletion of Raw-JPEG files.
Typically, a photographer will take photos in 2 formats: (1) Raw and (2) JPEG
The JPEG file would be used for initial viewing, culling, and sharing.
The RAW file would be used for maximum fidelity allowing for deeper edits.

When a photographer reviews their images, they will typically look through the JPEG files which are lighter weight allowing for quicker viewing.
However, when the user deletes the JPEG file (culling the photo), the RAW file still remains.
The purpose of this script is to check if the JPEG has been deleted, then go ahead and delete the corresponding raw file. 
*/

// Libraries
const fs = require('fs');
const path = require('path');

// IMPORTANT - IMPORTANT - IMPORTANT: User must input the route to the folder that this script will target
const directoryPath = '';
// *How do I find the route? Read below

// IMPORTANT - IMPORTANT - IMPORTANT: User must set this value to true for the script to run fully and delete the items
const RUN_IN_PROD_MODE = false;

// Main function
function syncJpegDeletes(directoryPath, isInProdMode) {
    // General console logs - target folder and running mode
    console.log(`Checking directory: ${directoryPath}`);
    isInProdMode
        ? console.log('Running in Prod Mode: Files will be deleted')
        : console.log(`Dry Run: Files will not be deleted`);

    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
        console.error(`Error: The directory "${directoryPath}" does not exist.`);
        console.error('Please re-check the directory path and try again.');
        return;
    }

    // Connect to directory path
    const files = fs.readdirSync(directoryPath)
    .filter(file => !file.startsWith('.') && file !== 'CaptureOne'); // Filter out hidden files such as .DS_Store and Folder "CaptureOne"
    console.log(`Files found: ${files.length}`)

    // Check if there are files in this directory
    if (files.length === 0) {
        console.warn(`Warning: The directory "${directoryPath}" is empty.`);
        console.warn('Please ensure the folder contains JPEG and RAW files.');
        return;
    }

    // Loop through JPEG files in the directory and cache the names
    const jpegFiles = new Set(
        files
            .filter(file => file.slice(-3).toLowerCase() === 'jpg')
            .map(file => file.slice(0, -4))
    )
    const numberOfJpegs = jpegFiles.size;
    const numberOfRaws = files.length - numberOfJpegs;
    console.log(`JPEGs found: ${numberOfJpegs}`);
    console.log(`RAWs found: ${numberOfRaws}`);
    console.log(`Expected total files (if 1 JPEG : 1 RAW): ${numberOfJpegs * 2}`);

    // Loop through RAW files and delete the ones without matching JPEGs
    let deleteCounter = 0;
    let failedDeleteCounter = 0;
    files.forEach(file => {
        if (file.slice(-3).toLowerCase() === 'raf') {
            const rawFileName = file.slice(0, -4);

            if (!jpegFiles.has(rawFileName)) {
                if (isInProdMode === true) {
                    try {
                        fs.unlinkSync(path.join(directoryPath, file));
                    } catch (error) {
                        console.error(`Failed to delete ${file}: ${error.message}`);
                        failedDeleteCounter++;
                    }
                }
                
                deleteCounter++;
            }
        }
    })

    console.log(`Failed to delete files: ${failedDeleteCounter}`);

    isInProdMode
        ? console.log(`Number of RAW files deleted: ${deleteCounter}`)
        : console.log(`Dry Run: Number of RAW files *would have been* deleted: ${deleteCounter}`)

    return;
}
syncJpegDeletes(directoryPath, RUN_IN_PROD_MODE);



// How do I find the route? Read below
// Right click on a file in the folder you want this script to target (a RAW or JPEG image)
// Select "Get Info" < "General" < "Where" < Select the entire value to the right of "Where"
// Paste the path you just copied into between the two single apostrophes (')