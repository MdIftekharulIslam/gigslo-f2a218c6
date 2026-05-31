import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Mail, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact GigsLo — We'd love to hear from you" },
      { name: "description", content: "Get in touch with the GigsLo team. Send us a message or email contact@gigslo.com." },
    ],
  }),
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Open the user's default mail composer with prefilled content addressed to contact@gigslo.com
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:contact@gigslo.com?subject=${encodeURIComponent(subject || "GigsLo enquiry")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12">
        <div>
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Contact</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold leading-tight">Get in touch.</h1>
          <p className="mt-4 text-muted-foreground">
            Questions, partnerships, press or feedback — we read every message.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Email</div>
                <a className="text-primary hover:underline" href="mailto:contact@gigslo.com">contact@gigslo.com</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Office</div>
                <div className="text-muted-foreground">GigsLo Oy · Helsinki, Finland</div>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          {sent && (
            <div className="rounded-lg bg-primary/10 border border-primary/30 text-sm p-3 text-primary">
              Thanks! Your message is ready to send from your email app. If nothing opened, email us directly at{" "}
              <a className="underline font-medium" href="mailto:contact@gigslo.com">contact@gigslo.com</a>.
            </div>
          )}
          <label className="block text-sm">
            <span className="font-medium">Your name</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} maxLength={100}
              className="mt-1 w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255}
              className="mt-1 w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Subject</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={150}
              placeholder="What's this about?"
              className="mt-1 w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Message</span>
            <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <button type="submit" className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 inline-flex items-center justify-center gap-2">
            <Send className="h-4 w-4" /> Send message
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Or email us directly at <a className="text-primary font-medium" href="mailto:contact@gigslo.com">contact@gigslo.com</a>.
          </p>
        </form>
      </section>
    </Layout>
  );
}
