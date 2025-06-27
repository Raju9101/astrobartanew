import { AIMatcherForm } from "@/components/ai-matcher-form";

export function AIMatcherSection() {
  return (
    <section id="ai-matcher" className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
          <span className="bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient">
            Find Your Perfect Astrologer
          </span>
        </h2>
        <p className="mt-4 text-lg text-foreground/60 max-w-2xl mx-auto">
          Not sure who to choose? Describe your question or area of interest, and our AI will recommend the best astrologer for your needs.
        </p>
      </div>
      <AIMatcherForm />
    </section>
  );
}
