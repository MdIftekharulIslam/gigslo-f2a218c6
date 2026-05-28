import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Log in — GigsLo" }, { name: "description", content: "Log in to your GigsLo account." }] }),
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    navigate({ to: "/" });
  }

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-20">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">Log in to manage your tasks and offers.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inp} />
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={inp} />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={loading} className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-60">
            {loading ? "Signing in…" : "Log in"}
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">New to GigsLo? <Link to="/signup" className="text-primary font-medium">Create an account</Link></p>
      </section>
    </Layout>
  );
}
const inp = "w-full h-12 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";
