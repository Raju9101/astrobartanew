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
import { AstrologerRatings } from "@/components/astrologer-ratings";
import { ShareButton } from "@/components/share-button";
import { BookingDialog } from "@/components/booking-dialog";

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
    const res = await fetch("https://api.astrobarta.com/get_astrologer.php", {
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

  const expertiseTags = [
    "Kundli Matching",
    "FlatDeal 12",
    "Vedic Astrology",
    "Tarot Reading",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <Header />
      <main className="flex-1 py-8 sm:py-12 pb-28 lg:pb-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="overflow-hidden">
                <CardContent className="p-4 sm:p-6 relative">
                  {/* Mobile View */}
                  <div className="sm:hidden">
                    <div className="flex flex-row items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-20 h-20 border-2 border-primary/50">
                          <AvatarImage
                            src={`https://api.astrobarta.com${astrologer.profile_image}`}
                            alt={astrologer.name}
                          />
                          <AvatarFallback>
                            {astrologer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-background rounded-full"
                          title="Online"
                        ></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h1 className="text-lg font-bold flex items-center gap-1.5">
                              {astrologer.name}
                              <ShieldCheck className="w-4 h-4 text-green-500 fill-green-100" />
                            </h1>
                            <p className="text-muted-foreground text-xs mt-0.5">
                              {astrologer.expertise}
                            </p>
                          </div>
                          <ShareButton astrologerName={astrologer.name} />
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <Star className="w-3.5 h-3.5 text-gray-300" />
                          <Badge
                            variant="outline"
                            className="ml-2 text-red-500 border-red-500 px-1.5 text-[10px]"
                          >
                            NEW!
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-3 space-y-1.5">
                            <div className="flex items-center gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                                <span>Exp: {astrologer.experience}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Languages className="w-3.5 h-3.5 text-primary" />
                                <span>{astrologer.language}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <span>{astrologer.location}</span>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden sm:block">
                    <div className="absolute top-4 right-4">
                      <ShareButton astrologerName={astrologer.name} />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-28 h-28 border-4 border-primary/50">
                          <AvatarImage
                            src={`https://api.astrobarta.com${astrologer.profile_image}`}
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
                        <div>
                          <h1 className="text-3xl font-bold font-headline pr-10">
                            {astrologer.name}
                          </h1>
                          <p className="text-muted-foreground mt-1">
                            {astrologer.expertise}
                          </p>
                        </div>
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
              {/* "Start a Conversation" for desktop */}
              <div className="hidden lg:block">
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
                      <BookingDialog
                        astrologer={astrologer}
                        trigger={
                          <Button
                            size="lg"
                            className="w-full bg-white font-semibold text-primary shadow-md transition-transform hover:scale-105 hover:bg-white/95"
                          >
                            <CalendarDays className="mr-2 h-5 w-5" /> Book
                          </Button>
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <AstrologerRatings />
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
      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          <Button size="lg" variant="outline" className="font-semibold">
            <Phone className="mr-2 h-5 w-5" /> Call
          </Button>
          <BookingDialog
            astrologer={astrologer}
            trigger={
              <Button size="lg" className="w-full font-semibold">
                <CalendarDays className="mr-2 h-5 w-5" /> Book
              </Button>
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
