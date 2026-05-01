"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GenreFilter } from "@/types/anime";

const GENRES: GenreFilter[] = [
  "All", "Action", "Romance", "Fantasy", "Thriller",
  "Sci-Fi", "Horror", "Sports", "Slice of Life", "Isekai", "Mecha", "Shounen",
];

interface GenreFilterBarProps {
  onSelect?: (genre: GenreFilter) => void;
}

export default function GenreFilterBar({ onSelect }: GenreFilterBarProps) {
  const [active, setActive] = useState<GenreFilter>("All");

  const handleSelect = (genre: GenreFilter) => {
    setActive(genre);
    onSelect?.(genre);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        marginBottom: "2rem",
        paddingBottom: "1.25rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {GENRES.map((genre) => {
        const isActive = active === genre;
        return (
          <motion.button
            key={genre}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(genre)}
            style={{
              background: isActive ? "var(--accent3)" : "var(--surface)",
              border: `1px solid ${isActive ? "var(--accent3)" : "var(--border)"}`,
              color: isActive ? "#fff" : "var(--text2)",
              padding: "0.3rem 0.9rem",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 500,
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent3)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text2)";
              }
            }}
          >
            {genre}
          </motion.button>
        );
      })}
    </div>
  );
}
