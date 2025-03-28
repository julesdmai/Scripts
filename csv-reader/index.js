console.log('---- printData.js starting... ----')

const fs = require("fs");
const parse = require("csv-parse/sync");

const target = "../assets/test.csv"; // User inputs path to CSV file

function printData(source) {
  // Handle on target
  const fileContent = fs.readFileSync(source);

  // Parse and construct output
  const records = parse.parse(fileContent, {
    columsn: true,
    skip_empty_lines: true
  });
  return records;
}
const outputRecords = printData(target);
console.log('Records: ', outputRecords);

console.log('---- printData.js finished executing ----')