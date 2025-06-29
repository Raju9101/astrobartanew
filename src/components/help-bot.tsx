'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot, Phone, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function HelpBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* Action Buttons */}
        <div
          className={cn(
            'flex flex-col items-center gap-3 transition-all duration-300 ease-in-out',
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                size="icon"
                className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg"
                aria-label="Chat on WhatsApp"
              >
                <Link href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.52 3.48 1.43 4.95L2.05 22l5.25-1.52c1.38.75 2.96 1.18 4.64 1.18h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM9.53 8.3c.24-.24.58-.25.82-.25.22 0 .42.02.59.38.22.46.74 1.82.84 1.97.09.15.14.25.05.39-.1.15-.22.24-.41.43-.19.19-.38.43-.56.57-.18.13-.38.22-.62.07-.24-.15-1-.48-1.9-1.33-.71-.66-1.18-1.48-1.28-1.72-.09-.25-.01-.38.08-.47.09-.09.2-.24.28-.33.08-.09.13-.19.18-.33.05-.14 0-.28-.05-.38-.05-.09-.56-1.34-.77-1.84-.21-.5-.42-.42-.58-.42-.15 0-.32 0-.48.01a.7.7 0 0 0-.6.28c-.24.28-.93 1.05-.93 2.55s.96 2.96 1.1 3.15c.14.19 1.84 2.92 4.47 3.93.62.24 1.1.38 1.48.48.56.15 1.08.13 1.48.08.45-.05 1.41-.58 1.61-1.14.2-.56.2-1.05.14-1.14-.05-.1-.2-.15-.42-.25z"/>
                    </svg>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Chat on WhatsApp</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
               <Button
                asChild
                size="icon"
                className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                aria-label="Call Us"
              >
                 <Link href="tel:+919876543210">
                    <Phone className="h-6 w-6" />
                 </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Call Us</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Main Toggle Button */}
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="icon"
                    className="rounded-full w-16 h-16 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end text-white shadow-xl transform transition-transform duration-300 hover:scale-110"
                    aria-label={isOpen ? 'Close help menu' : 'Open help menu'}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Bot className={cn('h-8 w-8 transition-all duration-300', isOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100')} />
                        <X className={cn('h-8 w-8 absolute transition-all duration-300', isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50')} />
                    </div>
                </Button>
            </TooltipTrigger>
             <TooltipContent side="left">
                <p>Need Help?</p>
            </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
