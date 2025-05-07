const INPUT_START_TIME = new Date("2025-05-05T08:30:00.000Z").toISOString();
const INPUT_END_TIME = new Date('2025-05-06T16:03:31.475Z').toISOString();

function minutesElapsed(isoStartTime, isoEndTime = new Date().toISOString()) {
  console.log("---- minutesElapsed running ----");

  const startTimeObj = new Date(isoStartTime);
  const endTimeObj = new Date(isoEndTime);

  const diffMilliseconds = endTimeObj - startTimeObj;
  const diffMinutes = diffMilliseconds / (1000 * 60);
  const roundedMinutes = Math.round(diffMinutes);

  console.log("calculated roundedMinutes: ", roundedMinutes);
  console.log("---- minutesElapsed finished ----");
  return roundedMinutes;
}
minutesElapsed(INPUT_START_TIME);
