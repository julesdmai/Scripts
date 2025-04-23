// require * as d3 from "d3";

console.log("---- printData.js starting... ----");

const fs = require("fs");
const parse = require("csv-parse/sync");

const target = "../assets/test.csv"; // User inputs path to CSV file

function printData(source) {
  // Obtain handle on target
  const fileContent = fs.readFileSync(source);

  // Obtain records in array of objects with columns as keys
  const records = parse.parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
  console.log("pre-filter column count: ", Object.keys(records[0]).length);

  // Filter out records where key is empty string ('')
  const cleanedRecords = records.map((row) => {
    // Convert each row's object into tuples ie. [key, value] pairs
    const entries = Object.entries(row);
    const filtered = entries.filter(([key, val]) => key !== "");

    // Convert filtered back into an object
    const cleanedRow = Object.fromEntries(filtered);
    return cleanedRow;
  });
  console.log(
    "post-filter column count: ",
    Object.keys(cleanedRecords[0]).length
  );
  return cleanedRecords;
}
// Function invocation
const outputRecords = printData(target);
console.log("Records: ", outputRecords);
console.log("---- printData.js finished executing ----");

// TODO: Render to D3 here

console.log("Finished rendering D3")
