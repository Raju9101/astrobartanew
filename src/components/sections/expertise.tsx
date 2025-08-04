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
    title: "Love",
    icon: Heart,
  },
  {
    title: "Career",
    icon: Briefcase,
  },
  {
    title: "Marriage",
    icon: HeartHandshake,
  },
  {
    title: "Numerology",
    icon: Hash,
  },
  {
    title: "Finance",
    icon: CircleDollarSign,
  },
  {
    title: "Education",
    icon: GraduationCap,
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="bg-background pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Expertise
          </h2>
          <Link href="/astrologers">
            <Button variant="link" className="text-primary">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center sm:gap-8 lg:grid-cols-6">
          {expertiseList.map((item) => (
            <Link
              href={`/astrologers/expertise/${encodeURIComponent(item.title)}`}
              key={item.title}
              className="group flex cursor-pointer flex-col items-center gap-3 sm:gap-4"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 p-1 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/30 sm:h-24 sm:w-24">
                  <item.icon className="h-9 w-9 text-primary transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10" />
              </div>
              <h3 className="text-sm font-semibold text-foreground/90 sm:text-base">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
