/** Gelecek turlar oylaması — Unsplash (images.unsplash.com next.config'te tanımlı) */

export const POLL_OPTION_IMAGES: Record<string, string> = {
  bozcaada:
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80',
  safranbolu: '/images/polls/safranbolu.jpg',
  lavanta:
    'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&auto=format&fit=crop&q=80',
};

export const DEFAULT_POLL = {
  title: 'Gelecek Turlar Oylaması',
  subtitle: 'Önümüzdeki ay listeye hangi turu ekleyelim?',
  isActive: true,
  options: [
    {
      optionId: 'bozcaada',
      label: 'Bozcaada Bağ Bozumu',
      description: "Ege'nin incisi, bağ hasadı ve lezzet durakları",
      image: POLL_OPTION_IMAGES.bozcaada,
      votes: 0,
    },
    {
      optionId: 'safranbolu',
      label: 'Safranbolu Evleri',
      description: 'UNESCO mirası, Osmanlı mimarisi ve huzur',
      image: POLL_OPTION_IMAGES.safranbolu,
      votes: 0,
    },
    {
      optionId: 'lavanta',
      label: 'Lavanta Bahçeleri',
      description: 'Isparta lavanta vadileri ve fotoğraf molaları',
      image: POLL_OPTION_IMAGES.lavanta,
      votes: 0,
    },
  ],
};

export function enrichPollOptions<T extends { optionId: string; image?: string }>(
  options: T[]
): T[] {
  return options.map((opt) => ({
    ...opt,
    image: POLL_OPTION_IMAGES[opt.optionId] ?? opt.image,
  }));
}
