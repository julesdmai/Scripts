// Execute function for the following year
const FOLDER_YEAR = 2024;

const { subscribe } = require('diagnostics_channel');
const fs = require('fs');
const path = require('path');

function createYearFolderStructure(year) {
    const parentDir = __dirname; // Directory where the script is located
    const yearDir = path.join(parentDir, year.toString()); // Path for the year folder

    // Array of months
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Create the year folder if it doesn't exist
    if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir);
        console.log(`Created folder: ${yearDir}`);
    }

    // Loop through each month and create folders
    months.forEach((month, index) => {
        const monthFolderName = `${index + 1} ${month}`; // Ex: "1 January"
        const monthDir = path.join(yearDir, monthFolderName);

        // Create the month folder
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