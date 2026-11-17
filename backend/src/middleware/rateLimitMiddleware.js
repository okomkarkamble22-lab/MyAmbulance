// Configures a baseline API rate limit.
import rateLimit from 'express-rate-limit';

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false
});

export default apiRateLimiter;
