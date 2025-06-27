import Link from "next/link";
import { Star } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="AstroBarta Home">
      <Star className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient">
        AstroBarta
      </span>
    </Link>
  );
}
