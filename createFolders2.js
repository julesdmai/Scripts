// Work in progress
// TODO: Generalize the labels (but keep the example the same)
// TODO: Add descriptive console logs

// NOTE: 
// This function - when invoked with "node createFolders.js" - will create a folder directory with the following structure
// 2024
// - 1 January
// - 2 February
// - ...
// - 12 December
// - - RAW
// - - JPEG
// - - Edited 

// NOTE: These are the paramaters you - the user - changes ex. [2025], [...months of the year], [RAW, JPEG, Edited]
const parentFolderName = '2024'
const subfolderNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
const subSubfolderNames = ['RAW', 'JPEG', 'Edited'];

const fs = require('fs');
const path = require('path');

// Input: Number representing year which you - the user - have specified above
// Output: This function will - create a folder directory for the year - in the same parent directory that the script is located in
function createFolderStructure(folderName) {
    const parentDir = __dirname; // Parent directory is where the script is located
    const folderDir = path.join(parentDir, folderName.toString()); // Create the parent to child folder relationship

    // Create the year folder if it doesn't exist
    if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir);
        console.log(`Created parent folder: ${folderDir}`);
    }

    // Loop through each month and create folders for each month
    subfolderNames.forEach((month, index) => {
        const subfolderName = `${index + 1} ${month}`; // Ex: "1 January"
        const monthDir = path.join(folderDir, subfolderName);

        // Create the month folder if it doesn't exist
        if (!fs.existsSync(monthDir)) {
            fs.mkdirSync(monthDir);
            console.log(`Created subfolder: /${folderName}/${subfolderName}`);
        }

        // Create subSbfolders "RAW", "JPEG", and "Edited" in each month folder
        subSubfolderNames.forEach((subfolder, subIndex) => {
            const subfolderDir = path.join(monthDir, subfolder);

            if (!fs.existsSync(subfolderDir)) {
                fs.mkdirSync(subfolderDir);

                const subSubfolderNumber = index * 3 + subIndex + 1;
                console.log(`Created sub-Subfolder ${subSubfolderNumber}`);
            }
        });
    });
}

// Execute the function for the parent folder "2024"
createFolderStructure(parentFolderName);