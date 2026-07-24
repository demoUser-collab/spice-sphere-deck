import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Recipe Hub" },
      { name: "description", content: "Get in touch with the Recipe Hub team." },
      { property: "og:title", content: "Contact — Recipe Hub" },
      { property: "og:description", content: "Get in touch with the Recipe Hub team." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10, "At least 10 characters"),
});

function ContactPage() {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", message: "" } });
  const onSubmit = form.handleSubmit(async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Message sent — we'll be in touch.");
    form.reset();
  });
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionTitle eyebrow="Say hello" title="Get in touch" description="We usually reply within a day or two." />
      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="glass space-y-5 rounded-3xl p-6">
          {[
            { icon: Mail, label: "hello@recipehub.dev" },
            { icon: MessageSquare, label: "Support & feedback" },
            { icon: MapPin, label: "Brooklyn, NY" },
          ].map((i) => (
            <div key={i.label} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand"><i.icon className="h-4 w-4" /></div>
              <span className="text-sm">{i.label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Name</Label><Input className="mt-1.5" {...form.register("name")} /></div>
            <div><Label>Email</Label><Input type="email" className="mt-1.5" {...form.register("email")} /></div>
          </div>
          <div><Label>Message</Label><Textarea rows={5} className="mt-1.5" {...form.register("message")} /></div>
          {form.formState.errors.message && <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>}
          <div className="flex justify-end"><Button type="submit" className="rounded-full px-6">Send</Button></div>
        </form>
      </div>
    </div>
  );
}
