// These are the parameters you - the user - will need to modify
const yourConfirmationNumber = '12341234';
const yourFirstName = 'John';
const yourLastName = 'Doe';
const targetTime = { 
    hour: 13, 
    minute: 5, 
    second: 0,
    milliseconds: 0
}; // 1:05 PM in 24-hour format
const yourCheckInTime = new Date();
yourCheckInTime.setHours(targetTime.hour, targetTime.minute, targetTime.second, targetTime.milliseconds);

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
                console.log('Your check in has been completed');
            }, timeUntilCheckIn);
        } else {
            console.log('The check in time has already passed');
            return;
        }
    });
}

// Function invocation
checkInFlight(yourConfirmationNumber, yourFirstName, yourLastName, yourCheckInTime);