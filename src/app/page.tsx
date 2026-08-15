"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MenuClient from "./menu/MenuClient";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCarta = () => {
    const cartaElement = document.getElementById("carta");
    if (cartaElement) {
      cartaElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "#b49a7e", minHeight: "100vh" }}>
      {/* ── SECTION 1: COVER / PORTADA ── */}
      <section
        id="portada"
        style={{
          minHeight: "100dvh",
          backgroundColor: "#b49a7e",
          color: "#f2ede8",
          padding: "32px 24px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {/* Spacer top */}
        <div style={{ height: "20px" }} />

        {/* Main content with scroll transform */}
        <div
          className="portada-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            maxWidth: "360px",
            transform: scrolled ? "scale(0.93) translateY(-10px)" : "scale(1) translateY(0)",
            opacity: scrolled ? 0.75 : 1,
          }}
        >
          {/* Logo Image Emblem */}
          <div
            style={{
              position: "relative",
              width: "230px",
              height: "230px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 16px 36px rgba(0,0,0,0.22)",
              marginBottom: "32px",
              border: "4px solid rgba(242, 237, 232, 0.45)",
            }}
          >
            <Image
              src="/logo.png"
              alt="La Serafina - Arte y Café"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Prominent VER CARTA Button */}
          <button
            onClick={scrollToCarta}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              maxWidth: "280px",
              padding: "18px 32px",
              backgroundColor: "#5c4033",
              color: "#f2ede8",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              border: "1px solid rgba(242, 237, 232, 0.25)",
              boxShadow: "0 10px 28px rgba(60, 40, 30, 0.4)",
              cursor: "pointer",
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            <span>VER CARTA</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        {/* Dynamic Minimalist Paper Indicator */}
        <div
          onClick={scrollToCarta}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: "12px",
            userSelect: "none",
            opacity: scrolled ? 0.3 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: "#f2ede8",
              opacity: 0.9,
              textTransform: "uppercase",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            Desliza para desplegar la carta
          </span>
          <div className="animate-bounce-down" style={{ display: "flex", alignItems: "center" }}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f2ede8"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 10l5 5 5-5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TACTILE PAPER MENU SHEET ── */}
      <div id="carta" className="paper-sheet">
        {/* Paper drag handle indicator */}
        <div className="paper-drag-handle" />

        {/* Full Menu Content */}
        <MenuClient />
      </div>
    </div>
  );
}
