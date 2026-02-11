import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create rate limiter only if env vars exist
// Falls back to no rate limiting in development
function createRateLimiter() {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 requests per hour per IP
      analytics: true,
    });
  }
  return null;
}

const rateLimiter = createRateLimiter();

export async function rateLimit(identifier: string) {
  if (!rateLimiter) {
    // No rate limiter configured — allow all (development)
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }

  return rateLimiter.limit(identifier);
}
