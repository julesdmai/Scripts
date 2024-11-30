// NOTE: This is the paramater you - the user - changes ex. 2025
const FOLDER_YEAR = 2024

// NOTE: 
// This function - when invoked with "node createFolders.js" will create a folder directory with the following structure
// 2024
// - 1 January
// - 2 February
// - ...
// - 12 December
// - - RAW
// - - JPEG
// - - Edited 

const fs = require('fs');
const path = require('path');

// Input: Number representing year which you - the user - have specified above
// Output: This function will - create a folder directory for the year - in the same parent directory that the script is located in
function createYearFolderStructure(year) {
    const parentDir = __dirname; // Parent directory is where the script is located
    const yearDir = path.join(parentDir, year.toString()); // Create the parent to child folder relationship

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Create the year folder if it doesn't exist
    if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir);
        console.log(`Created folder: ${yearDir}`);
    }

    // Loop through each month and create folders for each month
    months.forEach((month, index) => {
        const monthFolderName = `${index + 1} ${month}`; // Ex: "1 January"
        const monthDir = path.join(yearDir, monthFolderName);

        // Create the month folder if it doesn't exist
        if (!fs.existsSync(monthDir)) {
            fs.mkdirSync(monthDir);
            console.log(`Created folder: /${year}/${monthFolderName}`);
        }

        // Create subfolders "RAW", "JPEG", and "Edited" in each month folder
        ['RAW', 'JPEG', 'Edited'].forEach((subfolder, subIndex) => {
            const subfolderDir = path.join(monthDir, subfolder);

            if (!fs.existsSync(subfolderDir)) {
                fs.mkdirSync(subfolderDir);

                const subfolderNumber = index * 3 + subIndex + 1;
                console.log(`Created subfolder ${subfolderNumber}`);
            }
        });
    });
}

// Execute the function for the year 2024
createYearFolderStructure(FOLDER_YEAR);