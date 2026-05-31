import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { categories } from "@/lib/categories";
import { sampleTasks } from "@/lib/sample-tasks";
import { Search, MapPin, ShieldCheck, Clock, Star, Wallet, Sparkles, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import helperPortrait from "@/assets/helper-portrait.jpg";
import { faqs } from "./faq";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "GigsLo — Hyperlocal help in minutes" },
      { name: "description", content: "Post a task or earn part-time helping neighbours nearby. Built in Finland, scaling across the EU." },
    ],
  }),
});

function Index() {
  const navigate = useNavigate();
  const [heroQ, setHeroQ] = useState("");
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 via-background to-background" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 text-accent-foreground px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Now serving Helsinki, Espoo, Tampere & Turku
            </span>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              Get help in <span className="text-primary">minutes</span>.<br />
              From neighbours you can trust.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              GigsLo connects local communities to get household tasks done fast. Post what you need, choose from trusted nearby offers, and only pay when the job is complete. Looking for extra income? Find flexible, part-time gigs right in your neighborhood.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/explore", search: { q: heroQ.trim(), category: "" } });
              }}
              className="mt-7 flex flex-col sm:flex-row gap-2 max-w-xl"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={heroQ}
                  onChange={(e) => setHeroQ(e.target.value)}
                  placeholder="What do you need help with?"
                  className="w-full h-12 pl-10 pr-3 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Link
                to="/post-task"
                className="h-12 inline-flex items-center justify-center px-6 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-soft"
              >
                Post a task — free
              </Link>
            </form>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> ID-verified helpers</span>
              <span className="inline-flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> Pay only on completion</span>
              <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> 4.9 average rating</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-accent/20 rounded-[2rem] -rotate-2" aria-hidden />
            <img
              src={hero}
              alt="A friendly GigsLo helper handing groceries to a neighbour"
              width={1536}
              height={1152}
              className="relative rounded-[1.75rem] object-cover w-full h-[480px] shadow-card"
            />
            <div className="absolute -bottom-6 -left-4 bg-card rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/15 grid place-items-center"><Clock className="h-5 w-5 text-primary" /></div>
              <div className="text-sm">
                <div className="font-semibold">Avg. first offer</div>
                <div className="text-muted-foreground">in under 8 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Popular tasks</h2>
            <p className="text-muted-foreground mt-1">Pick a category to get started — or post your own.</p>
          </div>
          <Link to="/categories" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.slug}
              to="/categories"
              className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[5/4] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">From €{c.fromPrice}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-3 gap-8">
          {[
            { n: "01", t: "Post your task", d: "Tell us what, where and when. It's free and takes a minute." },
            { n: "02", t: "Choose your helper", d: "Compare offers, profiles and reviews from people nearby." },
            { n: "03", t: "Get it done", d: "Pay securely through GigsLo — only once you're happy." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl bg-card p-6 border border-border">
              <div className="text-sm font-mono text-primary">{s.n}</div>
              <div className="mt-2 text-xl font-semibold">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EARN SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 lg:order-1">
          <img
            src={helperPortrait}
            alt="A GigsLo helper smiling after completing a task"
            width={1024}
            height={1280}
            loading="lazy"
            className="rounded-3xl w-full h-[520px] object-cover shadow-card"
          />
          <div className="absolute bottom-6 right-6 bg-card rounded-2xl shadow-card px-4 py-3">
            <div className="text-2xl font-bold text-primary">€420</div>
            <div className="text-xs text-muted-foreground">avg. weekly earnings*</div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Earn nearby</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold leading-tight">Work part-time, walk-time from home.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Students, parents, professionals — anyone with skills and time can become a GigsLo helper. Choose the tasks you love, set your own rates and build a 5-star reputation in your neighbourhood.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="h-5 w-5 text-primary shrink-0" /> Only show jobs within walking or cycling distance.</li>
            <li className="flex gap-3"><Wallet className="h-5 w-5 text-primary shrink-0" /> Get paid within 24h of finishing a task.</li>
            <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-primary shrink-0" /> Insured tasks and verified customers.</li>
          </ul>
          <Link
            to="/become-helper"
            className="mt-8 inline-flex items-center gap-2 px-6 h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 shadow-soft"
          >
            Become a helper <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 grid md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, t: "Verified & trusted", d: "Every helper is ID-checked and reviewed by the community." },
            { icon: MapPin, t: "Hyperlocal by design", d: "Match with neighbours within a few kilometres — not strangers across the country." },
            { icon: Star, t: "Quality, guaranteed", d: "Not satisfied? Our GigsLo Guarantee protects every booking." },
          ].map((b, i) => (
            <div key={i}>
              <b.icon className="h-7 w-7 mb-3 opacity-90" />
              <div className="text-xl font-semibold">{b.t}</div>
              <p className="mt-2 text-sm opacity-80">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE TASKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Tasks near you, right now</h2>
            <p className="text-muted-foreground mt-1">A peek at what neighbours are asking for today.</p>
          </div>
          <Link to="/explore" className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
            Explore all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleTasks.slice(0, 4).map((t) => (
            <Link
              key={t.id}
              to="/explore"
              className="rounded-2xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-card transition-all"
            >
              <div className="text-xs text-accent font-semibold uppercase tracking-wider">{t.category}</div>
              <div className="mt-2 font-semibold leading-snug">{t.title}</div>
              <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {t.area}</div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-lg font-bold text-primary">€{t.budget}</div>
                <div className="text-xs text-muted-foreground">{t.bids} offers</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">Common questions</h2>
          <p className="text-muted-foreground mt-2">Everything you need to know to get started.</p>
        </div>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.slice(0, 5).map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold flex justify-between items-center">
                {f.q}
                <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/faq" className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
            See all FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl border border-border bg-card p-10 md:p-14 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold">Your to-do list, done.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join the GigsLo community — thousands of helpful neighbours across Finland, with the EU coming next.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/post-task" className="h-12 inline-flex items-center px-7 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-soft">
              Post a task
            </Link>
            <Link to="/become-helper" className="h-12 inline-flex items-center px-7 rounded-full border border-border bg-background font-semibold hover:bg-secondary">
              Earn as a helper
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
