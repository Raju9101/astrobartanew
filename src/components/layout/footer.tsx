import { Logo } from "@/components/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
        <Logo />
        <p className="text-sm text-foreground/60">
          © {currentYear} AstroBarta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
