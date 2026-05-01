"use client";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "DMCA", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem 2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: "2rem",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: "1.2rem",
          letterSpacing: "3px",
          textTransform: "uppercase",
          background: "linear-gradient(135deg, #e63e6d, #ff9a5c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        AniStream
      </span>

      <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", flexWrap: "wrap" }}>
        {footerLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              style={{ color: "var(--text3)", fontSize: "0.8rem", transition: "color 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text2)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text3)")}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>
        © 2025 AniStream. For demo purposes only.
      </span>
    </footer>
  );
}
