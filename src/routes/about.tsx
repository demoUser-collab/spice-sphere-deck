import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ChefHat, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Recipe Hub" },
      { name: "description", content: "A calm, thoughtful place for real cooking." },
      { property: "og:title", content: "About — Recipe Hub" },
      { property: "og:description", content: "A calm, thoughtful place for real cooking." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionTitle
        eyebrow="Our story"
        title="Recipes worth remembering."
        description="Recipe Hub started with a simple frustration: recipes that don't work. We're building a home for real recipes — tested, photographed, and written by people who cook."
      />
      <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
        <p className="text-lg text-muted-foreground">
          Every recipe on Recipe Hub is developed and tested by home cooks and professional chefs. We
          write for the way people actually cook — with pantry staples, weeknight energy, and honest
          expectations of how long things take.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: ChefHat, title: "Tested recipes", body: "Every recipe is cooked at least three times before we publish it." },
          { icon: Sparkles, title: "Weeknight-first", body: "Real ingredients, honest timing, and no filler steps." },
          { icon: Heart, title: "Community-loved", body: "Millions of cooks save, remix, and share our recipes each month." },
        ].map((v) => (
          <div key={v.title} className="glass rounded-3xl p-5">
            <v.icon className="h-6 w-6 text-brand" />
            <h3 className="mt-3 font-display text-xl">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
