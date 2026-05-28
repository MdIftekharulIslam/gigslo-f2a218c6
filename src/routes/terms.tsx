import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — GigsLo" },
      { name: "description", content: "The terms governing your use of GigsLo." },
    ],
  }),
});

function Terms() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-foreground/90">
          <p>These Terms & Conditions ("Terms") govern your access to and use of the GigsLo platform operated by GigsLo Oy ("GigsLo"). By creating an account or using GigsLo, you agree to these Terms.</p>

          <Section title="1. Eligibility">
            You must be at least 18 years old and able to enter into a binding contract to use GigsLo.
          </Section>

          <Section title="2. Your account">
            You are responsible for keeping your login details confidential and for all activity that occurs under your account. Provide accurate information when signing up and keep it up to date.
          </Section>

          <Section title="3. The platform">
            GigsLo is a marketplace that connects customers with independent helpers for household tasks. GigsLo is not an employer of helpers and does not perform the tasks itself. Helpers are independent contractors.
          </Section>

          <Section title="4. Tasks and offers">
            Customers post tasks and helpers may make offers. When a customer accepts an offer, a direct agreement is formed between the customer and the helper. Both parties agree to act lawfully, honestly and with reasonable care.
          </Section>

          <Section title="5. Payments and fees">
            Payments are processed through GigsLo's payment provider. GigsLo may charge service fees, which are displayed before a task is accepted. All fees are non-refundable unless required by law.
          </Section>

          <Section title="6. User conduct">
            You agree not to use GigsLo for any unlawful purpose, harass other users, post misleading content, or attempt to bypass the platform to avoid fees.
          </Section>

          <Section title="7. Reviews">
            Reviews must be honest and reflect genuine experiences. We may remove reviews that violate these Terms or applicable laws.
          </Section>

          <Section title="8. Suspension and termination">
            We may suspend or terminate accounts that violate these Terms or harm the GigsLo community. You may close your account at any time.
          </Section>

          <Section title="9. Disclaimer">
            GigsLo is provided "as is". To the maximum extent permitted by law, we disclaim all warranties and are not liable for the conduct, quality or safety of tasks performed by users.
          </Section>

          <Section title="10. Limitation of liability">
            To the extent permitted by law, GigsLo's total liability for any claim relating to the service is limited to the fees you paid us in the 12 months preceding the claim.
          </Section>

          <Section title="11. Changes">
            We may update these Terms from time to time. Continued use of GigsLo after changes take effect constitutes acceptance of the updated Terms.
          </Section>

          <Section title="12. Governing law">
            These Terms are governed by the laws of Finland, without regard to conflict-of-law principles. Disputes will be resolved by the courts of Helsinki, unless mandatory consumer law provides otherwise.
          </Section>

          <Section title="13. Contact">
            Questions? Email us at <a href="mailto:contact@gigslo.com" className="text-primary font-medium">contact@gigslo.com</a>.
          </Section>
        </div>
      </section>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </div>
  );
}
