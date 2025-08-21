"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Languages,
  GraduationCap,
  Award,
  Phone,
  CalendarDays,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { ShareButton } from "./share-button";
import { BookingDialog } from "./booking-dialog";
import { CallRequestDialog } from "./call-request-dialog";

interface Astrologer {
  id: number;
  name: string;
  experience: string;
  language: string;
  expertise: string;
  profile_image: string;
}

interface ExpertiseAstrologerListProps {
  expertise: string;
}

export function ExpertiseAstrologerList({
  expertise,
}: ExpertiseAstrologerListProps) {
  const [allAstrologers, setAllAstrologers] = useState<Astrologer[]>([]);
  const [filteredAstrologers, setFilteredAstrologers] = useState<Astrologer[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        setLoading(true);
        const apiKey = "ee54848dsqwdeeegdeeffg654987545564%%";
        const url = `https://api.astrobarta.com/get_astrologer.php${apiKey ? `?api_key=${apiKey}` : ''}`;
        const res = await fetch(
          url,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          console.error("Failed to fetch astrologers:", res.statusText);
          return;
        }
        const data = await res.json();
        const astrologerData: Astrologer[] = data.data || [];
        setAllAstrologers(astrologerData);
      } catch (error) {
        console.error("Error fetching astrologers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAstrologers();
  }, []);

  useEffect(() => {
    if (allAstrologers.length > 0) {
      const lowercasedExpertise = expertise.toLowerCase();
      const filtered = allAstrologers.filter((astrologer) =>
        astrologer.expertise.toLowerCase().includes(lowercasedExpertise)
      );
      setFilteredAstrologers(filtered);
    }
  }, [expertise, allAstrologers]);

  return (
    <section id="astrologers-list" className="bg-secondary/30 py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Astrologers for{' '}
            <span className="bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient">
              {expertise}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Browse our selection of top-rated astrologers who specialize in providing guidance on {expertise.toLowerCase()} matters.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredAstrologers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAstrologers.map((astrologer) => {
              const rating = (4.5 + Math.random() * 0.5).toFixed(1);
              const reviews = Math.floor(Math.random() * 1500) + 500;
              const isOnline = Math.random() > 0.4;

              return (
                <Card
                  key={astrologer.id}
                  className="overflow-hidden bg-background shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                >
                  <CardContent className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-4 flex-1">
                      <Link
                        href={`/astrologers/${encodeURIComponent(
                          astrologer.name
                        )}`}
                        className="flex items-start gap-3 flex-1 min-w-0"
                      >
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="relative">
                            <Avatar className="w-20 h-20 border-2 border-primary/50">
                              <AvatarImage
                                src={`https://api.astrobarta.com${astrologer.profile_image}`}
                                alt={astrologer.name}
                              />
                              <AvatarFallback>
                                {astrologer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {isOnline && (
                              <div
                                className="absolute top-1 right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"
                                title="Online"
                              ></div>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className="mt-2 text-xs font-medium"
                          >
                            <Star className="w-3.5 h-3.5 mr-1 text-primary fill-current" />
                            {rating} | {reviews}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-1 pt-1 flex-1 min-w-0">
                          <h3
                            className="font-semibold text-lg truncate"
                            title={astrologer.name}
                          >
                            {astrologer.name}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                            <Languages className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              {astrologer.language}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <GraduationCap className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              {astrologer.experience} years
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Award className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              {astrologer.expertise}
                            </span>
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
                             <Button
                                variant="outline"
                                className="w-full text-foreground border-primary hover:bg-primary/10"
                              >
                                <CalendarDays className="mr-2 h-4 w-4" />
                                Book
                              </Button>
                          }
                        />
                        <CallRequestDialog
                          trigger={
                            <Button
                                variant="outline"
                                className="w-full text-foreground border-primary hover:bg-primary/10"
                              >
                                <Phone className="mr-2 h-4 w-4" />
                                Call
                              </Button>
                          }
                        />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              No astrologers found for {expertise}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
