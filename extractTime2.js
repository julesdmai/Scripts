// Function to extract total hours:minutes:seconds out of video titles with (minutes:seconds)
// Input: String
// Output: String representing hours:minutes:seconds
const extractTime = (string) => {
  const regex = /\b\d+:\d{2}\b/g; // regex for minutes:seconds
  const matches = string.match(regex); // array of matches
  if (!matches) return "0 minutes, 0 seconds";

  // Accumulate total time
  let totalSeconds = 0;
  for (const time of matches) {
    let [minutes, seconds] = time.split(":");
    minutes = Number(minutes);
    seconds = Number(seconds);
    totalSeconds += minutes * 60 + seconds;
  }

  // Convert total time to hours:minutes:seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

// // testing
const text =
  "[ASSOCIATESHARED] Bootstrapping EC2 using User Data (10:25) [ASSOCIATESHARED] [DEMO] Bootstrapping Wordpress Installation - PART1 (15:00) [ASSOCIATESHARED] [DEMO] Bootstrapping Wordpress Installation - PART2 (6:45) Enhanced Bootstrapping with CFN-INIT (11:52) [DEMO] CFN-INIT and CFN Creation Policies (12:29) [ASSOCIATESHARED] EC2 Instance Roles & Profile (4:18) [ASSOCIATESHARED] [DEMO] Using EC2 Instance Roles (13:31) [ASSOCIATESHARED] SSM Parameter Store (6:16) [ASSOCIATESHARED] [DEMO] Parameter Store (16:11) [ASSOCIATESHARED] System and Application Logging on EC2 (6:15) [ASSOCIATESHARED] [DEMO] Logging and Metrics with CloudWatch Agent-PART1 (11:51) [ASSOCIATESHARED] [DEMO] Logging and Metrics with CloudWatch Agent-PART2 (8:08) [ASSOCIATESHARED] EC2 Placement Groups (14:29) Dedicated Hosts (8:56) [ASSOCIATESHARED] Enhanced Networking & EBS Optimized (6:57) Advanced EC2 Section Quiz";

console.log(extractTime(text));