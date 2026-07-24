import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/common/SectionTitle";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Recipe Hub" },
      { name: "description", content: "The terms that govern your use of Recipe Hub." },
      { property: "og:title", content: "Terms of Service — Recipe Hub" },
      { property: "og:description", content: "The terms that govern your use of Recipe Hub." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionTitle eyebrow="Legal" title="Terms of Service" />
      <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none space-y-4 text-sm text-foreground/85">
        <p>By using Recipe Hub, you agree to these terms. Be kind, share thoughtfully, and don't upload content you don't own.</p>
        <h3>Content</h3>
        <p>You own the recipes you upload. By publishing them on Recipe Hub, you grant us a non-exclusive license to display them.</p>
        <h3>Acceptable use</h3>
        <p>No spam, no harassment, no scraping. Report issues at hello@recipehub.dev.</p>
        <h3>Changes</h3>
        <p>We may update these terms. When we do, we'll email registered users at least 14 days in advance.</p>
      </div>
    </div>
  );
}
