const INPUT_START_TIME = new Date().toISOString();
const INPUT_END_TIME = new Date().toISOString();

function minutesElapsed(startTime, endTime) {
  console.log("minutesElapsed running");

  // Code goes here
  console.log("startTime: ", startTime);
  console.log("endTime:   ", endTime);

  console.log("minutesElapsed finished executing");
}
minutesElapsed(INPUT_START_TIME, INPUT_END_TIME);
