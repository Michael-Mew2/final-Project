import rateLimit from 'express-rate-limit';
import { AUTH_CONFIG } from '../config/auth.config.js';

const loginLimiter = rateLimit({
  windowMs: AUTH_CONFIG.LOGIN_TIMEOUT,
  max: AUTH_CONFIG.MAX_LOGIN_ATTEMPTS,
  message: { 
    msg: 'Too many login attempts. Please try again later.' 
  }
});

export default loginLimiter;