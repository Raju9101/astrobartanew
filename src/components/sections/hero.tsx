
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
    image: {
      desktop: {
        src: 'https://res.cloudinary.com/dbyy6z4hl/image/upload/e_improve,e_sharpen/v1752133155/slider_01_zbefta.jpg',
        alt: 'Astrologer providing consultation',
        "data-ai-hint": "astrologer portrait"
      },
      mobile: {
        src: 'https://placehold.co/600x400.png',
        alt: 'Astrologer providing consultation',
        "data-ai-hint": "astrologer portrait"
      }
    },
  },
  {
    bgColor: 'bg-amber-400',
    image: {
        desktop: {
            src: 'https://placehold.co/1200x400.png',
            alt: 'Zodiac wheel and constellations',
            "data-ai-hint": "zodiac wheel"
        },
        mobile: {
            src: 'https://placehold.co/600x400.png',
            alt: 'Zodiac wheel and constellations',
            "data-ai-hint": "zodiac wheel"
        }
    },
  },
  {
    bgColor: 'bg-rose-400',
    image: {
        desktop: {
            src: 'https://placehold.co/1200x400.png',
            alt: 'Couple under the stars',
            "data-ai-hint": "couple stars"
        },
        mobile: {
            src: 'https://placehold.co/600x400.png',
            alt: 'Couple under the stars',
            "data-ai-hint": "couple stars"
        }
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
                    'rounded-lg text-white overflow-hidden relative h-56 md:h-[350px]',
                    slide.bgColor
                  )}
                >
                  <Image
                    src={slide.image.desktop.src}
                    alt={slide.image.desktop.alt}
                    data-ai-hint={slide.image.desktop["data-ai-hint"]}
                    fill
                    className="object-cover hidden md:block"
                    priority={index === 0}
                  />
                  <Image
                    src={slide.image.mobile.src}
                    alt={slide.image.mobile.alt}
                    data-ai-hint={slide.image.mobile["data-ai-hint"]}
                    fill
                    className="object-cover md:hidden"
                    priority={index === 0}
                  />
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
