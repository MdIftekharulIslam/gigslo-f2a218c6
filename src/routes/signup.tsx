import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({ meta: [{ title: "Sign up — GigsLo" }, { name: "description", content: "Create your free GigsLo account." }] }),
});

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    navigate({ to: "/" });
  }

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-20">
        <h1 className="text-3xl font-bold">Join GigsLo</h1>
        <p className="mt-2 text-muted-foreground">Get help nearby — or start earning today.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inp} />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inp} />
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 8 chars)" className={inp} />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={loading} className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-60">
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">Already a member? <Link to="/login" className="text-primary font-medium">Log in</Link></p>
      </section>
    </Layout>
  );
}
const inp = "w-full h-12 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";
