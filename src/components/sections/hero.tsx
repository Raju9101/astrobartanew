import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sliderImages = [
  {
    src: "https://placehold.co/1200x600.png",
    alt: "Astrology reading session",
    "data-ai-hint": "astrology cosmic"
  },
  {
    src: "https://placehold.co/1200x600.png",
    alt: "Constellations in the night sky",
    "data-ai-hint": "constellations night"
  },
  {
    src: "https://placehold.co/1200x600.png",
    alt: "Astrologer with tarot cards",
    "data-ai-hint": "tarot cards"
  },
];

export function Hero() {
  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full h-[300px] sm:h-[400px] md:h-[500px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={image["data-ai-hint"]}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-shadow-lg">
                           <span className="block bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent py-2 bg-[size:200%_auto] animate-gradient">
                                🌟 AstroBarta 🌟
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg text-white/90 md:text-xl text-shadow">
                            Your Gateway to Trusted Astrologers. <br />
                            Book personalized consultations with top astrologers anytime, anywhere.
                        </p>
                    </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white border-white/50" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white border-white/50" />
        </div>
      </Carousel>
    </section>
  );
}
