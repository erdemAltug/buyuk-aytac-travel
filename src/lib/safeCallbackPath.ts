/** Sadece relative path kabul et; absolute/localhost callback'leri reddet */
export function safeCallbackPath(
  raw: string | null | undefined,
  fallback: string
): string {
  if (!raw) return fallback;
  const value = raw.trim();
  if (!value) return fallback;

  // //evil.com veya http(s): absolute
  if (value.startsWith('//') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) {
    try {
      const url = new URL(value);
      if (
        typeof window !== 'undefined' &&
        url.origin === window.location.origin
      ) {
        return `${url.pathname}${url.search}` || fallback;
      }
    } catch {
      /* ignore */
    }
    return fallback;
  }

  if (value.startsWith('/')) return value;
  return fallback;
}
