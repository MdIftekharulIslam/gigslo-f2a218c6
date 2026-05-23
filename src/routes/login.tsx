import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Log in — GigsLo" }, { name: "description", content: "Log in to your GigsLo account." }] }),
});

function Login() {
  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-20">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">Log in to manage your tasks and offers.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-4">
          <input type="email" required placeholder="Email" className={inp} />
          <input type="password" required placeholder="Password" className={inp} />
          <button className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">Log in</button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">New to GigsLo? <Link to="/signup" className="text-primary font-medium">Create an account</Link></p>
      </section>
    </Layout>
  );
}
const inp = "w-full h-12 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";
