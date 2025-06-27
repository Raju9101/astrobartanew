"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "/astrologers", label: "Astrologers" },
  { href: "#ai-matcher", label: "AI Matcher" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline">Sign In</Button>
          <Button className="shadow-[0_4px_14px_0_hsl(var(--secondary))] hover:shadow-[0_6px_20px_0_hsl(var(--secondary)/80%)]">Book a Reading</Button>
        </div>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] bg-background">
            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="pb-4 border-b">
                <Logo />
              </div>
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                 <Button variant="outline" size="lg">Sign In</Button>
                 <Button size="lg" className="shadow-[0_4px_14px_0_hsl(var(--secondary))] hover:shadow-[0_6px_20px_0_hsl(var(--secondary)/80%)]">Book a Reading</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
