// EXAMPLE: -- CHECK (tone_brand_energy IN ('Red', 'Brown', 'Hazel', 'Green', 'Blue', 'Gray', 'Amber', 'Other')),

// INPUT: 'Red | Brown | Hazel | Green | Blue | Gray | Amber | Other'
// OUTPUT: -- CHECK (tone_brand_energy IN ('Red', 'Brown', 'Hazel', 'Green', 'Blue', 'Gray', 'Amber', 'Other')),
function listToCheckStatementArray(str, lbl) {
  if (!str) return "invalid string";

  let s = "";

  // Split
  const splitOptions = (string) => {
    return string.split(" | ");
  };
  const options = splitOptions(str);

  // Build
  s += `CHECK(${lbl} <@ARRAY[`;

  options.forEach((o) => {
    s += `'${o}',`;
  });

  // Remove last comma
  let shortenedString = s.slice(0, -1);

  shortenedString += "]::text[]),";

  return shortenedString;
}

// TESTING
// const testStr = "Red | Brown | Hazel | Green | Blue | Gray | Amber | Other";
// const s = listToCheckStatementArray(testStr);
// console.log(s);

// const options =
//   "High Fashion | Commercial | Editorial | Athletic | Corporate | Streetwear | Bohemian | Classic | Edgy | Luxury | All-American | Other";
// const label = "look_style_tags";
// const results = listToCheckStatementArray(options, label);
// console.log(results);

// const options =
//   "Luxury | Edgy | Corporate | Approachable | Aspirational | Youthful | Sophisticated | Other";
// const label = "brand_tone_tags";
// const results = listToCheckStatementArray(options, label);
// console.log(results);

// const options =
//   "American Indian or Alaska Native | Asian | Black or African American | Native Hawaiian or Other Pacific Islander | White | Two or more races | Some other race | Prefer not to say";
// const label = "race";
// const results = listToCheckStatementArray(options, label);
// console.log(results);

const options =
  "American Indian or Alaska Native | Asian | Black or African American | Native Hawaiian or Other Pacific Islander | White | Two or more races | Some other race | Prefer not to say";
const label = "race";
const results = listToCheckStatementArray(options, label);
console.log(results);
