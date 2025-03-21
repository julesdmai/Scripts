// Function to strip links from input text

console.log("'stripLinks.js' running");

// Change input's value to your user-input text
const dummyText = `
MSI RTX 5080 Gaming Trio OC - https://geni.us/qRNhv
AMD Ryzen 7 9800X3D - https://geni.us/uJ0cLB
ASUS TUF Gaming X670E-Plus WIFI - https://geni.us/Yfx3m
Corsair Dominator Platinum 2x16GB, 6000 CL30-36-36-76 - https://geni.us/YBYI
Streacom BC1 Open Benchtable - https://geni.us/9PgRsf8
Custom water cooled (CPU) - MO-RA 360, EK-Quantum Velocity Full Nickel
Setup: https://bit.ly/3H117uA
`;
const inputText = "" || dummyText;

// This function removes all links from your input text
function stripLinks(text) {
    // Tokenize by lines
    // Loop through lines
        // Mutate string
    // Rejoin with line breaks
    // Return
}
const textWithoutLinks = stripLinks(inputText);
console.log("Text without links: ", textWithoutLinks);

console.log("'stripLinks.js' finished executing");
