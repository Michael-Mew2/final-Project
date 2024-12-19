import rateLimit from "express-rate-limit";

export const limitPixelChanges = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
  keyGenerator: (req) => {
    console.log("Limiter ausgelöst für:", req.user.id);
    req.user.id
},
  message: "You can only place a pixel every 2 minutes!",
});
