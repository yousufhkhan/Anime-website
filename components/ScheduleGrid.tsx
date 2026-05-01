"use client";

import { useSchedule } from "@/lib/useAnime";

const DAY_KEYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
const DAY_LABELS: Record<string, string> = {
  monday:"Mon", tuesday:"Tue", wednesday:"Wed",
  thursday:"Thu", friday:"Fri", saturday:"Sat", sunday:"Sun",
};

function getTodayKey(): string {
  const map: Record<number, string> = {
    0:"sunday",1:"monday",2:"tuesday",3:"wednesday",
    4:"thursday",5:"friday",6:"saturday",
  };
  return map[new Date().getDay()];
}

export default function ScheduleGrid() {
  const { days } = useSchedule();
  const today = getTodayKey();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}>
      {DAY_KEYS.map((dayKey) => {
        const isToday = dayKey === today;
        // Sort by broadcast time ascending (earliest first for schedule view)
        const entries = [...(days[dayKey as keyof typeof days] ?? [])].sort((a, b) => {
          const tA = a.broadcast?.time ?? "99:99";
          const tB = b.broadcast?.time ?? "99:99";
          return tA.localeCompare(tB);
        });

        return (
          <div key={dayKey} style={{
            background: "var(--surface)",
            border: `1px solid ${isToday ? "rgba(230,62,109,0.4)" : "var(--border)"}`,
            borderRadius: "10px", overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              background: isToday ? "rgba(230,62,109,0.1)" : "var(--surface2)",
              padding: "0.5rem", textAlign: "center", borderBottom: "1px solid var(--border)",
            }}>
              <span style={{
                fontSize: "0.7rem", fontWeight: 700,
                color: isToday ? "var(--accent)" : "var(--text3)",
                textTransform: "uppercase", letterSpacing: "0.8px",
              }}>{DAY_LABELS[dayKey]}</span>
              {isToday && (
                <div style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: "var(--accent)", margin: "3px auto 0",
                }} />
              )}
            </div>

            {/* Entries */}
            <div style={{ padding: "0.4rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {entries.slice(0, 7).map((anime) => (
                <div key={anime.mal_id}
                  title={`${anime.title_english || anime.title}${anime.broadcast?.time ? ` — ${anime.broadcast.time} JST` : ""}`}
                  style={{
                    fontSize: "0.62rem",
                    color: isToday ? "#ff7fa8" : "var(--text2)",
                    background: "var(--bg3)", borderRadius: "5px",
                    padding: "0.3rem 0.4rem", cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = isToday ? "#ff7fa8" : "var(--text2)")}
                >
                  {/* Time */}
                  {anime.broadcast?.time && (
                    <span style={{ color: "var(--gold)", fontWeight: 700, marginRight: "0.3rem" }}>
                      {anime.broadcast.time}
                    </span>
                  )}
                  {/* Title — truncated */}
                  <span style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {anime.title_english || anime.title}
                  </span>
                </div>
              ))}
              {entries.length === 0 && (
                <div style={{ fontSize: "0.62rem", color: "var(--text3)", padding: "0.4rem", textAlign: "center" }}>—</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
