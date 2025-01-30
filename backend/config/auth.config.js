export const AUTH_CONFIG = {
  COOKIE_MAX_AGE: parseInt(process.env.COOKIE_EXPIRES_IN) || 24* 60 * 60 * 1000,
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_TIMEOUT: 2 * 60 * 1000, // 15 Minuten
  PASSWORD_RESET_EXPIRY: 24 * 60 * 60 * 1000, // 24 Stunden
};
