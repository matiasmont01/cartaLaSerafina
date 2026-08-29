import { NextRequest } from "next/server";
import { getStore } from "@netlify/blobs";

const BLOB_KEY = "menu-data";
const API_SECRET = process.env.MENU_API_SECRET ?? "la_serafina_secret_2026";

export const dynamic = "force-dynamic";

// ── GET: devuelve el menú actual ─────────────────────────────────────────────
export async function GET() {
  try {
    const store = getStore("menu");
    const data = await store.get(BLOB_KEY, { type: "json" });
    if (data) {
      return Response.json(data);
    }
    // Si no hay datos guardados, devuelve null → el cliente usará los datos iniciales
    return Response.json(null);
  } catch (err) {
    console.error("[menu GET] error:", err);
    return Response.json(null, { status: 200 });
  }
}

// ── POST: guarda el menú (sólo con el secret correcto) ──────────────────────
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-secret");
    if (authHeader !== API_SECRET) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!Array.isArray(body)) {
      return Response.json({ error: "Invalid data" }, { status: 400 });
    }

    const store = getStore("menu");
    await store.setJSON(BLOB_KEY, body);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[menu POST] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
