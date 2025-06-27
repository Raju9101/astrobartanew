import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  GraduationCap,
  Languages,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { notFound } from "next/navigation";

interface Astrologer {
  id: number;
  name: string;
  experience: string;
  language: string;
  expertise: string;
  profile_image: string;
  bio: string;
  location: string;
}

async function getAstrologer(name: string): Promise<Astrologer | undefined> {
  try {
    const res = await fetch("https://api.astrobarta.com/api/get_astrologer.php", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Failed to fetch astrologers:", res.statusText);
      return undefined;
    }
    const data = await res.json();
    const astrologers: Astrologer[] = data.data || [];
    return astrologers.find((astro) => astro.name === name);
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    return undefined;
  }
}

// Dummy data for ratings as it is not in the API
const getRatingData = () => {
  const rating = (4.5 + Math.random() * 0.5).toFixed(2);
  const reviews = Math.floor(Math.random() * 1500) + 200;
  const distribution = [
    Math.floor(Math.random() * 70) + 25, // 5 stars
    Math.floor(Math.random() * 20) + 5, // 4 stars
    Math.floor(Math.random() * 5) + 1, // 3 stars
    Math.floor(Math.random() * 3), // 2 stars
    Math.floor(Math.random() * 2), // 1 star
  ];
  const total = distribution.reduce((a, b) => a + b, 0);
  const percentages = distribution.map((d) => Math.round((d / total) * 100));
  return { rating, reviews, percentages };
};

export default async function AstrologerProfilePage({
  params,
}: {
  params: { name: string };
}) {
  const astrologerName = decodeURIComponent(params.name);
  const astrologer = await getAstrologer(astrologerName);

  if (!astrologer) {
    notFound();
  }

  const { rating, reviews, percentages } = getRatingData();
  const expertiseTags = [
    "Kundli Matching",
    "FlatDeal 12",
    "Vedic Astrology",
    "Tarot Reading",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-28 h-28 border-4 border-primary/50">
                        <AvatarImage
                          src={`https://api.astrobarta.com/api${astrologer.profile_image}`}
                          alt={astrologer.name}
                        />
                        <AvatarFallback>
                          {astrologer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className="absolute top-1 right-1 w-5 h-5 bg-green-500 border-2 border-background rounded-full"
                        title="Online"
                      ></div>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold font-headline">
                        {astrologer.name}
                      </h1>
                      <p className="text-muted-foreground mt-1">
                        {astrologer.expertise}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {expertiseTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Languages className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold">Language</p>
                            <p className="text-muted-foreground">
                              {astrologer.language}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold">Experience</p>
                            <p className="text-muted-foreground">
                              {astrologer.experience}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold">Location</p>
                            <p className="text-muted-foreground">
                              {astrologer.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: astrologer.bio.replace(/&amp;#039;/g, "'"),
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-primary via-gradient-middle to-gradient-end text-primary-foreground shadow-xl">
                <CardHeader className="items-center text-center">
                  <CardTitle className="text-2xl font-bold text-white">
                    Start a Conversation
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/90">
                    Get instant advice or book for later.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Button
                      size="lg"
                      className="w-full bg-white font-semibold text-primary shadow-md transition-transform hover:scale-105 hover:bg-white/95"
                    >
                      <Phone className="mr-2 h-5 w-5" /> Call Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-white font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-white/10"
                    >
                      <CalendarDays className="mr-2 h-5 w-5" /> Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-4xl font-bold">{rating}</p>
                    <div className="flex flex-col">
                      <div className="flex text-primary">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {reviews} ratings
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {percentages.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span>{5 - i}</span>
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <Progress value={p} className="h-2 bg-secondary" />
                        <span className="w-8 text-right text-muted-foreground">
                          {p}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">Money Back Guarantee</p>
                    <p className="text-sm text-muted-foreground">
                      100% refund if you're not satisfied.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
