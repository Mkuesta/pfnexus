import { Header } from "@/components/shared/header";

export default function StartupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header userRole="startup" userName="Startup" />
      <main>{children}</main>
    </div>
  );
}
