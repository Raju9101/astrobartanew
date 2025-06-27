import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, MessageSquare, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const featuresList: Feature[] = [
  {
    icon: UserCheck,
    title: "Trusted Astrologers",
    description: "Connect with vetted and experienced astrologers for authentic and insightful readings.",
  },
  {
    icon: MessageSquare,
    title: "Personalized Consultations",
    description: "Get one-on-one guidance tailored to your unique birth chart and life questions.",
  },
  {
    icon: CalendarDays,
    title: "Simple & Accessible",
    description: "Easily book and manage your sessions from anywhere, on any device, at any time.",
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Why Choose AstroBarta?</h2>
        <p className="mt-4 text-lg text-foreground/60">Your cosmic journey, simplified and secured.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {featuresList.map((feature, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 transform transition-transform duration-300 hover:scale-105 hover:border-primary/50">
            <CardHeader className="items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              <CardDescription className="pt-2 text-foreground/80">{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
