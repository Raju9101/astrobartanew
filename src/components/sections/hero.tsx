import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
       <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-gradient-end"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-gradient-start to-gradient-middle"></div>
      </div>
      <div className="container relative mx-auto max-w-7xl px-4 py-16 text-center sm:py-20">
        <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
          <span className="block bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent py-2 bg-[size:200%_auto] animate-gradient">
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
        <div className="mt-16 mx-auto max-w-5xl">
          {/* TV Frame */}
          <div className="relative bg-slate-900/70 p-2 sm:p-3 rounded-2xl shadow-2xl ring-1 ring-slate-800/50">
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/GKISshYMv3o?autoplay=1&mute=1&loop=1&playlist=GKISshYMv3o&controls=0"
                title="AstroBarta Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          {/* TV Stand */}
          <div className="w-64 h-2 mx-auto mt-2 bg-slate-700 rounded-b-md"></div>
          <div className="w-48 h-3 mx-auto bg-slate-800 rounded-b-lg"></div>
        </div>
      </div>
    </section>
  );
}
