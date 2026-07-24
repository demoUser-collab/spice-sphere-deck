import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Bell, Heart, MessageCircle, UserPlus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Recipe Hub" },
      { name: "description", content: "Follows, likes, comments, and updates." },
      { property: "og:title", content: "Notifications — Recipe Hub" },
      { property: "og:description", content: "Follows, likes, comments, and updates." },
    ],
  }),
  component: NotificationsPage,
});

const ICON = {
  like: Heart, comment: MessageCircle, follow: UserPlus, system: Sparkles,
};

function NotificationsPage() {
  const notifs = useAppStore((s) => s.notifications);
  const markAll = useAppStore((s) => s.markAllRead);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <SectionTitle eyebrow="Activity" title="Notifications" />
        <Button variant="outline" className="rounded-full" onClick={markAll}>Mark all read</Button>
      </div>
      {notifs.length === 0 ? (
        <div className="grid place-items-center rounded-3xl border border-dashed py-16">
          <Bell className="h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">You're all caught up.</p>
        </div>
      ) : (
        <ul className="glass rounded-3xl divide-y divide-border/60">
          {notifs.map((n) => {
            const Icon = ICON[n.type];
            return (
              <li key={n.id} className={cn("flex items-start gap-4 p-4", !n.read && "bg-brand/5")}>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-muted-foreground">{n.body}</div>
                </div>
                {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
