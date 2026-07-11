const SITE_URL = 'https://www.buyukaytactravel.com';

export function toAbsoluteUrl(path: string): string {
  if (!path) return `${SITE_URL}/images/hero-banner.jpg`;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export { SITE_URL };
