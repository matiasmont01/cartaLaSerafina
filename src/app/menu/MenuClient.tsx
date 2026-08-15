"use client";

import React, { useState, useEffect } from "react";
import { useMenu, Allergen } from "@/context/MenuContext";
import { AllergenIcon } from "@/components/AllergenIcon";

/* ─── colour tokens ───────────────────────────────────────── */
const cream = "#f2ede8";
const brown = "#5c4033";
const tan   = "#b49a7e";
const border = "#ddd5ca";

export default function MenuClient() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { categories } = useMenu();
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? "");

  const activeCategory = categories.find((c) => c.id === activeTab);

  if (!isMounted) {
    return (
      <div style={{ backgroundColor: cream, minHeight: "100vh", padding: "40px", textAlign: "center", fontFamily: "var(--font-montserrat), sans-serif", color: brown }}>
        Cargando menú...
      </div>
    );
  }

  return (
    <>
      {/* ── sticky tab navigation ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: cream,
          borderBottom: `1px solid ${border}`,
        }}
      >
        <ul
          className="hide-scrollbar"
          style={{
            display: "flex",
            overflowX: "auto",
            listStyle: "none",
            padding: "0 20px",
            margin: 0,
            gap: "28px",
          }}
        >
          {categories.map((cat) => {
            const active = cat.id === activeTab;
            return (
              <li key={cat.id} style={{ flexShrink: 0 }}>
                <button
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "18px 0",
                    cursor: "pointer",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "13px",
                    fontWeight: active ? 600 : 400,
                    letterSpacing: "0.14em",
                    color: brown,
                    opacity: active ? 1 : 0.4,
                    borderBottom: active ? `2px solid ${brown}` : "2px solid transparent",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.2s",
                  }}
                >
                  {cat.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── category content ── */}
      {activeCategory && (
        <main
          style={{
            backgroundColor: cream,
            minHeight: "100vh",
            paddingBottom: "100px",
          }}
        >
          {/* Section title */}
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "22px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textAlign: "center",
              color: brown,
              padding: "44px 24px 34px",
              borderBottom: `1px solid ${border}`,
              textTransform: "uppercase",
            }}
          >
            {activeCategory.name}
          </h2>

          {/* Items list */}
          <div style={{ padding: "0 24px" }}>
            {activeCategory.items.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  borderTop: idx === 0 ? "none" : `1px solid ${border}`,
                  padding: "30px 0",
                }}
              >
                {/* Name row — price shown here only when there is NO description */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: brown,
                      textTransform: "uppercase",
                      lineHeight: 1.4,
                      flex: 1,
                    }}
                  >
                    {item.name}
                  </h3>
                  {/* Show price here ONLY if no description */}
                  {!item.description && (
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "22px",
                        fontWeight: 600,
                        color: brown,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {item.price}
                    </span>
                  )}
                </div>

                {/* Description + Price (same row when description exists) */}
                {item.description ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "16px",
                      marginTop: "10px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: brown,
                        opacity: 0.9,
                        lineHeight: 1.6,
                        flex: 1,
                      }}
                    >
                      {item.description}
                    </p>
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "22px",
                        fontWeight: 600,
                        color: brown,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        paddingTop: "1px",
                      }}
                    >
                      {item.price}
                    </span>
                  </div>
                ) : null}

                {/* Item-level allergens */}
                {item.allergens && item.allergens.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginTop: "10px",
                    }}
                  >
                    {item.allergens.map((a) => (
                      <AllergenIcon key={a} type={a as Allergen} />
                    ))}
                  </div>
                )}

                {/* Option groups (Tostadas) */}
                {item.options && (
                  <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    {item.options.map((group) => (
                      <div
                        key={group.id}
                        style={{
                          border: `1.5px solid ${border}`,
                          borderRadius: "14px",
                          padding: "22px 24px",
                          backgroundColor: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {/* Group heading */}
                        <h4
                          style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: "14px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: brown,
                            opacity: 0.9,
                            marginBottom: "18px",
                          }}
                        >
                          {group.name}
                        </h4>

                        {/* Option rows */}
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {group.options.map((opt, oi) => (
                            <li
                              key={opt.id}
                              style={{
                                borderTop: oi === 0 ? "none" : `1px solid ${border}`,
                                padding: oi === 0 ? "0 0 16px" : "16px 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "baseline",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "var(--font-montserrat), sans-serif",
                                    fontSize: "17px",
                                    fontWeight: 500,
                                    color: brown,
                                  }}
                                >
                                  {opt.name}
                                </span>
                                {opt.priceDelta && (
                                  <span
                                    style={{
                                      fontFamily: "var(--font-playfair), serif",
                                      fontSize: "18px",
                                      fontWeight: 600,
                                      color: brown,
                                    }}
                                  >
                                    {opt.priceDelta}
                                  </span>
                                )}
                              </div>
                              {opt.allergens && opt.allergens.length > 0 && (
                                <div style={{ display: "flex", marginTop: "8px" }}>
                                  {opt.allergens.map((a) => (
                                    <AllergenIcon key={a} type={a as Allergen} />
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ── scroll-to-top FAB ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "#5c4033",
          color: cream,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          zIndex: 30,
        }}
        aria-label="Volver arriba"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
