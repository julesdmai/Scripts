// These are the parameters you - the user - will need to modify
const yourConfirmationNumber = 'YOUR_CONFIRMATION_NUMBER';
const yourFirstName = 'YOUR_FIRST_NAME';
const yourLastName = 'YOUR_LAST_NAME';

// This function, when invoked, will check into your flight at a point in time. Intended to be used with a scheduler such as cron or TamperMonkey
function checkInFlight(confNbr, firstName, lastName) {
    return;
}

// Function invocation
checkInFlight(yourConfirmationNumber, yourFirstName, yourLastName);