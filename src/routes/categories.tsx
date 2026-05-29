import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { categories } from "@/lib/categories";

export const Route = createFileRoute("/categories")({
  component: Categories,
  head: () => ({
    meta: [
      { title: "Browse categories — GigsLo" },
      { name: "description", content: "From cleaning to deliveries, browse every category of help available on GigsLo." },
    ],
  }),
});

function Categories() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold">All categories</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">From a one-off bookshelf assembly to weekly cleaning, find the right help for any task — all from people in your neighbourhood.</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(c => (
            <Link
              key={c.slug}
              to="/explore"
              search={{ category: c.name }}
              className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={c.image} alt={c.name} loading="lazy" width={768} height={768} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="font-semibold text-lg">{c.name}</div>
                <p className="text-sm text-muted-foreground mt-1">{c.blurb}</p>
                <div className="mt-3 text-sm font-semibold text-primary">From €{c.fromPrice}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
