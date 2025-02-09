export interface MovieItem {
  id: number;
  name: string;
  summary: string;
  image?: string;
  status: string;
  premiered: string;
  genres: string[];
  rating: number;
}
