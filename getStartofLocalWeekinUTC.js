// Function to return the start of the current local week in UTC timestamp
function getStartofLocalWeekinUTC(date = new Date()) {
  return date.getTime();
}
console.log(getStartofLocalWeekinUTC);
