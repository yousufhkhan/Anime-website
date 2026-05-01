"use client";

import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import AnimeCard from "@/components/AnimeCard";
import TrendingItem from "@/components/TrendingItem";
import GenreFilterBar from "@/components/GenreFilterBar";
import SectionHeader from "@/components/SectionHeader";
import ScheduleGrid from "@/components/ScheduleGrid";
import Footer from "@/components/Footer";
import { useTopAnime, useAiringAnime, usePopularAnime } from "@/lib/useAnime";

const CARD_GRID = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
  gap: "1rem",
} as const;

function CardSkeleton() {
  return (
    <div style={{ background: "var(--surface)", borderRadius: "10px", border: "1px solid var(--border)", overflow: "hidden" }}>
      <div style={{ aspectRatio: "2/3", background: "var(--bg3)", animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ padding: "0.65rem 0.75rem" }}>
        <div style={{ height: "12px", background: "var(--bg3)", borderRadius: "4px", marginBottom: "8px", animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: "10px", background: "var(--bg3)", borderRadius: "4px", width: "60%", animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

export default function HomePage() {
  const { anime: topAnime,     isLoading: topLoading }     = useTopAnime();
  const { anime: airingAnime,  isLoading: airingLoading }  = useAiringAnime();
  const { anime: popularAnime, isLoading: popularLoading } = usePopularAnime();

  const skeletons = (n: number) => Array.from({ length: n }).map((_, i) => <CardSkeleton key={i} />);

  return (
    <>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>

      <Navbar />
      <HeroBanner anime={topAnime.slice(0, 8)} isLoading={topLoading} />

      <main style={{ padding: "2rem 2rem 4rem" }}>
        <GenreFilterBar />

        {/* Currently Airing — sorted by air time, latest first */}
        <section style={{ marginBottom: "2.5rem" }}>
          <SectionHeader title="Currently Airing" />
          <p style={{ color: "var(--text3)", fontSize: "0.74rem", marginTop: "-0.65rem", marginBottom: "1rem" }}>
            Sorted by broadcast time (JST) — latest first
          </p>
          <div style={CARD_GRID}>
            {airingLoading ? skeletons(8) : airingAnime.map((anime, i) => (
              <AnimeCard key={anime.mal_id} anime={anime} index={i} isNew showTime />
            ))}
          </div>
        </section>

        {/* Top Ranked on MAL — card grid */}
        <section style={{ marginBottom: "2.5rem" }}>
          <SectionHeader title="Top Ranked on MAL" />
          <div style={CARD_GRID}>
            {topLoading ? skeletons(10) : topAnime.map((anime, i) => (
              <TrendingItem key={anime.mal_id} anime={anime} rank={i + 1} index={i} />
            ))}
          </div>
        </section>

        {/* Most Popular on MAL — card grid */}
        <section style={{ marginBottom: "2.5rem" }}>
          <SectionHeader title="Most Popular on MAL" />
          <div style={CARD_GRID}>
            {popularLoading ? skeletons(8) : popularAnime.length > 0
              ? popularAnime.map((anime, i) => (
                  <AnimeCard key={anime.mal_id} anime={anime} index={i} />
                ))
              : skeletons(8)  /* fallback while SWR hydrates */
            }
          </div>
        </section>

        {/* Airing Schedule */}
        <section style={{ marginBottom: "2.5rem" }}>
          <SectionHeader title="Airing Schedule" showSeeAll={false} />
          <p style={{ color: "var(--text3)", fontSize: "0.74rem", marginTop: "-0.65rem", marginBottom: "1rem" }}>
            All times in JST — sourced from MyAnimeList via Jikan
          </p>
          <ScheduleGrid />
        </section>
      </main>

      <Footer />
    </>
  );
}
