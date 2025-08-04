import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full py-6 md:py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative rounded-lg bg-primary text-black overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-full bg-primary-foreground/10 rounded-full opacity-50"></div>
          <div className="relative z-10 p-8 md:p-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              Welcome To <br /> AstroBarta
            </h1>
            <p className="mt-6 text-base md:text-lg max-w-md">
              <span className="block">Your Trusted Path to Real Astrology.</span>
              <span className="block mt-2 opacity-80">
                Find reliable astrologers you can count on — anytime, anywhere.
              </span>
            </p>
            <div className="mt-8 max-w-md">
              <form className="flex w-full items-center space-x-2 rounded-lg bg-white p-2 shadow-md">
                  <div className="relative flex-grow">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                     <Input
                        type="search"
                        placeholder="Search for an astrologer..."
                        className="w-full border-none pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-base"
                     />
                  </div>
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                    Search
                  </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
