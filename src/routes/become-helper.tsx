import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Wallet, Clock, MapPin, ShieldCheck } from "lucide-react";
import portrait from "@/assets/helper-portrait.jpg";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role: "helper" },
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    setOk(true);
    setTimeout(() => navigate({ to: "/explore" }), 1200);
  }

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
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card">
          <img src={portrait} alt="A happy GigsLo helper" loading="lazy" width={1024} height={1280} className="rounded-2xl w-full h-48 object-cover mb-6" />
          <h2 className="text-2xl font-bold">Create your helper account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign up in seconds — it's free.</p>
          {ok ? (
            <div className="mt-6 rounded-lg bg-primary/10 text-primary p-4 text-sm font-medium">
              Account created! Redirecting to nearby tasks…
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inp} />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inp} />
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 8 chars)" className={inp} />
              {err && <p className="text-sm text-destructive">{err}</p>}
              <button disabled={loading} className="w-full h-12 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 shadow-soft disabled:opacity-60">
                {loading ? "Creating account…" : "Sign up as a helper"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
const inp = "w-full h-12 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";
