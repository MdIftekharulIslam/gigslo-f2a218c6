import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Linkedin } from "lucide-react";

export const Route = createFileRoute("/company")({
  component: Company,
  head: () => ({
    meta: [
      { title: "About GigsLo — Hyperlocal help, built in Finland" },
      { name: "description", content: "GigsLo is a Helsinki-born hyperlocal marketplace connecting neighbours through everyday help." },
    ],
  }),
});

function Company() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">About GigsLo</span>
        <h1 className="mt-3 text-5xl font-bold leading-tight">Helping neighbours, the Finnish way.</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          GigsLo started in Helsinki with one idea: the help you need is often just a few streets away. We're building the most trusted hyperlocal marketplace in Europe — starting in Finland, expanding across the EU, with a global vision.
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { k: "10k+", v: "Tasks posted" },
            { k: "4.9★", v: "Average rating" },
            { k: "8 min", v: "First offer time" },
          ].map(s => (
            <div key={s.k} className="rounded-2xl bg-card border border-border p-6 text-center">
              <div className="text-3xl font-bold text-primary">{s.k}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-semibold">Our mission</h2>
        <p className="mt-3 text-muted-foreground">To make everyday help as easy as messaging a neighbour — and to create flexible income for thousands of part-time workers across Europe.</p>

        <h2 className="mt-12 text-2xl font-semibold">Team</h2>
        <div className="mt-5 grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-2xl font-bold text-primary-foreground shrink-0">
              RI
            </div>
            <div className="flex-1">
              <div className="font-semibold text-lg">Ripon Islam</div>
              <div className="text-sm text-muted-foreground">CEO & Founder</div>
              <a
                href="https://www.linkedin.com/in/riponislam71/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ripon Islam on LinkedIn"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-semibold">Get in touch</h2>
        <p className="mt-3 text-muted-foreground">
          Press, partnerships or hello: <a className="text-primary font-medium" href="mailto:contact@gigslo.com">contact@gigslo.com</a><br />
          GigsLo Oy · Helsinki, Finland
        </p>
      </section>
    </Layout>
  );
}
