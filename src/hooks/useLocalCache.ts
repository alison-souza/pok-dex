export function setCache<T>(key: string, data: T, ttlSeconds = 60 * 60) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  const payload = { data, expiresAt };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function getCache<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { data: T; expiresAt: number };
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}
