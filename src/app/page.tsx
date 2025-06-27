import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Astrologers } from "@/components/sections/astrologers";
import { AIMatcherSection } from "@/components/sections/ai-matcher-section";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Astrologers />
        <AIMatcherSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
