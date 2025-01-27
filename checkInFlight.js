// These are the parameters you - the user - will need to modify
const yourConfirmationNumber = '12341234';
const yourFirstName = 'Harry';
const yourLastName = 'Potter';
const targetTime = { 
    hour: 15, 
    minute: 0, 
    second: 30,
    milliseconds: 0
};
const yourCheckInTime = new Date();
yourCheckInTime.setHours(targetTime.hour, targetTime.minute, targetTime.second, targetTime.milliseconds);


// This function, when invoked, will check into your flight at a point in time. Intended to be used with a scheduler such as cron or TamperMonkey
function checkInFlight(confNbr, firstName, lastName, checkInTime) {
    document.addEventListener('DOMContentLoaded', function() {
        // Time check
        const currentTime = new Date();
        const timeUntilCheckIn = checkInTime - currentTime;

        // Time check
        if (timeUntilCheckIn > 0) {
            console.log(`Waiting ${timeUntilCheckIn} ms until the target time...`);
            setTimeout(() => {
                console.log(`Target time ${checkInTime} reached. Initiating autofill.`);
                autoFillAndSubmit();
                console.log('Your check in has been completed');
            }, timeUntilCheckIn);
        } else {
            console.log('The check in time has already passed');
            return;
        }

        // TODO: Function for autofillAndSubmit
        function autoFillAndSubmit() {
            // TODO: Check to see if these elements have even be loaded in yet
            // TODO: Create a variable for the submit button as well

            const confNumberInput = document.getElementById('confirmationNumber')
            const firstNameInput = document.getElementById('passengerFirstName')
            const lastNameInput = document.getElementById('passengerLastName')
            console.log(confNumberInput);
            const submitButton = document.getElementById('form-mixin--submit-button');
            
            // Fill in the form fields
            confNumberInput.value = confNbr;
            firstNameInput.value = firstName;
            lastNameInput.value = lastName;
            
            // TODO: Recheck to see if appropriate values have been filled in
            console.log(confNumberInput);
            console.log(firstNameInput);
            console.log(lastNameInput);
        }
    });
}

// Function invocation
checkInFlight(yourConfirmationNumber, yourFirstName, yourLastName, yourCheckInTime);