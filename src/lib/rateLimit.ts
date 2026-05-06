const rateLimitMap = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(key) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);
  return false;
}
