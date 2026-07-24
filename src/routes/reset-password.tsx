import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Recipe Hub" },
      { name: "description", content: "Choose a new password for your Recipe Hub account." },
      { property: "og:title", content: "Reset password — Recipe Hub" },
      { property: "og:description", content: "Choose a new password for your Recipe Hub account." },
    ],
  }),
  component: ResetPage,
});

const schema = z.object({
  password: z.string().min(8, "At least 8 characters"),
  confirm: z.string(),
}).refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Passwords don't match" });

function ResetPage() {
  const navigate = useNavigate();
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { password: "", confirm: "" } });
  const onSubmit = form.handleSubmit(async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Password updated. Please log in.");
    navigate({ to: "/login" });
  });
  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
      <div className="glass-strong rounded-4xl p-8 sm:p-10">
        <h1 className="font-display text-3xl">Choose a new password</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="p">New password</Label>
            <Input id="p" type="password" className="mt-1.5 h-11" {...form.register("password")} />
            {form.formState.errors.password && <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="c">Confirm password</Label>
            <Input id="c" type="password" className="mt-1.5 h-11" {...form.register("confirm")} />
            {form.formState.errors.confirm && <p className="mt-1 text-xs text-destructive">{form.formState.errors.confirm.message}</p>}
          </div>
          <Button type="submit" className="h-11 w-full rounded-full">Update password</Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-brand hover:underline">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
