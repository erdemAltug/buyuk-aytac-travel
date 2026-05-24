/**
 * Tur tarih filtresi — sunucu ve istemci tarafında kullanılabilir.
 */

export function isTourUpcoming(tour: {
  startDate?: Date | string | null;
  endDate?: Date | string | null;
}): boolean {
  const now = new Date();
  const end = tour.endDate ? new Date(tour.endDate) : null;
  const start = tour.startDate ? new Date(tour.startDate) : null;

  if (end && !Number.isNaN(end.getTime()) && end >= now) return true;
  if (start && !Number.isNaN(start.getTime()) && start >= now) return true;
  return false;
}

export function sortToursByStartDate<T extends { startDate?: Date | string | null }>(tours: T[]): T[] {
  return [...tours].sort((a, b) => {
    const aTime = a.startDate ? new Date(a.startDate).getTime() : Number.MAX_SAFE_INTEGER;
    const bTime = b.startDate ? new Date(b.startDate).getTime() : Number.MAX_SAFE_INTEGER;
    return aTime - bTime;
  });
}

export function filterUpcomingTours<T extends { startDate?: Date | string | null; endDate?: Date | string | null }>(
  tours: T[]
): T[] {
  return sortToursByStartDate(tours.filter(isTourUpcoming));
}
