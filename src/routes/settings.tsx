import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Recipe Hub" },
      { name: "description", content: "Manage your account, appearance, and preferences." },
      { property: "og:title", content: "Settings — Recipe Hub" },
      { property: "og:description", content: "Manage your account, appearance, and preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Settings</h1>
      <Tabs defaultValue="appearance" className="mt-8">
        <TabsList className="rounded-full">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <Row label="Theme" description="Choose light, dark, or system.">
              <Select value={theme} onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}>
                <SelectTrigger className="w-40 rounded-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Reduced motion" description="Minimize animations."><Switch /></Row>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <Row label="Weekly digest" description="One brilliant recipe every Sunday."><Switch defaultChecked /></Row>
            <Row label="New follower" description="Get notified when someone follows you."><Switch defaultChecked /></Row>
            <Row label="Comments" description="Replies to your recipes."><Switch defaultChecked /></Row>
            <Row label="Product updates" description="Occasional emails about new features."><Switch /></Row>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <Card>
            <Row label="Language" description="App language.">
              <Select defaultValue="en">
                <SelectTrigger className="w-40 rounded-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Units" description="Metric or imperial.">
              <Select defaultValue="metric">
                <SelectTrigger className="w-40 rounded-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric</SelectItem>
                  <SelectItem value="imperial">Imperial</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Dietary" description="Filter recipes by diet.">
              <Select defaultValue="all">
                <SelectTrigger className="w-40 rounded-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gf">Gluten-free</SelectItem>
                </SelectContent>
              </Select>
            </Row>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <Card>
            <Row label="Email" description="alex@recipehub.dev"><Button variant="outline" className="rounded-full">Change</Button></Row>
            <Row label="Password" description="Last changed 4 months ago."><Button variant="outline" className="rounded-full">Update</Button></Row>
            <Row label="Delete account" description="Permanently remove all data.">
              <Button variant="destructive" className="rounded-full" onClick={() => toast.info("This would delete the account.")}>Delete</Button>
            </Row>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="glass rounded-3xl divide-y divide-border/60">{children}</div>;
}
function Row({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 p-5">
      <div className="min-w-0 flex-1">
        <Label className="font-medium">{label}</Label>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
