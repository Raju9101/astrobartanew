"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
  Search,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Astrologer {
  id: number;
  name: string;
  experience: string;
  language: string;
  expertise: string;
  profile_image: string;
}

export function AstrologerList() {
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [filteredAstrologers, setFilteredAstrologers] = useState<Astrologer[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.astrobarta.com/get_astrologer.php",
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          console.error("Failed to fetch astrologers:", res.statusText);
          setAstrologers([]);
          setFilteredAstrologers([]);
          return;
        }
        const data = await res.json();
        const astrologerData = data.data || [];
        setAstrologers(astrologerData);
        setFilteredAstrologers(astrologerData);
      } catch (error) {
        console.error("Error fetching astrologers:", error);
        setAstrologers([]);
        setFilteredAstrologers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAstrologers();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = astrologers.filter(
      (astrologer) =>
        astrologer.name.toLowerCase().includes(lowercasedQuery) ||
        astrologer.expertise.toLowerCase().includes(lowercasedQuery) ||
        astrologer.language.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredAstrologers(filtered);
  }, [searchQuery, astrologers]);

  return (
    <section id="astrologers-list" className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
            Find Your Astrologer
          </h1>
          <p className="mt-4 text-lg text-foreground/60">
            Search for an expert by name, expertise, or language.
          </p>
        </div>
        <div className="mb-8 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search astrologers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-base"
            />
          </div>
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
                <Link href={`/astrologers/${encodeURIComponent(astrologer.name)}`} key={astrologer.id}>
                  <Card
                    className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
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
                                {astrologer.experience}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Award className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
                                {astrologer.expertise}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 text-primary border-primary hover:bg-primary/10 hover:text-primary whitespace-nowrap"
                        >
                          + Follow
                        </Button>
                      </div>

                      <Separator className="my-4 bg-border/50" />

                      <div className="flex justify-end items-center">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="text-primary border-primary hover:bg-primary/10 hover:text-primary"
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            Book
                          </Button>
                          <Button
                            variant="outline"
                            className="text-primary border-primary hover:bg-primary/10 hover:text-primary"
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              No astrologers found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
