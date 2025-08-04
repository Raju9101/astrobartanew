import Link from "next/link";
import { Star } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="AstroBarta Home">
      <span className="text-xl font-bold text-black">
        AstroBarta
      </span>
    </Link>
  );
}
