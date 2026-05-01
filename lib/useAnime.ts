"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const JIKAN = "https://api.jikan.moe/v4";
const SWR_OPTS = { revalidateOnFocus: false, dedupingInterval: 60000 * 15 };

export interface JikanAnime {
  mal_id: number;
  title: string;
  title_english?: string;
  synopsis?: string;
  score?: number;
  episodes?: number;
  year?: number;
  status?: string;
  genres?: { name: string }[];
  images: {
    jpg: { image_url: string; large_image_url: string };
    webp?: { image_url: string; large_image_url: string };
  };
  members?: number;
  rank?: number;
  broadcast?: { day?: string; time?: string; timezone?: string };
}

// Top 10 ranked — hero carousel + Top Ranked section
export function useTopAnime() {
  const { data, error, isLoading } = useSWR(`${JIKAN}/top/anime?limit=10`, fetcher, SWR_OPTS);
  return { anime: (data?.data ?? []) as JikanAnime[], isLoading, error };
}

// Currently airing sorted by broadcast time descending (latest aired first)
export function useAiringAnime() {
  const { data, error, isLoading } = useSWR(
    `${JIKAN}/top/anime?filter=airing&limit=16`, fetcher, SWR_OPTS
  );

  const sorted = [...((data?.data ?? []) as JikanAnime[])].sort((a, b) => {
    // Put anime WITH known time first, sorted descending by time
    const tA = a.broadcast?.time ?? "";
    const tB = b.broadcast?.time ?? "";
    if (!tA && !tB) return 0;
    if (!tA) return 1;
    if (!tB) return -1;
    return tB.localeCompare(tA); // e.g. "23:30" > "09:00"
  });

  return { anime: sorted, isLoading, error };
}

// Most popular by member count — separate endpoint
export function usePopularAnime() {
  const { data, error, isLoading } = useSWR(
    `${JIKAN}/top/anime?filter=bypopularity&limit=8`, fetcher, SWR_OPTS
  );
  return { anime: (data?.data ?? []) as JikanAnime[], isLoading, error };
}

// Per-day schedule from Jikan — fetches each day separately for accuracy
function useDaySchedule(day: string) {
  const { data } = useSWR(`${JIKAN}/schedules/${day}?limit=10`, fetcher, SWR_OPTS);
  return (data?.data ?? []) as JikanAnime[];
}

export function useSchedule() {
  const monday    = useDaySchedule("monday");
  const tuesday   = useDaySchedule("tuesday");
  const wednesday = useDaySchedule("wednesday");
  const thursday  = useDaySchedule("thursday");
  const friday    = useDaySchedule("friday");
  const saturday  = useDaySchedule("saturday");
  const sunday    = useDaySchedule("sunday");

  return {
    days: { monday, tuesday, wednesday, thursday, friday, saturday, sunday },
  };
}
