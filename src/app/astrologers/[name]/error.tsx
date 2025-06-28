'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground mb-6">
                There was an issue loading this astrologer's profile. Our cosmic signals might be weak.
            </p>
            <Button
                onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
                }
            >
                Try again
            </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
