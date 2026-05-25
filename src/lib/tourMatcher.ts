import { AccommodationType } from '@/types/tour';
import type { ITour } from '@/types/tour';

export type CompanionChoice = 'family' | 'friends';
export type ConceptChoice = 'nature' | 'history' | 'entertainment';
export type StayChoice = 'daily' | 'overnight';

export interface WeekendPreferences {
  companion: CompanionChoice;
  concept: ConceptChoice;
  stay: StayChoice;
}

const CONCEPT_KEYWORDS: Record<ConceptChoice, string[]> = {
  nature: [
    'doğa', 'göl', 'orman', 'lavanta', 'deniz', 'plaj', 'kıyı', 'dağ', 'yayla',
    'milli park', 'ağva', 'şile', 'ömerli', 'sapanca', 'abant', 'kuş', 'yeşil',
    'travertin', 'pamukkale', 'gölcük', 'karadeniz', 'sahil',
  ],
  history: [
    'tarih', 'osmanlı', 'evler', 'müze', 'safranbolu', 'kapadokya', 'antik',
    'kale', 'cami', 'kültür', 'amasra', 'bursa', 'misi', 'konak', 'han',
    'arkeoloji', 'unesco', 'cunda', 'assos',
  ],
  entertainment: [
    'eğlence', 'festival', 'gül', 'hasat', 'boğaz', 'gece', 'alışveriş',
    'bağ bozumu', 'konser', 'şenlik', 'eğlenceli', 'keyif', 'istanbul',
  ],
};

const FAMILY_KEYWORDS = ['aile', 'çocuk', 'rahat', 'müze', 'kültür', 'tarih', 'doğa yürüyüş'];
const FRIENDS_KEYWORDS = ['eğlence', 'festival', 'gece', 'keyif', 'arkadaş', 'gül', 'bağ'];

function tourText(tour: ITour): string {
  return `${tour.name} ${tour.description} ${tour.destination}`.toLowerCase();
}

function countKeywordHits(text: string, keywords: string[]): number {
  return keywords.reduce((n, kw) => (text.includes(kw) ? n + 1 : n), 0);
}

function inferConceptScores(text: string): Record<ConceptChoice, number> {
  return {
    nature: countKeywordHits(text, CONCEPT_KEYWORDS.nature),
    history: countKeywordHits(text, CONCEPT_KEYWORDS.history),
    entertainment: countKeywordHits(text, CONCEPT_KEYWORDS.entertainment),
  };
}

export function scoreTour(tour: ITour, prefs: WeekendPreferences): number {
  const text = tourText(tour);
  let score = 0;

  const targetAccommodation =
    prefs.stay === 'daily'
      ? AccommodationType.DAILY
      : AccommodationType.WITH_ACCOMMODATION;

  if (tour.accommodationType === targetAccommodation) {
    score += 50;
  }

  const conceptScores = inferConceptScores(text);
  score += (conceptScores[prefs.concept] ?? 0) * 12;

  const companionKeywords =
    prefs.companion === 'family' ? FAMILY_KEYWORDS : FRIENDS_KEYWORDS;
  score += countKeywordHits(text, companionKeywords) * 8;

  if (tour.isFeatured) score += 6;
  if (tour.isLastMinute) score += 4;

  return score;
}

export function rankTours(
  tours: ITour[],
  prefs: WeekendPreferences,
  limit = 2
): ITour[] {
  return [...tours]
    .filter((t) => t.isActive !== false)
    .map((tour) => ({ tour, score: scoreTour(tour, prefs) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ tour }) => tour);
}

export async function rankToursWithAi(
  tours: ITour[],
  prefs: WeekendPreferences,
  limit = 2
): Promise<ITour[] | null> {
  const { chatCompletion, isAiEnabled } = await import('@/lib/ai/client');
  if (!isAiEnabled() || tours.length === 0) return null;

  const catalog = tours.map((t) => ({
    slug: t.slug,
    name: t.name,
    destination: t.destination,
    accommodationType: t.accommodationType,
    price: t.price,
    duration: t.duration,
    excerpt: t.description.slice(0, 200),
  }));

  const userPrompt = JSON.stringify({
    preferences: prefs,
    tours: catalog,
    instruction: `En uygun ${limit} turun slug listesini JSON dizisi olarak döndür. Sadece JSON, başka metin yok. Örnek: ["slug-1","slug-2"]`,
  });

  const raw = await chatCompletion(
    'Sen Büyük Aytaç Travel tur danışmanısın. Verilen tercihlere göre en uygun turları seç.',
    userPrompt,
    { maxTokens: 120 }
  );

  if (!raw) return null;

  try {
    const match = raw.match(/\[[\s\S]*?\]/);
    const slugs = JSON.parse(match?.[0] ?? raw) as string[];
    if (!Array.isArray(slugs)) return null;

    const bySlug = new Map(tours.map((t) => [t.slug, t]));
    const picked = slugs
      .map((s) => bySlug.get(s))
      .filter((t): t is ITour => Boolean(t))
      .slice(0, limit);

    return picked.length > 0 ? picked : null;
  } catch {
    return null;
  }
}
