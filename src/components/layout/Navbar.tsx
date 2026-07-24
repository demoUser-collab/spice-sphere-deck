import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, Menu, Search, ChefHat, X, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { CommandPalette } from "@/components/common/CommandPalette";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const unread = useAppStore((s) => s.notifications.filter((n) => !n.read).length);
  const user = useAppStore((s) => s.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all",
          scrolled ? "glass-strong shadow-soft" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-display text-xl">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-warm text-white shadow-glow">
              <ChefHat className="h-5 w-5" />
            </span>
            <span>Recipe Hub</span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-foreground bg-accent" }}
                inactiveProps={{ className: "text-foreground/70" }}
                className="rounded-full px-3 py-1.5 text-sm font-medium transition hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => setCmdOpen(true)}
              className="hidden h-9 items-center gap-2 rounded-full pl-3 pr-2 text-muted-foreground sm:flex"
              aria-label="Open search command palette"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Search recipes…</span>
              <kbd className="ml-4 rounded border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full sm:hidden" onClick={() => setCmdOpen(true)} aria-label="Search">
              <Search className="h-[18px] w-[18px]" />
            </Button>

            <ThemeSwitcher />

            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
                <Bell className="h-[18px] w-[18px]" />
              </Button>
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground">
                  {unread}
                </span>
              )}
            </Link>

            <Link to="/profile" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Profile">
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <UserIcon className="h-[18px] w-[18px]" />
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className="glass-strong border-t border-border/50 lg:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "bg-accent text-foreground" }}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to="/login" className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-medium">Log in</Link>
                <Link to="/register" className="rounded-2xl bg-brand px-4 py-3 text-center text-sm font-medium text-brand-foreground">Sign up</Link>
              </div>
            </nav>
          </div>
        )}
      </header>
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
}
