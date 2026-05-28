import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — GigsLo" },
      { name: "description", content: "Answers to common questions about using GigsLo." },
    ],
  }),
});

function FAQPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold">Frequently asked questions</h1>
        <p className="mt-3 text-muted-foreground">Quick answers to the most common questions.</p>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold flex justify-between items-center">
                {f.q}
                <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const faqs = [
  { q: "How does GigsLo work?", a: "Post the task you need help with — including where and when. Nearby helpers send you offers. You compare profiles and reviews, accept the one you like, and pay securely through GigsLo once the task is done." },
  { q: "Is it free to post a task?", a: "Yes. Posting is always free. You only pay when you accept an offer." },
  { q: "How are helpers vetted?", a: "Every helper goes through ID verification and is rated by the community after each task. You can see their reviews and history before accepting." },
  { q: "How do payments work?", a: "Payments are made through GigsLo using a card or other supported method. We hold the payment until you confirm the task is completed." },
  { q: "What if I'm not happy with the work?", a: "Contact the helper first to resolve it. If that doesn't work, our support team and the GigsLo Guarantee will help — eligible bookings are protected." },
  { q: "Where is GigsLo available?", a: "We're live across Finland and rolling out to more EU countries soon. Helpers are matched to you based on distance from your task." },
  { q: "Can I cancel a task?", a: "Yes, you can cancel a task before it has started, free of charge. Once a helper is on the way or has begun work, a small cancellation fee may apply." },
];
