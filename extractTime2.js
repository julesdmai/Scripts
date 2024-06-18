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
  "AWS Accounts - The basics (11:33) [DEMO] ACCOUNTS - STEP1 - Creating GENERAL AWS Account (14:44) Multi-factor Authentication (MFA) (8:25) [DEMO] ACCOUNTS - STEP2 - Securing GENERAL AWS Account (9:44) [DEMO] ACCOUNTS - STEP3 - Creating a Budget (6:46) [DOITYOURSELF] Creating the Production Account (4:59) Identity and Access [ASSOCIATESHARED] S3 Security (Resource Policies & ACLs) (18:19) [ASSOCIATESHARED] S3 Static Hosting (10:36) [SHAREDALL] [Demo] Creating a static website with S3 (17:55) [ASSOCIATESHARED] Object Versioning & MFA Delete (7:41) [SHAREDALL] [DEMO] - S3 Versioning (15:45) [ASSOCIATESHARED] S3 Performance Optimization (11:42) [ASSOCIATESHARED] [DEMO] - S3 Performance (5:06) [ASSOCIATESHARED] Key Management Service (KMS) (18:38) [SHAREDALL] [DEMO] KMS - Encrypting the battleplans with KMS (12:43) [SHAREDALL] S3 Object Encryption CSE/SSE (23:31) [SHAREDALL] [DEMO] Object Encryption and Role Separation (14:50) S3 Bucket Keys (5:59) [ASSOCIATESHARED] S3 Object Storage Classes - PART1 (9:23) [ASSOCIATESHARED] S3 Object Storage Classes - PART2 (11:41) [ASSOCIATESHARED] S3 Lifecycle Configuration (8:13) [SHAREDALL] S3 Replication (13:59) [SHAREDALL] [DEMO] Cross-Region Replication of an S3 Static Website (19:52) [ASSOCIATESHARED] S3 PreSigned URLs (11:11) [SHAREDALL] [DEMO] Creating and using PresignedURLs (18:23) [ASSOCIATESHARED] S3 Select and Glacier Select (5:32) [ASSOCIATESHARED] S3 Events (4:32) [ASSOCIATESHARED] S3 Access Logs (3:05) [ASSOCIATESHARED] S3 Object Lock (9:52) S3 Access Points (5:52) [DEMO] Multi-Region Access Points (MRAP) (20:25)Management (IAM) Basics (13:01) [DEMO] ACCOUNTS - STEP4 - Adding IAMADMIN to GENERAL Account (12:36) [DEMO] ACCOUNTS - STEP4 - Adding IAMADMIN to PRODUCTION Account (10:17) IAM Access Keys (7:10) [DEMO] Creating Access keys and setting up AWS CLI v2 tools (17:43)";

console.log(extractTime(text));