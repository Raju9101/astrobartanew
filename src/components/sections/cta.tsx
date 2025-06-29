import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center sm:py-16">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
          Ready to Uncover Your Cosmic Path?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/60">
          Join AstroBarta today and gain the clarity you seek. Your personalized astrological reading is just a click away.
        </p>
        <div className="mt-8">
          <Button size="lg" className="font-bold shadow-[0_4px_14px_0_hsl(var(--secondary))] hover:shadow-[0_6px_20px_0_hsl(var(--secondary)/80%)] transition-all duration-300">
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
