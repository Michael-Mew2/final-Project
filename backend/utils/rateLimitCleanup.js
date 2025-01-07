import cron from "node-cron";
import RateLimit from "../models/RateLimit.js";

function cleanOldRateLimits() {
  const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000);

  RateLimit.deleteMany({ windowStart: { $lt: threshold } })
    .then((result) => {
      console.log(`Cleand up ${result.deletedCount} old rate limit entries.`);
    })
    .catch((error) => {
      console.error("Error cleaning old rate limit entries:", error);
    });
}

cron.schedule("0 */6 * * *", cleanOldRateLimits); // Alle sechs Stunden an jedem Tag, Monat und Wochentag

export default cleanOldRateLimits;
