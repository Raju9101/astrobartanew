'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2, Check } from 'lucide-react';

export function ShareButton() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleShare}
      className="rounded-full transition-all hover:bg-primary/10 hover:text-primary active:scale-95"
      aria-label="Share profile"
    >
      {copied ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <Share2 className="h-5 w-5" />
      )}
    </Button>
  );
}
