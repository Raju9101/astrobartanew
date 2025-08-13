"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { Badge } from "../ui/badge";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "/astrologers", label: "Astrologers" },
  { href: "/shop", label: "Shop" },
  { href: "/#daily-horoscope", label: "Daily Horoscope" },
  { href: "/quick", label: "Quick" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-black hover:bg-white/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] bg-background text-black">
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
            <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-black transition-colors hover:text-black/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-black hover:bg-white/20">
                <Phone />
            </Button>
             <div className="relative">
                <Button variant="ghost" size="icon" className="text-black hover:bg-white/20">
                    <ShoppingBag />
                </Button>
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white p-0 text-xs">0</Badge>
            </div>
        </div>
      </div>
    </header>
  );
}
