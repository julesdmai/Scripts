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
    const files = fs.readdirSync(directoryPath);
    console.log(`Checking ${files.length} files...`)
    console.log(files);
    return;
}
syncJpegDeletes(directoryPath);