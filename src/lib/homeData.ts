/**
 * Server-only: Ana sayfa için turlar ve bloglar.
 * Bu veri ilk HTML'de gönderilir, Googlebot JS çalıştırmadan içeriği görür.
 * Client Component'e geçmek için tüm değerler plain (Buffer/ObjectId yok) olmalı.
 */
import dbConnect from '@/lib/dbConnect';
import Tour from '@/models/Tour';
import Blog from '@/models/Blog';
import type { ITour } from '@/types/tour';
import type { IBlog } from '@/types/blog';

/** Mongoose Buffer/ObjectId ve Date'i plain string'e çevirir; Client Component'e güvenle geçilir. */
function toPlainValue(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (value instanceof Date) return value.toISOString();
  if (Buffer.isBuffer(value)) return value.toString('hex');
  const v = value as Record<string, unknown> | undefined;
  if (typeof value === 'object' && value !== null) {
    if (v?.type === 'Buffer' && Array.isArray(v.data)) return Buffer.from(v.data).toString('hex');
    if (typeof (value as { toJSON?: () => unknown }).toJSON === 'function') return toPlainValue((value as { toJSON: () => unknown }).toJSON());
    if (Object.prototype.toString.call(value) === '[object ObjectId]' || (v?.constructor as { name?: string })?.name === 'ObjectID') return String(value);
    if (Array.isArray(value)) return value.map(toPlainValue);
    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(obj)) {
      const val = obj[k];
      if (val !== null && typeof val === 'object' && (Buffer.isBuffer(val) || (val as { type?: string }).type === 'Buffer' || (val as { buffer?: unknown }).buffer !== undefined)) {
        out[k] = String(val);
      } else {
        out[k] = toPlainValue(val);
      }
    }
    return out;
  }
  return value;
}

export async function getFeaturedToursForHome(): Promise<ITour[]> {
  await dbConnect();
  const now = new Date();
  const featuredTours = await Tour.find({ isActive: true, isFeatured: true })
    .sort({ startDate: 1 })
    .limit(10)
    .lean();
  const dailyTours = await Tour.find({
    isActive: true,
    accommodationType: 'daily',
    isFeatured: { $ne: true },
  })
    .sort({ startDate: 1 })
    .limit(10)
    .lean();
  const tours = [...featuredTours, ...dailyTours];
  const asObjects = tours.map((t) => {
    const o = t as Record<string, unknown>;
    const plain = toPlainValue({
      ...o,
      _id: o._id,
      startDate: o.startDate ? new Date(o.startDate as Date).toISOString() : undefined,
      endDate: o.endDate ? new Date(o.endDate as Date).toISOString() : undefined,
      createdAt: o.createdAt ? new Date(o.createdAt as Date).toISOString() : undefined,
      updatedAt: o.updatedAt ? new Date(o.updatedAt as Date).toISOString() : undefined,
    }) as Record<string, unknown>;
    return plain;
  });
  const upcoming = asObjects
    .filter((t) => t.startDate && new Date(t.startDate as string) >= now)
    .sort((a, b) =>
      a.startDate && b.startDate ? new Date(a.startDate as string).getTime() - new Date(b.startDate as string).getTime() : 0
    )
    .slice(0, 4);
  const list = upcoming.length > 0 ? upcoming : asObjects.slice(0, 4);
  return list as unknown as ITour[];
}

export async function getLatestBlogsForHome(): Promise<IBlog[]> {
  await dbConnect();
  const blogs = await Blog.find({ isPublished: true })
    .sort({ publishDate: -1 })
    .limit(3)
    .lean();
  return blogs.map((b) => {
    const o = b as Record<string, unknown>;
    return toPlainValue({
      ...o,
      _id: o._id,
      publishDate: o.publishDate ? new Date(o.publishDate as Date).toISOString() : (o.publishDate as string),
      createdAt: o.createdAt ? new Date(o.createdAt as Date).toISOString() : undefined,
      updatedAt: o.updatedAt ? new Date(o.updatedAt as Date).toISOString() : undefined,
    }) as IBlog;
  });
}
