const INPUT_START_TIME = new Date("2025-05-05T08:30:00.000Z").toISOString();
const INPUT_END_TIME = new Date("2025-05-05T09:45:00.000Z").toISOString();

// const isoStart = "2025-05-05T08:30:00.000Z";
// const isoEnd = "2025-05-05T09:45:00.000Z";

function minutesElapsed(startTime, endTime) {
  console.log("minutesElapsed running");

  // Code goes here
  console.log("startTime: ", startTime);
  console.log("endTime:   ", endTime);

  console.log("minutesElapsed finished executing");
}
minutesElapsed(INPUT_START_TIME, INPUT_END_TIME);
