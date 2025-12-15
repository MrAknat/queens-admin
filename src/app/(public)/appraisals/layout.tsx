import { PublicHeader } from "@/components/layout/public-header";

interface PublicLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function PublicLayout({ children, title }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader title={title} />

      <main className="flex-1">
        <div className="container mx-auto p-4 lg:p-6 max-w-8xl">{children}</div>
      </main>
    </div>
  );
}
