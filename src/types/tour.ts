/**
 * Tour type definitions - safe to import in client components.
 * Do not import Mongoose models in client code; use these types instead.
 */

export enum TourType {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international'
}

export enum AccommodationType {
  WITH_ACCOMMODATION = 'with_accommodation',
  DAILY = 'daily'
}

export interface ITour {
  _id?: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  duration: string;
  price: number;
  destination: string;
  destinationRef?: string;
  departureCity?: string;
  tourType: TourType;
  accommodationType: AccommodationType;
  startDate?: Date | string;
  endDate?: Date | string;
  isActive: boolean;
  isLastMinute?: boolean;
  discountRate?: number;
  viewCount?: number;
  additionalServices?: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
  program?: Array<{
    day: string;
    title: string;
    description: string;
  }>;
  includedServices?: string[];
  excludedServices?: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
