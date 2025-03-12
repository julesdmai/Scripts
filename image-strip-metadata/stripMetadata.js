const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Point at file paths
const inputPath = "";

// Helper function to get current date and time in YYYYMMDD-HHMMSS
const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
  return `${date}-${time}`;
};

async function stripMetadata(inputPath) {
  try {
    // Check
    if (!fs.existsSync(inputPath)) {
      console.error("Input file does not exist: ", inputPath);
      return;
    }

    // Generates output file name and path from inputPath
    const directory = path.dirname(inputPath);
    const outputName = "CL" + getCurrentDateTime() + ".jpg";
    const outputPath = path.join(directory, outputName);

    // Process the image: remove the metadata and save it with a new name
    await sharp(inputPath).withMetadata({ exif: false }).toFile(outputPath);
    console.log(`Metadata has been stripped, saved file as ${outputName}`);
  } catch (err) {
    console.error("Error processing image: ", err);
  }
}
stripMetadata(inputPath);
