/**
 * Blog type definitions - safe to import in client components.
 * Do not import Mongoose models in client code; use these types instead.
 */

export interface IBlog {
  _id?: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  summary: string;
  author: string;
  categories: string[];
  isPublished: boolean;
  publishDate: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  metaDescription?: string;
  keywords?: string[];
  focusKeyword?: string;
  views?: number;
  readingTime?: number;
  featuredPost?: boolean;
}
