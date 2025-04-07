console.log('---- printData.js starting... ----')

const fs = require("fs");
const parse = require("csv-parse/sync");

const target = "../assets/test.csv"; // User inputs path to CSV file

function printData(source) {
  // Obtain handle on target
  const fileContent = fs.readFileSync(source);

  // Parse and construct output
  const records = parse.parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
  console.log('pre-filter record count: ', records.length);

  // Filter out records where key or value is empty string ('')
  const cleanedRecords = records.map((row) => {
    // Convert each row's object into tuples ie. [key, value] pairs
    const entries = Object.entries(row);

    // Filter out entries that are empty
    const filtered = entries.filter(([key, val]) => key !== '' && val !== '');
    
    // Convert filtered back into an object
    const cleanedRow = Object.fromEntries(filtered);
    return cleanedRow;
  });
  console.log('post-filter record count: ', cleanedRecords.length);
  return cleanedRecords;
}
// Function invocation
const outputRecords = printData(target);
console.log('Records: ', outputRecords);

console.log('---- printData.js finished executing ----')