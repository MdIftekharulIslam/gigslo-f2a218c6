import { Link } from "@tanstack/react-router";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

// X (Twitter) icon — lucide doesn't ship one, so inline a minimal SVG.
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.844l-4.78-6.24L4.8 22H2l7.02-8.02L2 2h6.91l4.32 5.71L18.244 2Zm-1.2 18h1.69L7.05 4H5.27l11.774 16Z" />
    </svg>
  );
}

// LinkedIn is live; FB/IG/X are placeholders until the founder creates those pages.
const socials = [
  { href: "https://www.linkedin.com/company/gigslo", label: "LinkedIn", Icon: Linkedin, active: true },
  { href: "#", label: "Facebook", Icon: Facebook, active: false },
  { href: "#", label: "Instagram", Icon: Instagram, active: false },
  { href: "#", label: "X", Icon: XIcon, active: false },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <img src={logo} alt="GigsLo" className="h-8 w-auto mb-3" width={160} height={40} loading="lazy" />
          <p className="text-sm text-muted-foreground max-w-xs">
            Hyperlocal help, minutes away. Built in Helsinki, growing across the EU.
          </p>
          <h4 className="mt-6 text-sm font-semibold">Follow us on</h4>
          <div className="mt-3 flex gap-2">
            {socials.map(({ href, label, Icon, active }) =>
              active ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-9 w-9 grid place-items-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ) : (
                <span
                  key={label}
                  aria-label={`${label} (coming soon)`}
                  title="Coming soon"
                  className="h-9 w-9 grid place-items-center rounded-full border border-border bg-card text-muted-foreground/60 cursor-default"
                >
                  <Icon className="h-4 w-4" />
                </span>
              )
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">For customers</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/post-task" className="hover:text-primary">Post a task</Link></li>
            <li><Link to="/categories" className="hover:text-primary">Browse categories</Link></li>
            <li><Link to="/explore" className="hover:text-primary">Explore tasks</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">For helpers</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/become-helper" className="hover:text-primary">Become a helper</Link></li>
            <li><Link to="/explore" className="hover:text-primary">Find work nearby</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/company" className="hover:text-primary">About GigsLo</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms & conditions</Link></li>
            <li><a href="mailto:contact@gigslo.com" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} GigsLo Oy — Helsinki, Finland</span>
          <span>Made with care in the Nordics</span>
        </div>
      </div>
    </footer>
  );
}
