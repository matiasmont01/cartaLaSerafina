"use client";

import React, { useState, useEffect } from "react";
import {
  useMenu,
  MenuItem,
  Allergen,
} from "@/context/MenuContext";

/* ─────────────────────────────────────────────────────────────
   LOGIN GATE
   Session is persisted in sessionStorage (clears on tab close).
──────────────────────────────────────────────────────────────── */
const ADMIN_USER = "Geogina2026+";
const ADMIN_PASS = "Onita4478";
const SESSION_KEY = "la_serafina_admin_session";

function LoginGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  /* Check existing session on mount */
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === "ok") setAuthed(true);
    setChecked(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "ok");
      setAuthed(true);
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos.");
      setPass("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setUser("");
    setPass("");
  };

  if (!checked) return null;

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#b49a7e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            background: "#f5f4f2",
            borderRadius: "20px",
            padding: "40px 32px",
            width: "100%",
            maxWidth: "380px",
            boxShadow: "0 20px 60px rgba(45,28,18,0.3)",
          }}
        >
          {/* Logo text */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#5c4033",
                letterSpacing: "0.08em",
                marginBottom: "4px",
              }}
            >
              La Serafina
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#9a8070",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              · Panel de Administración ·
            </div>
          </div>

          <form onSubmit={handleLogin}>
            {/* Username */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#5c4033",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                Usuario
              </label>
              <input
                type="text"
                autoComplete="username"
                value={user}
                onChange={(e) => { setUser(e.target.value); setError(""); }}
                placeholder="Ingresá tu usuario"
                required
                style={{
                  width: "100%",
                  border: "1.5px solid #ddd5ca",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  backgroundColor: "#fff",
                  color: "#3a2a20",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#b49a7e")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd5ca")}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#5c4033",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={pass}
                  onChange={(e) => { setPass(e.target.value); setError(""); }}
                  placeholder="Ingresá tu contraseña"
                  required
                  style={{
                    width: "100%",
                    border: "1.5px solid #ddd5ca",
                    borderRadius: "10px",
                    padding: "12px 44px 12px 14px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    backgroundColor: "#fff",
                    color: "#3a2a20",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#b49a7e")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd5ca")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9a8070",
                    fontSize: "16px",
                    padding: "4px",
                  }}
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                style={{
                  background: "#fff0f0",
                  border: "1px solid #e8c0c0",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#b03030",
                  fontSize: "13px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#5c4033",
                color: "#f2ede8",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                cursor: "pointer",
                textTransform: "uppercase",
                boxShadow: "0 6px 20px rgba(92,64,51,0.3)",
                transition: "opacity 0.2s",
                fontFamily: "inherit",
              }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* Authed — render admin panel with a logout button injected via context trick */
  return (
    <div>
      {/* Logout bar */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            background: "#fff",
            color: "#cc3333",
            border: "1.5px solid #e8c0c0",
            borderRadius: "50px",
            padding: "8px 18px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Cerrar sesión
        </button>
      </div>
      {children}
    </div>
  );
}


/* ─── shared styles ─── */
const ALL_ALLERGENS: Allergen[] = [
  "gluten", "lacteos", "huevo", "soja",
  "frutos_secos", "pescado", "sesamo",
];

const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: "Gluten",
  lacteos: "Lácteos",
  huevo: "Huevo",
  soja: "Soja",
  frutos_secos: "Frutos secos",
  pescado: "Pescado",
  sesamo: "Sésamo",
};

const s = {
  page: {
    minHeight: "100vh",
    background: "#f5f4f2",
    fontFamily: "system-ui, sans-serif",
    color: "#1a1a1a",
  } as React.CSSProperties,
  header: {
    background: "#5c4033",
    color: "#fff",
    padding: "20px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,
  headerTitle: {
    fontSize: "18px",
    fontWeight: 600,
    letterSpacing: "0.05em",
  } as React.CSSProperties,
  headerSub: {
    fontSize: "12px",
    opacity: 0.65,
    marginTop: "2px",
  } as React.CSSProperties,
  layout: {
    display: "flex",
    gap: "24px",
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  } as React.CSSProperties,
  sidebar: {
    width: "240px",
    flexShrink: 0,
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    alignSelf: "flex-start",
  } as React.CSSProperties,
  sidebarLabel: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    color: "#888",
    textTransform: "uppercase" as const,
    marginBottom: "12px",
  } as React.CSSProperties,
  catBtn: (active: boolean): React.CSSProperties => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: active ? 600 : 400,
    background: active ? "#f2ede8" : "transparent",
    color: active ? "#5c4033" : "#444",
    marginBottom: "4px",
    transition: "background 0.15s",
  }),
  newCatInput: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "9px 12px",
    fontSize: "13px",
    marginBottom: "8px",
    outline: "none",
  } as React.CSSProperties,
  addCatBtn: {
    width: "100%",
    background: "#5c4033",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "9px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  } as React.CSSProperties,
  main: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    marginBottom: "20px",
    overflow: "hidden",
  } as React.CSSProperties,
  cardHeader: {
    padding: "18px 24px",
    borderBottom: "1px solid #f0ece8",
    fontSize: "15px",
    fontWeight: 600,
    color: "#5c4033",
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  } as React.CSSProperties,
  th: {
    padding: "12px 16px",
    background: "#faf8f6",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#999",
    textAlign: "left" as const,
    borderBottom: "1px solid #f0ece8",
  } as React.CSSProperties,
  td: {
    padding: "14px 16px",
    borderBottom: "1px solid #f0ece8",
    fontSize: "14px",
    verticalAlign: "top" as const,
  } as React.CSSProperties,
  editBtn: {
    background: "#eef4ff",
    color: "#3366cc",
    border: "none",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    marginRight: "8px",
  } as React.CSSProperties,
  delBtn: {
    background: "#fff0f0",
    color: "#cc3333",
    border: "none",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  } as React.CSSProperties,
  form: {
    padding: "24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  } as React.CSSProperties,
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  } as React.CSSProperties,
  label: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#555",
    marginBottom: "6px",
    display: "block",
  } as React.CSSProperties,
  input: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
  } as React.CSSProperties,
  textarea: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical" as const,
    fontFamily: "inherit",
    minHeight: "80px",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  allergenGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: "8px",
  } as React.CSSProperties,
  allergenChip: (selected: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 12px",
    borderRadius: "8px",
    border: `1.5px solid ${selected ? "#5c4033" : "#ddd"}`,
    background: selected ? "#f2ede8" : "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: selected ? 600 : 400,
    color: selected ? "#5c4033" : "#666",
    transition: "all 0.15s",
  }),
  saveBtn: {
    background: "#5c4033",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 28px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    alignSelf: "flex-start",
  } as React.CSSProperties,
  cancelBtn: {
    background: "#f0ece8",
    color: "#5c4033",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    marginLeft: "10px",
  } as React.CSSProperties,
};

/* ── empty form state ── */
const emptyForm = (): Partial<MenuItem> => ({
  name: "",
  price: "",
  description: "",
  allergens: [],
});

export default function AdminClient() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { categories, addItem, updateItem, deleteItem, addCategory, resetMenu, saveToServer, isSaving, lastSaved } = useMenu();
  const [publishStatus, setPublishStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? "");
  const [newCategoryName, setNewCategoryName] = useState("");

  /* form state — used both for NEW and EDIT */
  const [formMode, setFormMode] = useState<"none" | "add" | "edit">("none");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<MenuItem>>(emptyForm());

  const activeCategory = categories.find((c) => c.id === activeTab);

  if (!isMounted) {
    return (
      <div style={{ padding: "40px", fontFamily: "sans-serif", color: "#5c4033", backgroundColor: "#f5f4f2", minHeight: "100vh" }}>
        Cargando panel de administración...
      </div>
    );
  }

  /* ── helpers ── */
  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
    setFormMode("add");
  };

  const openEdit = (item: MenuItem) => {
    setForm({
      name: item.name,
      price: item.price,
      description: item.description ?? "",
      allergens: item.allergens ?? [],
    });
    setEditingId(item.id);
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode("none");
    setEditingId(null);
    setForm(emptyForm());
  };

  const toggleAllergen = (a: Allergen) => {
    setForm((prev) => {
      const cur = prev.allergens ?? [];
      return {
        ...prev,
        allergens: cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a],
      };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !activeCategory) return;

    const item: MenuItem = {
      id: editingId ?? `item-${Date.now()}`,
      name: form.name.toUpperCase(),
      price: form.price,
      description: form.description || undefined,
      allergens: form.allergens?.length ? form.allergens : undefined,
    };

    if (formMode === "edit" && editingId) {
      updateItem(activeCategory.id, editingId, item);
    } else {
      addItem(activeCategory.id, item);
    }
    closeForm();
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const id = `cat-${Date.now()}`;
    addCategory({ id, name: newCategoryName.toUpperCase(), items: [] });
    setNewCategoryName("");
    setActiveTab(id);
  };

  const handlePublish = async () => {
    setPublishStatus("saving");
    try {
      await saveToServer(categories);
      setPublishStatus("ok");
      setTimeout(() => setPublishStatus("idle"), 3000);
    } catch {
      setPublishStatus("error");
      setTimeout(() => setPublishStatus("idle"), 4000);
    }
  };

  /* ─── RENDER ─── */
  return (
    <LoginGate>
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <div>
          <div style={s.headerTitle}>La Serafina — Panel de Administración</div>
          <div style={s.headerSub}>
            Gestiona categorías y productos de la carta
            {lastSaved && (
              <span style={{ marginLeft: "12px", opacity: 0.7 }}>
                · Publicado: {lastSaved.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Publish button */}
          <button
            onClick={handlePublish}
            disabled={isSaving || publishStatus === "saving"}
            style={{
              fontSize: "13px",
              fontWeight: 700,
              cursor: isSaving ? "wait" : "pointer",
              border: "none",
              borderRadius: "8px",
              padding: "8px 18px",
              background: publishStatus === "ok"
                ? "#2e7d52"
                : publishStatus === "error"
                ? "#b03030"
                : "#f0c060",
              color: publishStatus === "ok" || publishStatus === "error" ? "#fff" : "#3a2a20",
              fontFamily: "inherit",
              transition: "background 0.3s",
              opacity: isSaving ? 0.7 : 1,
            }}
          >
            {publishStatus === "saving" || isSaving
              ? "Publicando..."
              : publishStatus === "ok"
              ? "✓ Publicado"
              : publishStatus === "error"
              ? "✗ Error — reintentá"
              : "☁ Publicar carta"}
          </button>
          <a
            href="/menu"
            style={{
              fontSize: "12px",
              color: "#f2ede8",
              opacity: 0.9,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "8px",
              padding: "6px 14px",
              background: "rgba(255,255,255,0.1)",
            }}
          >
            ← Ver Carta
          </a>
        </div>
      </header>

      {/* Layout */}
      <div style={s.layout}>
        {/* Sidebar */}
        <aside style={s.sidebar}>
          <p style={s.sidebarLabel}>Categorías</p>
          {categories.map((cat) => (
            <button
              key={cat.id}
              style={s.catBtn(cat.id === activeTab)}
              onClick={() => { setActiveTab(cat.id); closeForm(); }}
            >
              {cat.name}
              <span style={{ float: "right", opacity: 0.45, fontWeight: 400 }}>
                {cat.items.length}
              </span>
            </button>
          ))}

          <div style={{ borderTop: "1px solid #f0ece8", marginTop: "16px", paddingTop: "16px" }}>
            <p style={s.sidebarLabel}>Nueva categoría</p>
            <form onSubmit={handleAddCategory}>
              <input
                style={s.newCatInput}
                type="text"
                placeholder="Ej. Zumos"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button type="submit" style={s.addCatBtn}>+ Agregar</button>
            </form>
          </div>
        </aside>

        {/* Main */}
        <main style={s.main}>
          {activeCategory ? (
            <>
              {/* Products table */}
              <div style={s.card}>
                <div style={{ ...s.cardHeader, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{activeCategory.name}</span>
                  <button
                    onClick={openAdd}
                    style={{
                      background: "#5c4033",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 18px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    + Nuevo producto
                  </button>
                </div>

                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={s.th}>Nombre</th>
                      <th style={s.th}>Descripción</th>
                      <th style={s.th}>Precio</th>
                      <th style={s.th}>Alérgenos</th>
                      <th style={s.th}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCategory.items.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ ...s.td, textAlign: "center", color: "#aaa", padding: "32px" }}>
                          No hay productos. Haz clic en "Nuevo producto" para agregar.
                        </td>
                      </tr>
                    )}
                    {activeCategory.items.map((item) => (
                      <tr
                        key={item.id}
                        style={{ background: editingId === item.id ? "#faf8f6" : "transparent" }}
                      >
                        <td style={{ ...s.td, fontWeight: 600, minWidth: "120px" }}>
                          {item.name}
                        </td>
                        <td style={{ ...s.td, color: "#666", maxWidth: "260px" }}>
                          {item.description ?? <span style={{ opacity: 0.35 }}>—</span>}
                        </td>
                        <td style={{ ...s.td, whiteSpace: "nowrap", fontWeight: 600 }}>
                          {item.price}
                        </td>
                        <td style={s.td}>
                          {item.allergens?.length
                            ? item.allergens.map((a) => ALLERGEN_LABELS[a]).join(", ")
                            : <span style={{ opacity: 0.35 }}>—</span>}
                        </td>
                        <td style={{ ...s.td, whiteSpace: "nowrap" }}>
                          <button style={s.editBtn} onClick={() => openEdit(item)}>
                            Editar
                          </button>
                          <button
                            style={s.delBtn}
                            onClick={() => {
                              if (confirm(`¿Eliminar "${item.name}"?`)) {
                                deleteItem(activeCategory.id, item.id);
                                if (editingId === item.id) closeForm();
                              }
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add / Edit form */}
              {formMode !== "none" && (
                <div style={s.card}>
                  <div style={s.cardHeader}>
                    {formMode === "edit" ? `Editar producto: ${editingId ? activeCategory.items.find(i => i.id === editingId)?.name : ""}` : "Nuevo producto"}
                  </div>
                  <form onSubmit={handleSave} style={s.form}>
                    {/* Name + Price */}
                    <div style={s.formGrid}>
                      <div>
                        <label style={s.label}>Nombre *</label>
                        <input
                          style={s.input}
                          type="text"
                          placeholder="Ej. ESPRESSO"
                          value={form.name ?? ""}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label style={s.label}>Precio *</label>
                        <input
                          style={s.input}
                          type="text"
                          placeholder="Ej. 1.50€"
                          value={form.price ?? ""}
                          onChange={(e) => setForm({ ...form, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label style={s.label}>Descripción</label>
                      <textarea
                        style={s.textarea}
                        placeholder="Descripción que verá el cliente en la carta"
                        value={form.description ?? ""}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                    </div>

                    {/* Allergens */}
                    <div>
                      <label style={s.label}>Alérgenos</label>
                      <div style={s.allergenGrid}>
                        {ALL_ALLERGENS.map((a) => {
                          const selected = (form.allergens ?? []).includes(a);
                          return (
                            <button
                              key={a}
                              type="button"
                              style={s.allergenChip(selected)}
                              onClick={() => toggleAllergen(a)}
                            >
                              <span style={{ fontSize: "15px" }}>
                                {selected ? "☑" : "☐"}
                              </span>
                              {ALLERGEN_LABELS[a]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button type="submit" style={s.saveBtn}>
                        {formMode === "edit" ? "Guardar cambios" : "Agregar producto"}
                      </button>
                      <button type="button" style={s.cancelBtn} onClick={closeForm}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div style={{ ...s.card, padding: "48px", textAlign: "center", color: "#aaa" }}>
              Selecciona una categoría en el panel izquierdo.
            </div>
          )}
        </main>
      </div>
    </div>
    </LoginGate>
  );
}
