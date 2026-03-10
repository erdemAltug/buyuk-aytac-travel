/**
 * Custom Next.js Image loader: her zaman GÖRECELİ URL döndürür.
 * Sunucu ve istemci aynı src'i kullandığı için hydration uyumsuzluğu (#418) ve
 * Googlebot'ta sayfanın boş görünmesi engellenir.
 * loader: 'default' ile /_next/image endpoint'i yine Next.js tarafından işlenir.
 */
export default function imageLoader({ src, width, quality }) {
  const q = quality ?? 75;
  const url = encodeURIComponent(src);
  return `/_next/image?url=${url}&w=${width}&q=${q}`;
}
