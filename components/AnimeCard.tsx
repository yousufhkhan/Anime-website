"use client";

import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { JikanAnime } from "@/lib/useAnime";

interface AnimeCardProps {
  anime: JikanAnime;
  index?: number;
  isNew?: boolean;
  showTime?: boolean;
}

export default function AnimeCard({ anime, index = 0, isNew, showTime }: AnimeCardProps) {
  const title = anime.title_english || anime.title;
  const img = anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url;
  const airTime = anime.broadcast?.time;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -5 }}
      style={{
        background: "var(--surface)", borderRadius: "10px", overflow: "hidden",
        cursor: "pointer", border: "1px solid var(--border)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,62,109,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 30px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      <div style={{ aspectRatio: "2/3", background: "var(--bg3)", position: "relative", overflow: "hidden" }}>
        {img ? (
          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(135deg, hsl(${(anime.mal_id * 47) % 360},40%,12%), hsl(${(anime.mal_id * 47 + 60) % 360},50%,18%))`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem",
          }}>🎌</div>
        )}

        {/* Hover play overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,10,16,0.9) 0%, transparent 55%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, transition: "opacity 0.2s",
        }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0")}
        >
          <div style={{
            width: "44px", height: "44px", background: "var(--accent)",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Play size={17} fill="#fff" color="#fff" />
          </div>
        </div>

        {/* Air time badge */}
        {showTime && airTime && (
          <span style={{
            position: "absolute", top: "8px", left: "8px",
            background: "rgba(10,10,16,0.88)", color: "var(--gold)",
            fontSize: "0.62rem", fontWeight: 700, padding: "0.2rem 0.5rem",
            borderRadius: "5px", zIndex: 3, letterSpacing: "0.3px",
          }}>
            🕐 {airTime}
          </span>
        )}

        {/* NEW badge */}
        {isNew && (
          <span style={{
            position: "absolute", top: "8px", right: "8px",
            background: "var(--accent)", color: "#fff",
            fontSize: "0.6rem", fontWeight: 700, padding: "0.15rem 0.45rem",
            borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.5px", zIndex: 3,
          }}>NEW</span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "0.65rem 0.75rem" }}>
        <p style={{
          fontSize: "0.85rem", fontWeight: 600, color: "var(--text)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "0.25rem",
        }}>{title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem" }}>
          {anime.score && (
            <span style={{ color: "var(--gold)", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px" }}>
              <Star size={10} fill="var(--gold)" />{anime.score}
            </span>
          )}
          {anime.score && anime.genres?.[0] && <span style={{ color: "var(--text3)" }}>•</span>}
          <span style={{ color: "var(--text3)" }}>{anime.genres?.[0]?.name}</span>
        </div>
      </div>
    </motion.div>
  );
}
