import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth, signOut } from "@/lib/auth";

const leftLinks = [
  { to: "/post-task", label: "Post your needs" },
  { to: "/categories", label: "Categories" },
  { to: "/explore", label: "Explore tasks" },
] as const;

const rightLinks = [
  { to: "/become-helper", label: "Want to help" },
  { to: "/company", label: "Company" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0 transition-transform hover:scale-105">
          <img src={logo} alt="GigsLo" className="h-12 sm:h-14 w-auto drop-shadow-md" width={240} height={60} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {leftLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden lg:flex items-center gap-1">
          {rightLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <span className="ml-2 px-3 py-2 text-sm font-medium text-foreground/80">Hi, {displayName}</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft inline-flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ml-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft transition-all"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="ml-auto lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col">
            {[...leftLinks, ...rightLinks].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground/85"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3">
              {user ? (
                <button
                  onClick={() => { setOpen(false); handleSignOut(); }}
                  className="flex-1 text-center px-4 py-2 text-sm rounded-full bg-primary text-primary-foreground"
                >
                  Sign out ({displayName})
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center px-4 py-2 text-sm rounded-full border border-border"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center px-4 py-2 text-sm rounded-full bg-primary text-primary-foreground"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
