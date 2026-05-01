"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Schedule", href: "/schedule" },
  { label: "Movies", href: "/movies" },
  { label: "Genre", href: "/genre" },
  { label: "Top Anime", href: "/top" },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10,10,16,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        gap: "2rem",
      }}
    >
      <Link
        href="/"
        style={{
          fontWeight: 700,
          fontSize: "1.4rem",
          letterSpacing: "3px",
          textTransform: "uppercase",
          background: "linear-gradient(135deg, #e63e6d, #ff9a5c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          flexShrink: 0,
          textDecoration: "none",
        }}
      >
        AniStream
      </Link>

      <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", flex: 1 }}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{ color: "var(--text2)", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text2)")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginLeft: "auto" }}>
        <div
          style={{
            display: "flex", alignItems: "center",
            background: "var(--surface)",
            border: `1px solid ${searchOpen ? "var(--accent3)" : "var(--border)"}`,
            borderRadius: "8px", padding: "0.35rem 0.75rem", gap: "0.5rem", transition: "border-color 0.2s",
          }}
        >
          <Search size={14} color="var(--text3)" />
          <input
            type="text"
            placeholder="Search anime..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
            style={{
              background: "none", border: "none", outline: "none",
              color: "var(--text)", fontSize: "0.875rem", fontFamily: "inherit", width: "180px",
            }}
          />
        </div>

        <button
          style={{
            background: "none", border: "1px solid var(--border)", color: "var(--text2)",
            padding: "0.35rem 0.9rem", borderRadius: "8px", fontSize: "0.875rem", fontWeight: 500,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--text3)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text2)"; }}
        >
          Log in
        </button>

        <button
          style={{
            background: "var(--accent)", border: "none", color: "#fff",
            padding: "0.38rem 1rem", borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
}
