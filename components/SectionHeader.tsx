"use client";

interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
  href?: string;
}

export default function SectionHeader({
  title,
  showSeeAll = true,
  href = "#",
}: SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.1rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          letterSpacing: "0.5px",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          color: "var(--text)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "1.1rem",
            background: "var(--accent)",
            borderRadius: "2px",
            flexShrink: 0,
          }}
        />
        {title}
      </h2>

      {showSeeAll && (
        <a
          href={href}
          style={{
            color: "var(--accent)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.3px",
            transition: "opacity 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
        >
          View all →
        </a>
      )}
    </div>
  );
}
