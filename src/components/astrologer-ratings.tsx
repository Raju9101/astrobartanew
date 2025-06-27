'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface RatingData {
  rating: string;
  reviews: number;
  percentages: number[];
}

const generateRatingData = (): RatingData => {
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

export function AstrologerRatings() {
  const [ratingData, setRatingData] = useState<RatingData | null>(null);

  useEffect(() => {
    // Generate data only on the client-side after initial render
    setRatingData(generateRatingData());
  }, []);

  if (!ratingData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-10 w-16" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span>{5 - i}</span>
                <Star className="w-4 h-4 text-muted" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="w-8 h-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const { rating, reviews, percentages } = ratingData;

  return (
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
  );
}
