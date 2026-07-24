import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { useThemeSync } from "@/hooks/use-theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-widest text-brand">404</p>
        <h1 className="mt-3 font-display text-5xl">This page slipped out of the kitchen.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The recipe you're looking for isn't here. Try heading home or discovering something new.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground">Go home</Link>
          <Link to="/search" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">Discover recipes</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something didn't cook right.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Recipe Hub — Cook something worth remembering" },
      { name: "description", content: "Discover recipes that actually work. Beautiful, fast, and made for weeknights." },
      { name: "author", content: "Recipe Hub" },
      { property: "og:title", content: "Recipe Hub — Cook something worth remembering" },
      { property: "og:description", content: "Discover recipes that actually work. Beautiful, fast, and made for weeknights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Recipe Hub — Cook something worth remembering" },
      { name: "twitter:description", content: "Discover recipes that actually work. Beautiful, fast, and made for weeknights." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3dea0f6b-744f-460f-b0a4-0d1f13913f88/id-preview-05a3fcea--c822468a-42b1-49b1-af9c-46424c471799.lovable.app-1784865837271.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3dea0f6b-744f-460f-b0a4-0d1f13913f88/id-preview-05a3fcea--c822468a-42b1-49b1-af9c-46424c471799.lovable.app-1784865837271.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useThemeSync();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
