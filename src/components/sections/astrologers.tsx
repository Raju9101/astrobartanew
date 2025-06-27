import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

const astrologersList = [
  {
    name: "Elena Vasilia",
    specialty: "Vedic Astrology",
    rating: 4.9,
    reviews: 132,
    image: "https://placehold.co/100x100.png",
    aiHint: "woman portrait"
  },
  {
    name: "Marcus Aurelius",
    specialty: "Hellenistic Astrology",
    rating: 4.8,
    reviews: 98,
    image: "https://placehold.co/100x100.png",
    aiHint: "man portrait"
  },
  {
    name: "Seraphina Moon",
    specialty: "Psychological Astrology",
    rating: 5.0,
    reviews: 210,
    image: "https://placehold.co/100x100.png",
    aiHint: "woman face"
  },
];

export function Astrologers() {
  return (
    <section id="astrologers" className="bg-secondary/20 py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Meet Our Top Astrologers</h2>
          <p className="mt-4 text-lg text-foreground/60">Experts ready to guide you on your journey.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {astrologersList.map((astrologer) => (
            <Card key={astrologer.name} className="flex flex-col">
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary/50">
                  <AvatarImage src={astrologer.image} alt={astrologer.name} data-ai-hint={astrologer.aiHint} />
                  <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-headline font-semibold">{astrologer.name}</h3>
                <Badge variant="secondary" className="mt-1">{astrologer.specialty}</Badge>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <div className="flex items-center justify-center gap-1 text-primary">
                  <Star className="w-5 h-5 fill-primary" />
                  <span className="font-bold">{astrologer.rating}</span>
                  <span className="text-sm text-foreground/60">({astrologer.reviews} reviews)</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
