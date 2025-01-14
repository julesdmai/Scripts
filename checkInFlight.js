// These are the parameters you - the user - will need to modify
const confirmationNumber = 'YOUR_CONFIRMATION_NUMBER';
const firstName = 'YOUR_FIRST_NAME';
const lastName = 'YOUR_LAST_NAME';

// This function, when invoked, will check into your flight at a point in time. Intended to be used with a scheduler such as cron or TamperMonkey
function checkInFlight(number, first, last) {
    return;
}

// Execute
checkInFlight(confirmationNumber, firstName, lastName);