import rateLimit from "express-rate-limit";

const maxRequests = parseInt(process.env.MAX_PIXEL_REQUESTS || "1", 10);
const timeWindowInMinutes = parseInt(
  process.env.PIXEL_RATE_LIMIT_MINUTES || "6",
  10
);

export const limitPixelChanges = rateLimit({
  windowMs: timeWindowInMinutes * 60 * 1000,
  max: maxRequests,
  keyGenerator: (req) => {
    console.log("Limiter ausgelöst für:", req.user.id);
    req.user.id;
  },
  message: "You can only place a pixel every 2 minutes!",
});
