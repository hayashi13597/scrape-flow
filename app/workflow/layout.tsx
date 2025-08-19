import { Separator } from "@/components/ui/separator";
import { SquareDashedMousePointer } from "lucide-react";
import { AnimatedThemeToggler } from "@/features/sidebar/components/AnimatedThemeToggler";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex-center justify-between px-6 py-4">
        <div className="flex-center">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
            <SquareDashedMousePointer className="text-white size-5" />
          </div>
          <span className="text-2xl font-extrabold">
            <span className="text-primary">Flow</span>
            <span className="text-foreground">Scrape</span>
          </span>
        </div>
        <AnimatedThemeToggler />
      </footer>
    </div>
  );
};
export default Layout;
