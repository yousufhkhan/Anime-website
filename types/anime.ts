export interface Anime {
  id: number;
  title: string;
  coverImage: string;
  bannerImage?: string;
  description?: string;
  episodes?: number;
  score?: number;
  year?: number;
  genres?: string[];
  status?: string;
  isNew?: boolean;
  latestEp?: number;
}

export interface TrendingAnime extends Anime {
  rank: number;
  views?: string;
}

export interface ScheduleEntry {
  id: number;
  title: string;
  episode: number;
  airingAt: number;
  emoji?: string;
}

export type GenreFilter =
  | "All"
  | "Action"
  | "Romance"
  | "Fantasy"
  | "Thriller"
  | "Sci-Fi"
  | "Horror"
  | "Sports"
  | "Slice of Life"
  | "Isekai"
  | "Mecha"
  | "Shounen";
