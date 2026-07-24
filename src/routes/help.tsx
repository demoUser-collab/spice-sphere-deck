import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Recipe Hub" },
      { name: "description", content: "Answers to common questions about Recipe Hub." },
      { property: "og:title", content: "Help Center — Recipe Hub" },
      { property: "og:description", content: "Answers to common questions about Recipe Hub." },
    ],
  }),
  component: HelpPage,
});

const topics = [
  { q: "How do I save a recipe?", a: "Tap the bookmark icon on any recipe card or on the recipe page. Saved recipes live in Favorites." },
  { q: "Can I adjust servings?", a: "Yes — on any recipe page, use the +/- controls next to Ingredients. Quantities scale automatically." },
  { q: "How does ingredient search work?", a: "Head to What Can I Cook? Add pantry items and we'll surface recipes you can make." },
  { q: "Is there a mobile app?", a: "The web app is installable as a PWA. A native app is on the roadmap." },
  { q: "How do I follow a chef?", a: "Open any chef's profile and tap Follow. Their new recipes appear in your feed." },
  { q: "How do I delete my account?", a: "Head to Settings → Account → Delete. This removes all your saved data." },
];

function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionTitle eyebrow="Help center" title="How can we help?" />
      <div className="glass mb-6 flex items-center gap-2 rounded-full p-2">
        <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search help articles…" className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0" />
      </div>
      <Accordion type="single" collapsible className="glass rounded-3xl p-2">
        {topics.map((t, i) => (
          <AccordionItem key={i} value={`t-${i}`} className="border-none">
            <AccordionTrigger className="rounded-2xl px-4 hover:no-underline">{t.q}</AccordionTrigger>
            <AccordionContent className="px-4 text-muted-foreground">{t.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
