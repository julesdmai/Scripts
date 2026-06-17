// EXAMPLE: -- CHECK (tone_brand_energy IN ('Red', 'Brown', 'Hazel', 'Green', 'Blue', 'Gray', 'Amber', 'Other')),

// INPUT: 'Red | Brown | Hazel | Green | Blue | Gray | Amber | Other'
// OUTPUT: -- CHECK (tone_brand_energy IN ('Red', 'Brown', 'Hazel', 'Green', 'Blue', 'Gray', 'Amber', 'Other')),
function listToCheckStatement(str) {
  if (!str) return 'invalid string';

  let s = "";

  // Split
  const splitOptions = (string) => {
    return string.split(" | ");
  };
  const options = splitOptions(str);

  // Build
  s += "CHECK (tone_brand_energy IN (";

  options.forEach((o) => {
    s += `'${o}',`;
  });

  // Remove last comma
  let shortenedString = s.slice(0, -1);

  shortenedString += ")),";

  return shortenedString;
}

// TESTING
// const testStr = "Red | Brown | Hazel | Green | Blue | Gray | Amber | Other";
// const s = listToCheckStatement(testStr);
// console.log(s);

const options = '';
const results = listToCheckStatement(options);
console.log(results);