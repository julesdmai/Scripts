// These are the parameters you - the user - will need to modify
const yourConfirmationNumber = 'YOUR_CONFIRMATION_NUMBER';
const yourFirstName = 'YOUR_FIRST_NAME';
const yourLastName = 'YOUR_LAST_NAME';
const yourCheckInTime = new Date('2025-01-01T12:00:00') // Adjust to your check-in time

// This function, when invoked, will check into your flight at a point in time. Intended to be used with a scheduler such as cron or TamperMonkey
function checkInFlight(confNbr, firstName, lastName, checkInTime) {
    'use strict';

    // Wrapper to ensure DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Fill in the form fields
        document.getElementById('confirmationNumber').value = confNbr;
        document.getElementById('passengerFirstName').value = firstName;
        document.getElementById('passengerLastName').value = lastName;

        // Submit the form at a specific time
        const currentTime = new Date();
        const timeUntilCheckIn = checkInTime - currentTime;

        // Time check
        if (timeUntilCheckIn > 0) {
            setTimeout(() => {
                document.querySelector('button[type="submit"]').click();
            }, timeUntilCheckIn);
            console.log('Your check in has been completed');
            return;
        } else {
            console.log('The check in time has already passed');
            return;
        }
    });
}

// Function invocation
checkInFlight(yourConfirmationNumber, yourFirstName, yourLastName, yourCheckInTime);