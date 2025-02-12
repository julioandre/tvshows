import type { Network } from "./network";

interface Externals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}

interface Rating {
  average: number;
}

interface Schedule {
  time: string;
  days: string[];
}

interface Image {
  medium: string;
  original: string;
}

// Define the main interface for a show or movie
export interface ShowItem {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string | null; // Could be null if it hasn't ended
  officialSite: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel: string | null; // Could be null if there’s no web channel
  dvdCountry: string | null; // Could be null if not applicable
  externals: Externals;
  image: Image;
  summary: string; // Assuming this will be raw HTML/Markdown
  updated: number; // Unix timestamp or similar
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
      name: string;
    };
  };
}
