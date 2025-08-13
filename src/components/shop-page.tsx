"use client";

import {
  Heart,
  ShoppingCart,
  Star,
  GitCompareArrows,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    slug: "raw-pyrite-bracelet",
    name: "1 Mukhi Rudraksha Bracelet",
    originalPrice: "15,000.00",
    price: "9,600.00",
    discount: 36,
    reviews: 2,
    rating: 5,
    image: "https://placehold.co/400x400.png",
    imageHint: "rudraksha bracelet"
  },
  {
    slug: "raw-pyrite-bracelet",
    name: "5 Mukhi Copper Rudraksha",
    originalPrice: "996.00",
    price: "690.00",
    discount: 31,
    reviews: 4,
    rating: 4.5,
    image: "https://placehold.co/400x400.png",
    imageHint: "copper rudraksha"
  },
  {
    slug: "raw-pyrite-bracelet",
    name: "Silver Rudraksha Bracelet",
    originalPrice: "12,000.00",
    price: "10,920.00",
    discount: 9,
    reviews: 7,
    rating: 4,
    image: "https://placehold.co/400x400.png",
    imageHint: "silver bracelet"
  },
  {
    slug: "raw-pyrite-bracelet",
    name: "Mala Rudraksha Beads",
    originalPrice: "1,500.00",
    price: "1,035.00",
    discount: 31,
    reviews: 12,
    rating: 5,
    image: "https://placehold.co/400x400.png",
    imageHint: "rudraksha beads"
  },
];

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/shop/${product.slug}`} className="relative group block">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-auto object-cover"
          data-ai-hint={product.imageHint}
        />
        <Badge
          variant="destructive"
          className="absolute top-2 right-2 bg-red-500 text-white"
        >
          -{product.discount}%
        </Badge>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white w-9 h-9">
            <Heart className="h-4 w-4" />
          </Button>
           <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white w-9 h-9">
            <GitCompareArrows className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-base truncate">{product.name}</h3>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1.5">({product.reviews} Reviews)</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
                Rs. {product.originalPrice}
            </span>
            <span className="text-base sm:text-lg font-bold text-red-600">
                Rs. {product.price}
            </span>
        </div>
      </div>
    </div>
  );
};

export function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
