import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
       <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className="container relative mx-auto max-w-7xl px-4 py-24 text-center sm:py-32">
        <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent py-2">
            🌟 AstroBarta 🌟
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
          Your Gateway to Trusted Astrologers. <br />
          Book personalized consultations with top astrologers anytime, anywhere.
          Experience astrology made simple, accessible, and meaningful.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" className="font-bold shadow-[0_4px_14px_0_hsl(var(--secondary))] hover:shadow-[0_6px_20px_0_hsl(var(--secondary)/80%)] transition-all duration-300">
            Book a Reading
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
