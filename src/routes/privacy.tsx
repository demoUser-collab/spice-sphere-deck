import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/common/SectionTitle";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Recipe Hub" },
      { name: "description", content: "How we handle your data at Recipe Hub." },
      { property: "og:title", content: "Privacy Policy — Recipe Hub" },
      { property: "og:description", content: "How we handle your data at Recipe Hub." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionTitle eyebrow="Legal" title="Privacy Policy" />
      <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none space-y-4 text-sm text-foreground/85">
        <p>We collect only what we need to make Recipe Hub work: your email, saved recipes, and search history. We never sell your data.</p>
        <h3>What we collect</h3>
        <p>Account information (name, email), recipe activity (saves, likes, uploads), and basic device information for analytics.</p>
        <h3>How we use it</h3>
        <p>To personalize recommendations, sync your favorites, and improve the product. We use aggregated analytics — never individual tracking for advertisers.</p>
        <h3>Your rights</h3>
        <p>You can export or delete your data any time from Settings. Reach out at hello@recipehub.dev for anything else.</p>
      </div>
    </div>
  );
}
