import { useEffect, useState } from "react";
import type { Task } from "@/lib/sample-tasks";

type Props = {
  tasks: Task[];
  user?: { lat: number; lng: number } | null;
  radiusKm?: number;
  onSelect?: (t: Task) => void;
};

/**
 * Leaflet-based interactive map using OpenStreetMap tiles (no API key needed).
 * Client-only — Leaflet touches `window`, so we lazy-import it after mount.
 */
export function TaskMap({ tasks, user, radiusKm = 20, onSelect }: Props) {
  const [mod, setMod] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([rl, L]) => {
      if (cancelled) return;
      // Fix default marker icons (Vite doesn't resolve the asset paths automatically)
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      // Inject CSS once
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      setMod({ rl, L });
    });
    return () => { cancelled = true; };
  }, []);

  if (!mod) {
    return (
      <div className="h-[360px] rounded-2xl bg-secondary/40 border border-border grid place-items-center text-sm text-muted-foreground">
        Loading map…
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Circle } = mod.rl;
  const L = mod.L;
  const center: [number, number] = user
    ? [user.lat, user.lng]
    : tasks.length
      ? [tasks[0].lat, tasks[0].lng]
      : [60.1699, 24.9384]; // Helsinki default

  const userIcon = L.divIcon({
    html: `<div style="background:#2563eb;width:18px;height:18px;border-radius:9999px;border:3px solid white;box-shadow:0 0 0 2px #2563eb"></div>`,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  return (
    <div className="h-[360px] rounded-2xl overflow-hidden border border-border">
      <MapContainer center={center} zoom={user ? 11 : 6} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {user && (
          <>
            <Marker position={[user.lat, user.lng]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
            <Circle center={[user.lat, user.lng]} radius={radiusKm * 1000} pathOptions={{ color: "#2563eb", fillOpacity: 0.08 }} />
          </>
        )}
        {tasks.map((t) => (
          <Marker key={t.id} position={[t.lat, t.lng]}>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{t.area} · {t.when}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#2563eb", marginTop: 4 }}>€{t.budget}</div>
                {onSelect && (
                  <button
                    onClick={() => onSelect(t)}
                    style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: "#2563eb", cursor: "pointer", background: "none", border: "none", padding: 0 }}
                  >
                    Make an offer →
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
