import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  href?: string;
  ctaLabel?: string;
}

export function SectionTitle({ eyebrow, title, description, href, ctaLabel = "See all" }: Props) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div className="min-w-0">
        {eyebrow && (
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-brand">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
        )}
      </div>
      {href && (
        <Link
          to={href}
          className="group hidden shrink-0 items-center gap-1 text-sm font-medium text-foreground/70 transition hover:text-foreground sm:inline-flex"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
