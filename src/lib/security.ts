/**
 * Rate Limiting Utility for Form Submissions
 * 
 * Uses an in-memory Map to track submission counts per IP.
 * Since Next.js on Vercel is serverless, this resets on cold starts.
 * For production-grade rate limiting, consider using Redis or Upstash.
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}

// In-memory store (resets on server restart / cold start)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Check if a request is rate limited
 * @param identifier - Unique identifier (IP address or fingerprint)
 * @returns Object with `limited` boolean and `retryAfter` timestamp (if limited)
 */
export function checkRateLimit(identifier: string): {
  limited: boolean;
  retryAfter?: number;
  remaining: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No previous attempts, allow
  if (!entry) {
    rateLimitStore.set(identifier, { count: 1, firstAttempt: now });
    return { limited: false, remaining: MAX_SUBMISSIONS - 1 };
  }

  // Window expired, reset counter
  if (now - entry.firstAttempt > WINDOW_MS) {
    rateLimitStore.set(identifier, { count: 1, firstAttempt: now });
    return { limited: false, remaining: MAX_SUBMISSIONS - 1 };
  }

  // Within window, increment counter
  const remaining = MAX_SUBMISSIONS - entry.count;
  
  if (entry.count >= MAX_SUBMISSIONS) {
    const retryAfter = entry.firstAttempt + WINDOW_MS;
    return { limited: true, retryAfter, remaining: 0 };
  }

  entry.count++;
  rateLimitStore.set(identifier, entry);
  return { limited: false, remaining: MAX_SUBMISSIONS - entry.count };
}

/**
 * Clean up expired entries from the store
 * Call this periodically in production
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  rateLimitStore.forEach((entry, key) => {
    if (now - entry.firstAttempt > WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  });
}

// Auto-cleanup every 30 minutes
if (typeof global !== 'undefined') {
  setInterval(cleanupRateLimitStore, 30 * 60 * 1000);
}
