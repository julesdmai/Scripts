const sharp = require('sharp');
const fs = require('fs');
const path = require ('path');

// Point at file paths
const inputPath = '';

// Helper function to get current date and time in YYYYMMDD-HHMMSS
const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().slice(0,10).replace(/-/g, '');
    const time = now.toTimeString().slice(0,10).replace(/:/g, '');
    return `${date}-${time}`;
}

function stripMetadata(inputPath, outputName) {
    // Check
    if (!fs.existsSync(inputPath)) {
        console.error('Input file does not exist: ', inputPath);
        return;
    }
    // Process the image: remove the metadata and save it with a new name
    sharp(inputPath)
        .withMetadata({ exif: false })
        .toFile(outputName, (err, info) => {
            if (err) {
                console.error('Error processing image: ', err);
            } else {
                console.log('Image processed and saved');
            }
        })

}
stripMetadata(inputPath, outputName);
console.log(`Metadata has been stripped from file ${outputName}`);