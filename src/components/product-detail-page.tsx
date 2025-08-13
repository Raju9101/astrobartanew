
// This is a new file created by App Prototyper.
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart.tsx";
import { useToast } from "@/hooks/use-toast";

const productImages = [
  {
    src: "https://astrotalk.store/cdn/shop/files/xs9bzurowvho20b1qbig.webp?v=1750925191&width=750",
    alt: "Raw Pyrite Bracelet on a stone",
    hint: "pyrite bracelet",
  },
  {
    src: "https://astrotalk.store/cdn/shop/files/xs9bzurowvho20b1qbig.webp?v=1750925191&width=750",
    alt: "Raw Pyrite Bracelet on a wrist",
    hint: "bracelet wrist",
  },
  {
    src: "https://astrotalk.store/cdn/shop/files/xs9bzurowvho20b1qbig.webp?v=1750925191&width=750",
    alt: "GGLAB Certificate for the bracelet",
    hint: "certificate jewelry",
  },
  {
    src: "https://astrotalk.store/cdn/shop/files/xs9bzurowvho20b1qbig.webp?v=1750925191&width=750",
    alt: "Information card about raw pyrite crystal",
    hint: "information card",
  },
  {
    src: "https://astrotalk.store/cdn/shop/files/xs9bzurowvho20b1qbig.webp?v=1750925191&width=750",
    alt: "Close up of the bracelet beads",
    hint: "bracelet beads",
  },
  {
    src: "https://astrotalk.store/cdn/shop/files/xs9bzurowvho20b1qbig.webp?v=1750925191&width=750",
    alt: "Bracelet with size information",
    hint: "bracelet sizing",
  },
  {
    src: "https://astrotalk.store/cdn/shop/files/xs9bzurowvho20b1qbig.webp?v=1750925191&width=750",
    alt: "Another view of the bracelet",
    hint: "pyrite jewelry",
  },
];

interface Product {
  slug: string;
  name: string;
}

export function ProductDetailPage({ product }: { product: Product }) {
  const [api, setApi] = useState<CarouselApi>();
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [mainCurrent, setMainCurrent] = useState(0);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = {
      id: product.slug,
      name: product.name,
      price: 699,
      image: productImages[0].src,
      quantity: 1,
    };
    addToCart(item);
  };

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi]
  );

  useEffect(() => {
    if (!mainApi) return;
    setMainCurrent(mainApi.selectedScrollSnap());
    api?.scrollTo(mainApi.selectedScrollSnap());

    const onSelect = () => {
      setMainCurrent(mainApi.selectedScrollSnap());
      api?.scrollTo(mainApi.selectedScrollSnap());
    };
    mainApi.on("select", onSelect);
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, api]);

  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 pb-24 md:pb-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="grid gap-4">
            <Carousel
              setApi={setMainApi}
              className="overflow-hidden rounded-lg"
            >
              <CarouselContent>
                {productImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={800}
                      className="w-full h-auto object-cover aspect-square"
                      data-ai-hint={img.hint}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute top-1/2 left-2 -translate-y-1/2">
                <CarouselPrevious className="static translate-y-0 bg-white/70 hover:bg-white text-foreground" />
              </div>
              <div className="absolute top-1/2 right-2 -translate-y-1/2">
                  <CarouselNext className="static translate-y-0 bg-white/70 hover:bg-white text-foreground" />
              </div>
            </Carousel>

            <Carousel setApi={setApi} opts={{ align: "start", slidesToScroll: 1, dragFree: true }}>
              <CarouselContent className="-ml-2">
                {productImages.map((img, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 basis-1/4 sm:basis-1/5 cursor-pointer"
                    onClick={() => onThumbClick(index)}
                  >
                    <div
                      className={cn(
                        "overflow-hidden rounded-md border-2 transition-colors",
                        mainCurrent === index
                          ? "border-primary"
                          : "border-transparent"
                      )}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={200}
                        height={200}
                        className="w-full h-auto object-cover aspect-square"
                        data-ai-hint={img.hint}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">1387 reviews</span>
            </div>
            <div className="bg-emerald-600 text-white font-semibold text-center rounded-md p-3 text-lg">
              Freedom Sale : Extra 20% OFF Sitewide
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-foreground">₹699</span>
              <span className="text-xl text-muted-foreground line-through">
                ₹1,999
              </span>
              <span className="text-lg font-bold text-emerald-600">
                45% + Extra 20% OFF
              </span>
            </div>
            {/* Desktop Buttons */}
            <div className="hidden md:grid grid-cols-2 gap-3 mt-4">
              <Button
                size="lg"
                className="w-full bg-black text-white hover:bg-black/80 text-base h-12"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
              <Button
                size="lg"
                className="w-full bg-amber-400 text-black hover:bg-amber-500 text-base h-12"
              >
                BUY IT NOW
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 text-muted-foreground">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>This is a placeholder description for the {product.name}. Replace this with the actual product details. It should be informative and highlight the key features and benefits of the product.</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                      <li>Feature one about the product.</li>
                      <li>Another great feature.</li>
                      <li>And one more for good measure.</li>
                  </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
               <p className="text-muted-foreground">No reviews yet.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Mobile Sticky Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-2 border-t bg-background md:hidden">
        <div className="grid grid-cols-2 gap-3">
            <Button
              size="lg"
              className="w-full bg-black text-white hover:bg-black/80 text-base h-12"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
            <Button
              size="lg"
              className="w-full bg-amber-400 text-black hover:bg-amber-500 text-base h-12"
            >
              BUY IT NOW
            </Button>
        </div>
      </div>
    </>
  );
}
