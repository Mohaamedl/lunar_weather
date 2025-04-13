const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

class WeatherCache {
  constructor() {
    this.cache = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), CACHE_DURATION);
  }

  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > CACHE_DURATION) {
        this.cache.delete(key);
      }
    }
  }

  getKey(params, type, unit = 'metric') {
    if (!params) return null;

    const baseKey = typeof params === 'string' 
      ? `${type}:${params}`
      : params.city 
        ? `${type}:${params.city}`
        : params.lat && params.lon
          ? `${type}:${params.lat},${params.lon}`
          : null;

    return baseKey ? `${baseKey}:${unit}` : null;
  }

  set(params, type, data, unit = 'metric') {
    const key = this.getKey(params, type, unit);
    if (!key) return;

    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(params, type, unit = 'metric') {
    const key = this.getKey(params, type, unit);
    if (!key) return null;

    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

// Make sure to clean up the interval when the module is unloaded
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => weatherCache.clear());
}

export const weatherCache = new WeatherCache();
