import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({ meta: [{ title: "Sign up — GigsLo" }, { name: "description", content: "Create your free GigsLo account." }] }),
});

function Signup() {
  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-20">
        <h1 className="text-3xl font-bold">Join GigsLo</h1>
        <p className="mt-2 text-muted-foreground">Get help nearby — or start earning today.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-4">
          <input required placeholder="Full name" className={inp} />
          <input type="email" required placeholder="Email" className={inp} />
          <input type="password" required placeholder="Password (min 8 chars)" className={inp} />
          <button className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">Create account</button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">Already a member? <Link to="/login" className="text-primary font-medium">Log in</Link></p>
      </section>
    </Layout>
  );
}
const inp = "w-full h-12 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";
