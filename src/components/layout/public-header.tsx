import { ThemeToggle } from "@/components/theme-toggle";
import FullLogo from "../ui/icons/FullLogo";

interface PublicHeaderProps {
  title?: string;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ title }) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <FullLogo className="h-10 w-auto" />

        {title && (
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
          </div>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
};
