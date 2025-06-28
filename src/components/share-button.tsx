'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2, Check, Copy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ShareButton({ astrologerName }: { astrologerName: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // This will only run on the client, so window is safe to use.
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        toast({
          title: 'Link Copied!',
          description: "You can now share this astrologer's profile.",
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast({
          title: 'Error',
          description: 'Failed to copy link.',
          variant: 'destructive',
        });
      }
    );
  };

  const handleWhatsAppShare = () => {
    const url = window.location.href;
    const text = `Check out the profile of astrologer ${astrologerName} on AstroBarta!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-all hover:bg-primary/10 hover:text-primary active:scale-95"
          aria-label="Share profile"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopy} className="gap-2">
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWhatsAppShare} className="gap-2">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.52 3.48 1.43 4.95L2.05 22l5.25-1.52c1.38.75 2.96 1.18 4.64 1.18h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM9.53 8.3c.24-.24.58-.25.82-.25.22 0 .42.02.59.38.22.46.74 1.82.84 1.97.09.15.14.25.05.39-.1.15-.22.24-.41.43-.19.19-.38.43-.56.57-.18.13-.38.22-.62.07-.24-.15-1-.48-1.9-1.33-.71-.66-1.18-1.48-1.28-1.72-.09-.25-.01-.38.08-.47.09-.09.2-.24.28-.33.08-.09.13-.19.18-.33.05-.14 0-.28-.05-.38-.05-.09-.56-1.34-.77-1.84-.21-.5-.42-.42-.58-.42-.15 0-.32 0-.48.01a.7.7 0 0 0-.6.28c-.24.28-.93 1.05-.93 2.55s.96 2.96 1.1 3.15c.14.19 1.84 2.92 4.47 3.93.62.24 1.1.38 1.48.48.56.15 1.08.13 1.48.08.45-.05 1.41-.58 1.61-1.14.2-.56.2-1.05.14-1.14-.05-.1-.2-.15-.42-.25z"/>
          </svg>
          <span>Share on WhatsApp</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
