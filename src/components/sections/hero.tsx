
'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const sliderContent = [
  {
    bgColor: 'bg-teal-400',
    title: 'Consult Top Astrologers',
    description: 'From Your Home or Anywhere in the World.',
    buttonText: 'Book a Reading',
    image: {
      src: 'https://placehold.co/600x600.png',
      alt: 'Astrologer providing consultation',
      "data-ai-hint": "astrologer portrait"
    },
  },
  {
    bgColor: 'bg-amber-400',
    title: 'Daily Personalized Horoscopes',
    description: 'Discover what the stars have in store for you today.',
    buttonText: 'Get My Horoscope',
    image: {
      src: 'https://placehold.co/600x600.png',
      alt: 'Zodiac wheel and constellations',
      "data-ai-hint": "zodiac wheel"
    },
  },
  {
    bgColor: 'bg-rose-400',
    title: 'Find Your Cosmic Match',
    description: "Check your compatibility with our expert's guidance.",
    buttonText: 'Check Compatibility',
    image: {
      src: 'https://placehold.co/600x600.png',
      alt: 'Couple under the stars',
      "data-ai-hint": "couple stars"
    },
  },
];

export function Hero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section className="w-full py-6 md:py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {sliderContent.map((slide, index) => (
              <CarouselItem key={index}>
                <div
                  className={cn(
                    'rounded-lg text-white overflow-hidden',
                    slide.bgColor
                  )}
                >
                  <div className="grid md:grid-cols-2 items-center">
                    <div className="p-8 md:p-12 lg:p-16 text-center md:text-left">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="mt-4 text-lg md:text-xl text-white/90">
                        {slide.description}
                      </p>
                      <Button
                        size="lg"
                        className="mt-8 bg-background text-foreground hover:bg-background/90"
                      >
                        {slide.buttonText}
                      </Button>
                    </div>
                    <div className="relative h-64 md:h-96 order-first md:order-last">
                       <Image
                        src={slide.image.src}
                        alt={slide.image.alt}
                        data-ai-hint={slide.image["data-ai-hint"]}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
        <div className="flex justify-center gap-2 mt-4">
            {sliderContent.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all',
                  i === current ? 'w-4 bg-primary' : 'bg-muted'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
      </div>
    </section>
  );
}
