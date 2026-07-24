import { Link } from "@tanstack/react-router";
import { ChefHat, Instagram, Twitter, Youtube } from "lucide-react";

const groups = [
  {
    title: "Explore",
    links: [
      { to: "/search", label: "All recipes" },
      { to: "/categories", label: "Categories" },
      { to: "/collections", label: "Collections" },
      { to: "/ingredient-search", label: "What Can I Cook?" },
    ],
  },
  {
    title: "You",
    links: [
      { to: "/profile", label: "Profile" },
      { to: "/favorites", label: "Favorites" },
      { to: "/my-recipes", label: "My Recipes" },
      { to: "/upload", label: "Upload Recipe" },
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/help", label: "Help Center" },
      { to: "/contact", label: "Contact" },
      { to: "/about", label: "About" },
      { to: "/terms", label: "Terms" },
      { to: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-xl">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-warm text-white">
              <ChefHat className="h-5 w-5" />
            </span>
            Recipe Hub
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A calm, thoughtful place for real cooking. Discover recipes that actually work.
          </p>
          <div className="mt-6 flex gap-2 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:text-foreground"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {g.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-foreground/80 hover:text-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Recipe Hub. Crafted with care.
      </div>
    </footer>
  );
}
