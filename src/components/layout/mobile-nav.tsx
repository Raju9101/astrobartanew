// This is a new file created by App Prototyper.
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/astrologers', label: 'Astrologers', icon: Users },
  { href: '/#daily-horoscope', label: 'Horoscope', icon: Sparkles },
  { href: '/quick', label: 'Quick', icon: Zap },
];

export function MobileNav() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until the component is mounted on the client
  if (!isMounted) {
    return null;
  }
  
  // Only show the mobile nav on the homepage
  if (pathname !== '/') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-primary p-2 md:hidden">
      <nav className="grid grid-cols-4 items-center justify-items-center gap-1 text-xs">
        {navItems.map((item) => {
          const isActive = (pathname === '/' && item.href === '/') || (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/#daily-horoscope');
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-md p-2 transition-colors duration-200 w-full',
                isActive
                  ? 'text-black font-semibold'
                  : 'text-black/70 hover:text-black'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
