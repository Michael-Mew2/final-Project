import RateLimit from "../models/RateLimit.js";

const numberRequests = parseInt(process.env.MAX_PIXEL_REQUESTS || "1", 10);
const requestMultiplier = parseInt(process.env.REQUEST_MULTIPLIER || "3", 10);
const maxRequestsAdmin = parseInt(
  process.env.MAX_PIXEL_REQUESTS_ADMIN || "999",
  10
);
const timeWindowInMinutes = parseInt(
  process.env.PIXEL_RATE_LIMIT_MINUTES || "6",
  10
);

export const limitPixelChanges = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // console.log(userId);

    const userRole = req.user.role;
    // console.log(userRole);

    const roleLimits = {
      user: { maxRequests: numberRequests, windowMinutes: timeWindowInMinutes },
      premium: {
        maxRequests: parseInt(numberRequests * requestMultiplier, 10),
        windowMinutes: timeWindowInMinutes,
      },
      admin: {
        maxRequests: maxRequestsAdmin,
        windowMinutes: parseInt(timeWindowInMinutes / timeWindowInMinutes, 10),
      },
    };
    // console.log(roleLimits);

    const { maxRequests, windowMinutes } =
      roleLimits[userRole] || roleLimits.user;
    // console.log({ maxRequests, windowMinutes });

    const currentTime = new Date();
    const windowStartTime = new Date(
      currentTime.getTime() - windowMinutes * 60 * 1000
    );

    let rateLimit = await RateLimit.findOne({ userId });
    // console.log(rateLimit);

    if (rateLimit)
      if (rateLimit.windowStart > windowStartTime) {
        if (rateLimit.requestCount >= maxRequests) {
          return res.status(429).json({
            msg: `You can only place ${
              maxRequests === 1 ? "one Pixel" : `${maxRequests} Pixels`
            } every ${windowMinutes} minutes!`,
          });
        }
        rateLimit.requestCount += 1;
        await rateLimit.save();
      } else {
        rateLimit.requestCount = 1;
        rateLimit.windowStart = currentTime;
        await rateLimit.save();
      }
    else {
      rateLimit = new RateLimit({
        userId,
        requestCount: 1,
        windowStart: currentTime,
      });
      await rateLimit.save();
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};
