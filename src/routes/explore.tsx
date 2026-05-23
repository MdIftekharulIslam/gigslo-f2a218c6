import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { sampleTasks } from "@/lib/sample-tasks";
import { categories } from "@/lib/categories";
import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/explore")({
  component: Explore,
  head: () => ({
    meta: [
      { title: "Explore tasks near you — GigsLo" },
      { name: "description", content: "Browse live tasks posted by neighbours across Finland." },
    ],
  }),
});

function Explore() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  const filtered = useMemo(() => sampleTasks.filter(t =>
    (!q || t.title.toLowerCase().includes(q.toLowerCase()) || t.area.toLowerCase().includes(q.toLowerCase())) &&
    (!cat || t.category === cat)
  ), [q, cat]);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold">Explore tasks</h1>
        <p className="mt-3 text-muted-foreground">Live requests from your neighbours. Find one that fits your skills.</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tasks or city…" className="w-full h-11 pl-10 pr-3 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={cat} onChange={e => setCat(e.target.value)} className="h-11 px-4 rounded-full border border-border bg-card text-sm">
            <option value="">All categories</option>
            {categories.map(c => <option key={c.slug}>{c.name}</option>)}
          </select>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(t => (
            <article key={t.id} className="rounded-2xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-card transition-all">
              <div className="text-xs text-accent font-semibold uppercase tracking-wider">{t.category}</div>
              <h3 className="mt-2 font-semibold leading-snug text-lg">{t.title}</h3>
              <div className="mt-3 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4" /> {t.area}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t.when}</div>
              <div className="mt-5 flex justify-between items-center">
                <div className="text-xl font-bold text-primary">€{t.budget}</div>
                <button className="text-sm font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">Make an offer</button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{t.bids} offers so far</div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              No tasks match. <Link to="/post-task" className="text-primary font-medium">Post one yourself →</Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
