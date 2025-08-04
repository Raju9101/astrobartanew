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
          </div>
        </div>
      </div>
    </section>
  );
}
