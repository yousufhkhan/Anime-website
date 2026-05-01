"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { JikanAnime } from "@/lib/useAnime";

interface HeroProps {
  anime: JikanAnime[];
  isLoading?: boolean;
}

export default function HeroBanner({ anime, isLoading }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // Reset index if anime list changes (data loads in)
  useEffect(() => { setCurrent(0); }, [anime.length]);

  // Auto-advance every 8s
  useEffect(() => {
    if (anime.length < 2) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % anime.length);
    }, 8000);
    return () => clearInterval(t);
  }, [anime.length]);

  const prev = () => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + anime.length) % anime.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((p) => (p + 1) % anime.length);
  };

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const item = anime[current];
  const title = item?.title_english || item?.title || "";
  const img = item?.images?.webp?.large_image_url || item?.images?.jpg?.large_image_url;
  const synopsis = item?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, "").trim();

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -50 : 50 }),
  };

  if (isLoading || anime.length === 0) {
    return (
      <section style={{
        position: "relative", height: "520px", overflow: "hidden",
        background: "linear-gradient(135deg, #0d0d18, #1a0a2e)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "48px", height: "48px", border: "3px solid var(--surface2)",
            borderTopColor: "var(--accent)", borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 1rem",
          }} />
          <p style={{ color: "var(--text3)", fontSize: "0.85rem" }}>Loading featured anime...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    );
  }

  return (
    <section style={{ position: "relative", height: "520px", overflow: "hidden" }}>

      {/* Background — crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: "absolute", inset: 0, background: "#0d0d18" }}
        >
          {img && (
            <img
              src={img}
              alt={title}
              style={{
                position: "absolute", right: 0, top: 0,
                height: "100%", width: "68%",
                objectFit: "cover", objectPosition: "center top",
                filter: "saturate(1.15) brightness(0.9)",
              }}
            />
          )}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(10,10,16,1) 30%, rgba(10,10,16,0.8) 55%, rgba(10,10,16,0.1) 100%), linear-gradient(to top, rgba(10,10,16,1) 0%, transparent 45%)",
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", alignItems: "flex-end", padding: "2.5rem",
        maxWidth: "620px",
      }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: "easeInOut" }}
            style={{ width: "100%" }}
          >
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "rgba(230,62,109,0.15)", color: "#ff7fa8",
              border: "1px solid rgba(230,62,109,0.3)", borderRadius: "20px",
              padding: "0.25rem 0.75rem", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "0.9rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e63e6d", display: "inline-block" }} />
              {item?.status === "Currently Airing" ? "Now Airing" : "Featured"}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: "clamp(1.8rem, 3vw, 3rem)", fontWeight: 800, lineHeight: 1.1,
              marginBottom: "0.75rem", letterSpacing: "-0.3px", color: "var(--text)",
            }}>
              {title}
            </h1>

            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
              {item?.score && (
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--gold)", fontWeight: 700, fontSize: "0.875rem" }}>
                  <Star size={13} fill="var(--gold)" /> {item.score}
                </span>
              )}
              {item?.year && <><span style={{ color: "var(--text3)", fontSize: "0.8rem" }}>•</span><span style={{ color: "var(--text2)", fontSize: "0.8rem" }}>{item.year}</span></>}
              {item?.episodes && <><span style={{ color: "var(--text3)", fontSize: "0.8rem" }}>•</span><span style={{ color: "var(--text2)", fontSize: "0.8rem" }}>{item.episodes} Episodes</span></>}
              {item?.rank && <><span style={{ color: "var(--text3)", fontSize: "0.8rem" }}>•</span><span style={{ color: "var(--text2)", fontSize: "0.8rem" }}>MAL #{item.rank}</span></>}
            </div>

            {/* Synopsis */}
            <p style={{
              color: "var(--text2)", fontSize: "0.875rem", lineHeight: 1.65,
              marginBottom: "1.1rem", maxWidth: "480px",
              display: "-webkit-box", WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {synopsis}
            </p>

            {/* Genres */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.4rem" }}>
              {item?.genres?.slice(0, 4).map((g) => (
                <span key={g.name} style={{
                  background: "rgba(124,58,237,0.18)", color: "#c4b5fd",
                  border: "1px solid rgba(124,58,237,0.22)", borderRadius: "6px",
                  padding: "0.2rem 0.65rem", fontSize: "0.72rem", fontWeight: 500,
                }}>{g.name}</span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--accent)", color: "#fff", border: "none",
                padding: "0.65rem 1.5rem", borderRadius: "10px",
                fontSize: "0.925rem", fontWeight: 700, cursor: "pointer",
                transition: "opacity 0.2s, transform 0.15s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <Play size={15} fill="#fff" /> Watch Now
              </button>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(255,255,255,0.08)", color: "var(--text)",
                border: "1px solid var(--border)", padding: "0.65rem 1.25rem",
                borderRadius: "10px", fontSize: "0.925rem", fontWeight: 500,
                cursor: "pointer", transition: "background 0.2s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
              >
                <Plus size={15} /> Add to List
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LEFT ARROW */}
      <button onClick={prev} style={{
        position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)",
        zIndex: 10, background: "rgba(10,10,16,0.65)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)", color: "#fff",
        width: "46px", height: "46px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(230,62,109,0.35)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,62,109,0.6)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(10,10,16,0.65)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* RIGHT ARROW */}
      <button onClick={next} style={{
        position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)",
        zIndex: 10, background: "rgba(10,10,16,0.65)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)", color: "#fff",
        width: "46px", height: "46px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(230,62,109,0.35)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,62,109,0.6)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(10,10,16,0.65)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
      >
        <ChevronRight size={22} />
      </button>

      {/* DOTS */}
      <div style={{
        position: "absolute", bottom: "1.5rem", right: "2rem",
        zIndex: 10, display: "flex", gap: "0.45rem", alignItems: "center",
      }}>
        {anime.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? "24px" : "7px", height: "7px",
            borderRadius: i === current ? "3.5px" : "50%",
            background: i === current ? "var(--accent)" : "rgba(255,255,255,0.3)",
            border: "none", padding: 0, cursor: "pointer",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>

      {/* Slide counter */}
      <div style={{
        position: "absolute", bottom: "1.5rem", left: "2.5rem",
        zIndex: 10, color: "var(--text3)", fontSize: "0.75rem", fontWeight: 600,
      }}>
        {String(current + 1).padStart(2, "0")} / {String(anime.length).padStart(2, "0")}
      </div>
    </section>
  );
}
