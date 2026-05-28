import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { sampleTasks, distanceKm, type Task } from "@/lib/sample-tasks";
import { categories } from "@/lib/categories";
import { MapPin, Search, Loader2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/explore")({
  component: Explore,
  head: () => ({
    meta: [
      { title: "Explore tasks near you — GigsLo" },
      { name: "description", content: "Browse live tasks posted by neighbours across Finland, filtered by your live location." },
    ],
  }),
});

function Explore() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [radius, setRadius] = useState(20);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locLoading, setLocLoading] = useState(false);
  const [locErr, setLocErr] = useState<string | null>(null);
  const [offerFor, setOfferFor] = useState<Task | null>(null);

  function requestLocation() {
    setLocErr(null);
    if (!("geolocation" in navigator)) {
      setLocErr("Geolocation not supported.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocLoading(false);
      },
      (e) => {
        setLocErr(e.message || "Couldn't access your location.");
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // Auto-prompt for location on first load
  useEffect(() => {
    requestLocation();
  }, []);

  const enriched = useMemo(() => {
    return sampleTasks.map(t => ({
      task: t,
      distance: coords ? distanceKm(coords, { lat: t.lat, lng: t.lng }) : null,
    }));
  }, [coords]);

  const filtered = useMemo(() => {
    return enriched
      .filter(({ task, distance }) => {
        if (q && !task.title.toLowerCase().includes(q.toLowerCase()) && !task.area.toLowerCase().includes(q.toLowerCase())) return false;
        if (cat && task.category !== cat) return false;
        if (coords && distance !== null && distance > radius) return false;
        return true;
      })
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  }, [enriched, q, cat, radius, coords]);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold">Explore tasks</h1>
        <p className="mt-3 text-muted-foreground">Live requests from your neighbours, sorted by distance.</p>

        {/* Location banner */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-wrap items-center gap-3">
          <MapPin className="h-5 w-5 text-primary" />
          {coords ? (
            <span className="text-sm">
              Showing tasks within <strong>{radius} km</strong> of your live location ({coords.lat.toFixed(3)}, {coords.lng.toFixed(3)}).
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">
              {locErr ? `Location unavailable: ${locErr}` : "Share your location to see only nearby tasks."}
            </span>
          )}
          <button
            onClick={requestLocation}
            disabled={locLoading}
            className="ml-auto text-sm font-medium px-3 py-1.5 rounded-full border border-border hover:bg-secondary inline-flex items-center gap-1 disabled:opacity-60"
          >
            {locLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MapPin className="h-3.5 w-3.5" />}
            {coords ? "Refresh" : "Use my location"}
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tasks or city…" className="w-full h-11 pl-10 pr-3 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={cat} onChange={e => setCat(e.target.value)} className="h-11 px-4 rounded-full border border-border bg-card text-sm">
            <option value="">All categories</option>
            {categories.map(c => <option key={c.slug}>{c.name}</option>)}
          </select>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            disabled={!coords}
            className="h-11 px-4 rounded-full border border-border bg-card text-sm disabled:opacity-60"
          >
            <option value={10}>Within 10 km</option>
            <option value={15}>Within 15 km</option>
            <option value={20}>Within 20 km</option>
          </select>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(({ task: t, distance }) => (
            <article key={t.id} className="rounded-2xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-card transition-all">
              <div className="text-xs text-accent font-semibold uppercase tracking-wider">{t.category}</div>
              <h3 className="mt-2 font-semibold leading-snug text-lg">{t.title}</h3>
              <div className="mt-3 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4" /> {t.area}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t.when}</div>
              {distance !== null && (
                <div className="mt-1 text-xs font-medium text-primary">📍 {distance.toFixed(1)} km away</div>
              )}
              <div className="mt-5 flex justify-between items-center">
                <div className="text-xl font-bold text-primary">€{t.budget}</div>
                <button
                  onClick={() => setOfferFor(t)}
                  className="text-sm font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Make an offer
                </button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{t.bids} offers so far</div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              No tasks within {radius} km. Try a wider radius or <Link to="/post-task" className="text-primary font-medium">post one yourself →</Link>
            </div>
          )}
        </div>
      </section>

      {offerFor && <OfferModal task={offerFor} onClose={() => setOfferFor(null)} />}
    </Layout>
  );
}

function OfferModal({ task, onClose }: { task: Task; onClose: () => void }) {
  const [amount, setAmount] = useState(task.budget);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-card border border-border shadow-card p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-md hover:bg-secondary" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        {sent ? (
          <div className="py-6 text-center">
            <h3 className="text-xl font-bold">Offer sent! 🎉</h3>
            <p className="mt-2 text-sm text-muted-foreground">The customer will be notified and respond shortly.</p>
            <button onClick={onClose} className="mt-5 h-10 px-5 rounded-full bg-primary text-primary-foreground font-semibold">Done</button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold pr-6">Make an offer</h3>
            <p className="mt-1 text-sm text-muted-foreground">{task.title} · {task.area}</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-5 space-y-3"
            >
              <label className="block text-sm">
                <span className="font-medium">Your price (€)</span>
                <input
                  type="number" min={1} required value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-1 w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium">Message to the customer</span>
                <textarea
                  required rows={4} value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi! I can help with this — I live close by and have done similar tasks…"
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <button type="submit" className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                Send offer
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
