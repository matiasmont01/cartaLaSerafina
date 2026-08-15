import React from "react";
import { Allergen } from "@/context/MenuContext";

/* ── SVG icons with thicker stroke and larger dimensions ───── */
const icons: Record<Allergen, React.ReactNode> = {
  gluten: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M8 6c0 0 1 3 4 3M16 6c0 0-1 3-4 3M8 12c0 0 1 3 4 3M16 12c0 0-1 3-4 3" />
    </svg>
  ),
  lacteos: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.5c4 0 7-2.5 7-6.5C19 9 12 3 12 3S5 9 5 14c0 4 3 6.5 7 6.5Z" />
    </svg>
  ),
  huevo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="13" rx="6.5" ry="8" />
    </svg>
  ),
  soja: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8c-2 2-2 6 0 8M12 8c2 2 2 6 0 8" />
    </svg>
  ),
  frutos_secos: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C8 3 4 7 4 11c0 5 8 10 8 10s8-5 8-10c0-4-4-8-8-8Z" />
      <path d="M9 11a3 3 0 0 0 6 0" />
    </svg>
  ),
  pescado: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12C20 12 16 8 10 8C6 8 3 10 2 12C3 14 6 16 10 16C16 16 20 12 20 12Z" />
      <path d="M2 12L5 9M2 12L5 15" />
      <circle cx="16" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  sesamo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="14" rx="2" ry="3.5" />
      <ellipse cx="17" cy="9" rx="2" ry="3.5" transform="rotate(30 17 9)" />
      <ellipse cx="7" cy="9" rx="2" ry="3.5" transform="rotate(-30 7 9)" />
    </svg>
  ),
};

const labels: Record<Allergen, string> = {
  gluten: "GLUTEN",
  lacteos: "LÁCTEOS",
  huevo: "HUEVO",
  soja: "SOJA",
  frutos_secos: "FR. SECOS",
  pescado: "PESCADO",
  sesamo: "SÉSAMO",
};

export const AllergenIcon = ({ type }: { type: Allergen }) => (
  <div
    style={{
      color: "var(--color-text-brown)",
      opacity: 0.85,
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "16px",
      marginTop: "4px",
    }}
  >
    {icons[type]}
    <span
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        marginTop: "4px",
        fontFamily: "var(--font-montserrat), sans-serif",
      }}
    >
      {labels[type]}
    </span>
  </div>
);
