import { Header } from "@/components/shared/header";

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header userRole="investor" userName="Investor" />
      <main>{children}</main>
    </div>
  );
}
