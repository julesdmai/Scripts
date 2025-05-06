const INPUT_START_TIME = new Date("2025-05-05T08:30:00.000Z").toISOString();
const INPUT_END_TIME = new Date("2025-05-05T09:45:00.000Z").toISOString();

function minutesElapsed(isoStartTime, isoEndTime) {
  console.log("minutesElapsed running");

  // Code goes here
  console.log("startTime: ", isoStartTime);
  console.log("endTime:   ", isoEndTime);

  const startTimeObj = new Date(isoStartTime);
  const endTimeObj = new Date(isoEndTime);

  const diffMilliseconds = endTimeObj - startTimeObj;
  const diffMinutes = diffMilliseconds / (1000 * 60);

  const roundedMinutes = Math.round(diffMinutes);

  console.log("calculated roundedMinutes: ", roundedMinutes);
  return roundedMinutes;
}
minutesElapsed(INPUT_START_TIME, INPUT_END_TIME);
