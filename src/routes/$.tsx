import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Not found — Recipe Hub" },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Not found — Recipe Hub" },
      { property: "og:description", content: "This page slipped out of the kitchen." },
    ],
  }),
  component: NotFound,
});

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-widest text-brand">404</p>
        <h1 className="mt-3 font-display text-5xl">This page slipped out of the kitchen.</h1>
        <p className="mt-4 text-sm text-muted-foreground">The recipe you're looking for isn't here.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground">Go home</Link>
          <Link to="/search" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">Discover recipes</Link>
        </div>
      </div>
    </div>
  );
}
