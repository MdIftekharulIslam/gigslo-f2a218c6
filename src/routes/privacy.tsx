import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — GigsLo" },
      { name: "description", content: "How GigsLo collects, uses and protects your personal data." },
    ],
  }),
});

function Privacy() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 prose-content">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-foreground/90">
          <p>This Privacy Policy explains how GigsLo Oy ("GigsLo", "we", "us") collects, uses and protects your personal information when you use our website and services.</p>

          <Section title="1. Information we collect">
            We collect information you provide directly — such as your name, email address, phone number, location and task details — and information collected automatically, including device information, IP address, browser type and approximate location based on your IP.
          </Section>

          <Section title="2. How we use your information">
            We use your information to operate the GigsLo platform, match you with helpers or customers nearby, process payments, communicate with you, prevent fraud and improve our services.
          </Section>

          <Section title="3. Sharing of information">
            We share information with other users only to the extent necessary to complete a task (for example, your first name and approximate location). We may share data with trusted service providers (payment, hosting, analytics) under appropriate confidentiality and security obligations. We do not sell personal data.
          </Section>

          <Section title="4. Location data">
            With your permission, we use your device's location to show tasks and helpers near you. You can disable location sharing in your browser or device settings at any time.
          </Section>

          <Section title="5. Cookies">
            We use cookies and similar technologies to keep you signed in, remember preferences, and measure usage. You can control cookies through your browser settings.
          </Section>

          <Section title="6. Data retention">
            We retain personal data for as long as your account is active or as needed to provide services and comply with legal obligations. You may request deletion of your account at any time.
          </Section>

          <Section title="7. Your rights">
            Subject to applicable law (including the EU GDPR), you have the right to access, correct, delete, restrict or object to processing of your personal data, and to data portability. To exercise these rights, contact us at contact@gigslo.com.
          </Section>

          <Section title="8. Security">
            We apply reasonable technical and organisational measures to protect your data. No method of transmission over the internet is 100% secure.
          </Section>

          <Section title="9. Children">
            GigsLo is not intended for children under 16. We do not knowingly collect personal data from children.
          </Section>

          <Section title="10. Changes to this policy">
            We may update this Privacy Policy from time to time. Material changes will be notified through the service or by email.
          </Section>

          <Section title="11. Contact">
            Questions about this policy? Email us at <a href="mailto:contact@gigslo.com" className="text-primary font-medium">contact@gigslo.com</a>.
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
