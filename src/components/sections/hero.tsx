export function Hero() {
  return (
    <section className="w-full py-6 md:py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative rounded-lg bg-primary text-black overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-full bg-primary-foreground/10 rounded-full opacity-50"></div>
          <div className="relative z-10 p-8 md:p-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              Welcome To Astro <br /> Assam
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Check Your Horoscope For Free
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
