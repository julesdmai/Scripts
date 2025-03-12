const sharp = require('sharp');
const fs = require('fs');
const path = require ('path');

// Point at file paths
const inputPath = '';
const outputName = 'CL' + Date.now();

function stripMetadata(inputPath, outputName) {
    // Check


    // Process the image: remove the metadata and save it with a new name
}
stripMetadata(inputPath, outputName);
console.log(`Metadata has been stripped from file ${outputName}`);