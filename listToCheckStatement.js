// EXAMPLE: -- CHECK (tone_brand_energy IN ('Red', 'Brown', 'Hazel', 'Green', 'Blue', 'Gray', 'Amber', 'Other')),

// INPUT: 'Red | Brown | Hazel | Green | Blue | Gray | Amber | Other'
// OUTPUT: -- CHECK (tone_brand_energy IN ('Red', 'Brown', 'Hazel', 'Green', 'Blue', 'Gray', 'Amber', 'Other')),
function listToCheckStatement(str, lbl) {
  if (!str) return 'invalid string';

  let s = "";

  // Split
  const splitOptions = (string) => {
    return string.split(" | ");
  };
  const options = splitOptions(str);

  // Build
  s += `CHECK(${lbl} IN (`;

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

// const options = 'Actor | Model | Singer | Dancer | Athlete | Presenter | Influencer | Other';
// const results = listToCheckStatement(options);
// console.log(results);

// const options = 'Drama | Comedy | Commercial | Improv | Voice Over | Motion Capture | Theatre | Soap Opera | Other';
// const results = listToCheckStatement(options);
// console.log(results);

// const options = 'Runway | Commercial | Editorial | Fitness | Parts | Petite | Plus-Size | Swimwear | Other';
// const label = 'modeling_categories'
// const results = listToCheckStatement(options, label);
// console.log(results);

// const options = 'Soprano | Mezzo-Soprano | Alto | Tenor | Baritone | Bass | Unknown';
// const label = 'singing_voice_range'
// const results = listToCheckStatement(options, label);
// console.log(results);

// const options = 'Jazz | Hip Hop | Contemporary | Ballroom | Latin | Tap | Salsa | Breakdancing | Other';
// const label = 'dance_styles'
// const results = listToCheckStatement(options, label);
// console.log(results);

// const options = 'Film | Television | Commercials | Print Modeling | Runway | Brand Partnerships | UGC Content | Voiceover | Music Opportunities | Public Speaking | Other';
// const label = 'opportunities_sought'
// const results = listToCheckStatement(options, label);
// console.log(results);

// const options = 'Acting & Performance | Comedy | Fashion | Beauty | Fitness | Wellness | Lifestyle | Travel | Music | Entrepreneurship | Education | Family | Gaming | Food | Technology | Outdoor Adventure | Luxury | Faith | Other';
// const label = 'brand_pillars'
// const results = listToCheckStatement(options, label);
// console.log(results);

// const options = 'Casting Directors | Producers | Brands | Modeling Agencies | Talent Agencies | Fans | Industry Professionals | Businesses | Other';
// const label = 'target_audience'
// const results = listToCheckStatement(options, label);
// console.log(results);

// const options = 'Instagram | TikTok | Facebook | LinkedIn | YouTube | IMDb | Personal Website | Other';
// const label = 'active_platforms'
// const results = listToCheckStatement(options, label);
// console.log(results);

const options = 'Short-form video | Long-form video | UGC | Live streaming | Podcast | Editorial / print | Behind-the-scenes | Tutorials | Interviews | Other';
const label = 'content_format_comfort'
const results = listToCheckStatement(options, label);
console.log(results);