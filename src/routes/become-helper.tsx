import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Wallet, Clock, MapPin, ShieldCheck } from "lucide-react";
import portrait from "@/assets/helper-portrait.jpg";

export const Route = createFileRoute("/become-helper")({
  component: BecomeHelper,
  head: () => ({
    meta: [
      { title: "Want to help? Earn part-time with GigsLo" },
      { name: "description", content: "Become a GigsLo helper. Choose tasks near you, set your rates, get paid fast." },
    ],
  }),
});

function BecomeHelper() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Earn nearby</span>
          <h1 className="mt-3 text-5xl font-bold leading-tight">Turn your free time into real income.</h1>
          <p className="mt-4 text-lg text-muted-foreground">Pick the tasks you love, in the neighbourhoods you know. GigsLo helpers across Finland earn extra income on their own schedule.</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { i: MapPin, t: "Stay close to home", d: "Only see tasks within walking or cycling distance." },
              { i: Wallet, t: "Set your rates", d: "Make offers that work for you. No hidden cuts." },
              { i: Clock, t: "Flexible hours", d: "Pick up work between classes, work, or family time." },
              { i: ShieldCheck, t: "Protected by GigsLo", d: "Tasks are insured and customers are verified." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-xl border border-border bg-card p-5">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-2 font-semibold">{t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <Link to="/signup" className="mt-8 inline-flex h-12 items-center px-7 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 shadow-soft">
            Sign up as a helper
          </Link>
        </div>
        <img src={portrait} alt="A happy GigsLo helper" loading="lazy" width={1024} height={1280} className="rounded-3xl w-full h-[560px] object-cover shadow-card" />
      </section>
    </Layout>
  );
}
