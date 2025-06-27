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
    title: "Love & Relationship?",
    icon: Heart,
  },
  {
    title: "Career & Job?",
    icon: Briefcase,
  },
  {
    title: "Married Life?",
    icon: HeartHandshake,
  },
  {
    title: "Numerology Services?",
    icon: Hash,
  },
  {
    title: "Financial Stability?",
    icon: CircleDollarSign,
  },
  {
    title: "Education?",
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
          <Button>View All</Button>
        </div>
        <div className="grid grid-cols-3 gap-y-12 gap-x-4 text-center lg:grid-cols-6">
          {expertiseList.map((item) => (
            <Link href="#" key={item.title} className="group flex cursor-pointer flex-col items-center gap-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary/30 p-1 transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:bg-primary/5 group-hover:shadow-lg group-hover:shadow-primary/20">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary/80">
                  <item.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-base font-medium text-foreground/90">{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
