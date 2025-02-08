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

// User input parameters
const directoryPath = '';

// Main function
function syncJpegDeletes(directoryPath) {
    const files = fs.readdirSync(directoryPath)
        .filter(file => !file.startsWith('.')); // Filter out hidden files such as .DS_Store
    console.log(`Files found: ${files.length}`)

    // Loop through JPEG files in the directory and cache the names
    const jpegFiles = new Set(
        files
            .filter(file => file.slice(-3).toLowerCase() === 'jpg')
            .map(file => file.slice(0, -4))
    )
    const numberOfJpegs = jpegFiles.size;
    console.log(`JPEGs found: ${numberOfJpegs}`)
    console.log(`There should be <${numberOfJpegs * 2}> files`);

    // Loop through RAW files and delete the ones without matching JPEGs
    let deleteCounter = 0;
    files.forEach(file => {
        if (file.slice(-3).toLowerCase() === 'raf') {
            const rawFileName = file.slice(0, -4);

            if (!jpegFiles.has(rawFileName)) {
                fs.unlinkSync(path.join(directoryPath, file));
                deleteCounter++;
            }
        }
    })
    console.log(`Number of RAW files deleted: ${deleteCounter}`);

    return;
}
syncJpegDeletes(directoryPath);