"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Languages, GraduationCap, Award, Phone, CalendarDays, Loader2 } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "../share-button";
import { BookingDialog } from "../booking-dialog";
import { CallRequestDialog } from "../call-request-dialog";

interface Astrologer {
  id: number;
  name: string;
  experience: string;
  language: string;
  expertise: string;
  profile_image: string;
}

export function Astrologers() {
  const [allAstrologers, setAllAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        setLoading(true);
        setError(null);
        const apiKey = process.env.NEXT_PUBLIC_ASTROBARTA_API_KEY;
        const url = `https://api.astrobarta.com/get_astrologer.php${apiKey ? `?api_key=${apiKey}` : ''}`;
        const res = await fetch(url, {
          cache: 'no-store' 
        });
        if (!res.ok) {
           throw new Error(`Failed to fetch astrologers: ${res.statusText}`);
        }
        const data = await res.json();
        setAllAstrologers(data.data || []);
      } catch (error) {
        console.error('Error fetching astrologers:', error);
        setError("Our cosmic signals are weak. Please try again later.");
        setAllAstrologers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAstrologers();
  }, []);

  const astrologers = allAstrologers.slice(0, 6);

  return (
    <section id="astrologers" className="bg-background pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Meet Our Top Astrologers</h2>
          <p className="mt-4 text-lg text-foreground/60">Experts ready to guide you on your journey.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-[300px]">
          {loading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center">
               <p className="text-lg text-destructive">{error}</p>
            </div>
          ) : astrologers.length > 0 ? (
            astrologers.map((astrologer) => {
                const rating = (4.5 + Math.random() * 0.5).toFixed(1);
                const reviews = Math.floor(Math.random() * 1500) + 500;
                const isOnline = Math.random() > 0.4;

                return (
                  <Card key={astrologer.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <CardContent className="p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-4 flex-1">
                        <Link href={`/astrologers/${encodeURIComponent(astrologer.name)}`} className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="relative">
                              <Avatar className="w-20 h-20 border-2 border-primary/50">
                                <AvatarImage src={`https://api.astrobarta.com${astrologer.profile_image}`} alt={astrologer.name} />
                                <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {isOnline && <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" title="Online"></div>}
                            </div>
                            <Badge variant="outline" className="mt-2 text-xs font-medium">
                              <Star className="w-3.5 h-3.5 mr-1 text-primary fill-current" />
                              {rating} | {reviews}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-1 pt-1 flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate" title={astrologer.name}>{astrologer.name}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                              <Languages className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{astrologer.language}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <GraduationCap className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{astrologer.experience} years</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Award className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{astrologer.expertise}</span>
                            </div>
                          </div>
                        </Link>
                        <div onClick={(e) => e.preventDefault()}>
                            <ShareButton astrologerName={astrologer.name} />
                        </div>
                      </div>

                      <Separator className="my-4 bg-border/50" />

                      <div className="grid grid-cols-2 gap-2 mt-auto">
                           <BookingDialog
                            astrologer={astrologer}
                            trigger={
                              <Button variant="outline" className="w-full text-foreground border-primary hover:bg-primary/10">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                Book
                              </Button>
                            }
                          />
                          <CallRequestDialog
                            trigger={
                              <Button variant="outline" className="w-full text-foreground border-primary hover:bg-primary/10">
                                <Phone className="mr-2 h-4 w-4" />
                                Call
                              </Button>
                            }
                          />
                      </div>
                    </CardContent>
                  </Card>
              )})
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center">
              <p className="text-lg text-muted-foreground">No astrologers found.</p>
            </div>
          )}
        </div>
        {!loading && !error && allAstrologers.length > 6 && (
          <div className="mt-12 text-center">
            <Link href="/astrologers">
              <Button>View More</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
