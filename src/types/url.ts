export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  customAlias?: string;
  createdAt: string;
  clicks: number;
}
