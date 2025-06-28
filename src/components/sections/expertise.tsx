import { Button } from "@/components/ui/button";
import {
  Heart,
  Briefcase,
  HeartHandshake,
  Hash,
  CircleDollarSign,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ExpertiseItem {
  title: string;
  icon: LucideIcon;
}

const expertiseList: ExpertiseItem[] = [
  {
    title: "Love & Relationship",
    icon: Heart,
  },
  {
    title: "Career & Job",
    icon: Briefcase,
  },
  {
    title: "Married Life",
    icon: HeartHandshake,
  },
  {
    title: "Numerology Services",
    icon: Hash,
  },
  {
    title: "Financial Stability",
    icon: CircleDollarSign,
  },
  {
    title: "Education",
    icon: GraduationCap,
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
            Expertise
          </h2>
          <Link href="/astrologers">
            <Button>View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-8 text-center sm:gap-12 lg:grid-cols-6">
          {expertiseList.map((item) => (
            <Link
              href={`/astrologers/expertise/${encodeURIComponent(item.title)}`}
              key={item.title}
              className="group flex cursor-pointer flex-col items-center gap-2 sm:gap-4"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/30 p-1 transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:bg-primary/5 group-hover:shadow-lg group-hover:shadow-primary/20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary/80">
                  <item.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-foreground/90 sm:text-base">
                {item.title}?
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
