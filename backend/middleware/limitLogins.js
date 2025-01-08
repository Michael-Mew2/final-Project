import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: AUTH_CONFIG.LOGIN_TIMEOUT,
  max: AUTH_CONFIG.MAX_LOGIN_ATTEMPTS,
  message: { 
    msg: 'Too many login attempts. Please try again later.' 
  }
});