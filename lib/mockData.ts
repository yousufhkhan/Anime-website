import { Anime, TrendingAnime, ScheduleEntry } from "@/types/anime";

export const HERO_ANIME: Anime = {
  id: 1,
  title: "Solo Leveling Season 2",
  coverImage: "",
  description:
    "After becoming the world's strongest hunter, Sung Jinwoo faces a new threat beyond human comprehension. The shadows are restless, and the gates are opening once more across the globe.",
  episodes: 13,
  score: 9.1,
  year: 2025,
  genres: ["Action", "Fantasy", "Power Fantasy", "Manhwa"],
  status: "Airing",
  isNew: true,
  latestEp: 13,
};

export const RECENT_ANIME: Anime[] = [
  { id: 1, title: "Solo Leveling S2", coverImage: "", score: 9.1, latestEp: 13, isNew: true, genres: ["Action"] },
  { id: 2, title: "Demon Slayer S4", coverImage: "", score: 9.0, latestEp: 8, isNew: true, genres: ["Action"] },
  { id: 3, title: "My Hero Academia S7", coverImage: "", score: 8.4, latestEp: 21, genres: ["Shounen"] },
  { id: 4, title: "Tower of God S2", coverImage: "", score: 8.6, latestEp: 5, isNew: true, genres: ["Fantasy"] },
  { id: 5, title: "Kaiju No. 8", coverImage: "", score: 8.8, latestEp: 12, genres: ["Action"] },
  { id: 6, title: "Wind Breaker", coverImage: "", score: 8.3, latestEp: 6, isNew: true, genres: ["Sports"] },
  { id: 7, title: "Dungeon Meshi", coverImage: "", score: 9.2, latestEp: 24, genres: ["Fantasy"] },
  { id: 8, title: "Re:Zero S3", coverImage: "", score: 8.9, latestEp: 10, isNew: true, genres: ["Isekai"] },
];

export const POPULAR_ANIME: Anime[] = [
  { id: 10, title: "Attack on Titan: Final", coverImage: "", score: 9.9, episodes: 87, genres: ["Action", "Drama"] },
  { id: 11, title: "Fullmetal Alchemist: Brotherhood", coverImage: "", score: 9.8, episodes: 64, genres: ["Action"] },
  { id: 12, title: "Steins;Gate", coverImage: "", score: 9.7, episodes: 24, genres: ["Sci-Fi"] },
  { id: 13, title: "Vinland Saga S2", coverImage: "", score: 9.6, episodes: 24, genres: ["Historical"] },
  { id: 14, title: "Hunter x Hunter", coverImage: "", score: 9.5, episodes: 148, genres: ["Action"] },
  { id: 15, title: "Jujutsu Kaisen S2", coverImage: "", score: 9.4, episodes: 23, genres: ["Action"] },
  { id: 16, title: "Mushishi", coverImage: "", score: 9.3, episodes: 26, genres: ["Slice of Life"] },
  { id: 17, title: "Neon Genesis Evangelion", coverImage: "", score: 9.2, episodes: 26, genres: ["Mecha"] },
];

export const TRENDING_ANIME: TrendingAnime[] = [
  { id: 10, rank: 1, title: "Attack on Titan: Final", coverImage: "", score: 9.9, genres: ["Action", "Drama"], episodes: 87, views: "2.1M" },
  { id: 11, rank: 2, title: "Fullmetal Alchemist: Brotherhood", coverImage: "", score: 9.8, genres: ["Action", "Adventure"], episodes: 64, views: "1.9M" },
  { id: 12, rank: 3, title: "Steins;Gate", coverImage: "", score: 9.7, genres: ["Sci-Fi", "Thriller"], episodes: 24, views: "1.4M" },
  { id: 13, rank: 4, title: "Vinland Saga S2", coverImage: "", score: 9.6, genres: ["Historical", "Drama"], episodes: 24, views: "1.1M" },
  { id: 14, rank: 5, title: "Hunter x Hunter (2011)", coverImage: "", score: 9.5, genres: ["Action", "Adventure"], episodes: 148, views: "980K" },
  { id: 15, rank: 6, title: "Jujutsu Kaisen S2", coverImage: "", score: 9.4, genres: ["Action", "Supernatural"], episodes: 23, views: "870K" },
];

export const SCHEDULE: Record<string, ScheduleEntry[]> = {
  Mon: [
    { id: 1, title: "Solo Leveling S2", episode: 13, airingAt: 0 },
    { id: 2, title: "Wind Breaker", episode: 6, airingAt: 0 },
  ],
  Tue: [
    { id: 3, title: "Demon Slayer S4", episode: 8, airingAt: 0 },
    { id: 4, title: "Kaiju No. 8", episode: 12, airingAt: 0 },
  ],
  Wed: [
    { id: 5, title: "Tower of God S2", episode: 5, airingAt: 0 },
    { id: 6, title: "Blue Box", episode: 18, airingAt: 0 },
  ],
  Thu: [
    { id: 7, title: "MHA S7", episode: 21, airingAt: 0 },
    { id: 8, title: "Dungeon Meshi", episode: 24, airingAt: 0 },
    { id: 9, title: "Oshi no Ko S2", episode: 9, airingAt: 0 },
  ],
  Fri: [
    { id: 10, title: "Re:Zero S3", episode: 10, airingAt: 0 },
    { id: 11, title: "Sakamoto Days", episode: 15, airingAt: 0 },
  ],
  Sat: [
    { id: 12, title: "Jujutsu Kaisen S2", episode: 23, airingAt: 0 },
    { id: 13, title: "Berserk 2025", episode: 4, airingAt: 0 },
    { id: 14, title: "Shangri-La Frontier", episode: 20, airingAt: 0 },
  ],
  Sun: [
    { id: 15, title: "One Piece", episode: 1121, airingAt: 0 },
    { id: 16, title: "Dragon Ball Daima", episode: 22, airingAt: 0 },
  ],
};

// Emoji map for cover placeholders (until real images are connected)
export const ANIME_EMOJIS: Record<number, string> = {
  1: "⚔️", 2: "🔥", 3: "⚡", 4: "🌙", 5: "🐉",
  6: "💨", 7: "🍖", 8: "🔮", 10: "🗡️", 11: "⚗️",
  12: "⏰", 13: "⚓", 14: "🦊", 15: "💀", 16: "🌸",
  17: "🤖",
};
