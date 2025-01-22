// These are the parameters you - the user - modifies
const searchText = 'foo bar';
const targetTime = { hour: 13, minute: 5 }; // 1:05 PM in 24-hour format

const inputSelector = '.gLFyf'; // Class name for Google search input field
const buttonSelector = 'input[name="btnK"]'; // Name attribute for the Google search button

// Main function to handle timing logic and perform actions - calls on autofillAndSearch function
function handleTimedSearch() {
    const now = new Date();
    const target = new Date();
    target.setHours(targetTime.hour, targetTime.minute, 0, 0); // Set target time with zero seconds and milliseconds

    const timeDifference = target - now;

    if (timeDifference <= 0) {
        console.log('Target time has already passed. Exiting script.');
        return; 
    }

    if (timeDifference > 0) {
        console.log(`Waiting ${timeDifference} ms until the target time...`);
        setTimeout(() => {
            console.log(`Target time (${targetTime.hour}:${targetTime.minute}) reached.`);
            autofillAndSearch();
        }, timeDifference); // setTimeout waiting for the exact time difference
    }
}

// Function to autofill the input field and click the search button
function autofillAndSearch() {
    const searchInput = document.querySelector(inputSelector);
    const searchButton = document.querySelector(buttonSelector);

    if (searchInput && searchButton) {
        searchInput.value = searchText; // Fill the input field
        console.log(`Input field filled with: "${searchText}"`);
        searchButton.click(); // Click the search button
        console.log('Search button clicked.');
    } else {
        console.error('Search input or button not found.');
    }
}

// Start the timed logic
handleTimedSearch();