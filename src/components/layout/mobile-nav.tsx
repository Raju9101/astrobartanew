// This is a new file created by App Prototyper.
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Sparkles, LifeBuoy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CallRequestDialog } from '../call-request-dialog';
import { Button } from '../ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/astrologers', label: 'Astrologers', icon: Users },
  { href: '/#daily-horoscope', label: 'Horoscope', icon: Sparkles },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/50 md:hidden">
      <nav className="grid grid-cols-4 items-center justify-items-center gap-1 text-xs">
        {navItems.map((item) => {
          const isActive = (pathname === '/' && item.href === '/') || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-md p-2 transition-colors duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <CallRequestDialog
          trigger={
             <button
                className="flex flex-col items-center justify-center gap-1 rounded-md p-2 text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
                <LifeBuoy className="h-5 w-5" />
                <span>Help</span>
            </button>
          }
        />
      </nav>
    </div>
  );
}
