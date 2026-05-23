import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <img src={logo} alt="GigsLo" className="h-8 w-auto mb-3" width={160} height={40} loading="lazy" />
          <p className="text-sm text-muted-foreground max-w-xs">
            Hyperlocal help, minutes away. Built in Helsinki, growing across the EU.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">For customers</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/post-task" className="hover:text-primary">Post a task</Link></li>
            <li><Link to="/categories" className="hover:text-primary">Browse categories</Link></li>
            <li><Link to="/explore" className="hover:text-primary">Explore tasks</Link></li>
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
            <li><a href="mailto:hello@gigslo.com" className="hover:text-primary">Contact</a></li>
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
