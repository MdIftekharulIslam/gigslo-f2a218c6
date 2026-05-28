import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import { categories } from "@/lib/categories";
import { MapPin, Loader2 } from "lucide-react";

export const Route = createFileRoute("/post-task")({
  component: PostTask,
  head: () => ({
    meta: [
      { title: "Post a task — GigsLo" },
      { name: "description", content: "Tell us what you need help with. It's free to post and offers arrive in minutes." },
    ],
  }),
});

function PostTask() {
  const [sent, setSent] = useState(false);
  const [where, setWhere] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [locErr, setLocErr] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  function useMyLocation() {
    setLocErr(null);
    if (!("geolocation" in navigator)) {
      setLocErr("Geolocation isn't supported by your browser.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const addr = data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          setWhere(addr);
        } catch {
          setWhere(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        } finally {
          setLocLoading(false);
        }
      },
      (e) => {
        setLocErr(e.message || "Could not get your location.");
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">Step 1 of 3</span>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold">Post your task</h1>
        <p className="mt-3 text-muted-foreground">It's free to post. You only pay when you accept an offer.</p>

        {sent ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-semibold">Task posted!</h2>
            <p className="mt-2 text-muted-foreground">In a real GigsLo account, you'd start getting offers within minutes. This MVP demo just confirms your submission.</p>
            <Link to="/explore" className="mt-6 inline-flex h-11 items-center px-5 rounded-full bg-primary text-primary-foreground font-semibold">
              See nearby tasks
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5"
          >
            <Field label="Task title">
              <input required placeholder="e.g. Assemble IKEA Pax wardrobe" className={inputCls} />
            </Field>
            <Field label="Category">
              <select required className={inputCls}>
                <option value="">Choose a category…</option>
                {categories.map(c => <option key={c.slug}>{c.name}</option>)}
              </select>
            </Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Where?">
                <div className="flex gap-2">
                  <input
                    required
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                    placeholder="Postcode, address or area"
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={useMyLocation}
                    disabled={locLoading}
                    title="Use my live location"
                    className="shrink-0 h-11 px-3 rounded-lg border border-input bg-background hover:bg-secondary inline-flex items-center gap-1 text-sm font-medium disabled:opacity-60"
                  >
                    {locLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4 text-primary" />}
                    <span className="hidden sm:inline">Use my location</span>
                  </button>
                </div>
                {locErr && <p className="mt-1 text-xs text-destructive">{locErr}</p>}
                {coords && !locErr && (
                  <p className="mt-1 text-xs text-muted-foreground">📍 Pinned at {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
                )}
              </Field>
              <Field label="When?"><input type="date" required className={inputCls} /></Field>
            </div>
            <Field label="Details">
              <textarea rows={5} required placeholder="Describe what needs doing…" className={inputCls + " min-h-32"} />
            </Field>
            <Field label="Your budget (€)">
              <input type="number" min={5} required placeholder="60" className={inputCls} />
            </Field>
            <button type="submit" className="w-full sm:w-auto h-12 px-7 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-soft">
              Post task — get offers
            </button>
          </form>
        )}
      </section>
    </Layout>
  );
}

const inputCls = "w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
