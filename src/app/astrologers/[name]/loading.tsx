import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Skeleton } from "@/components/ui/skeleton";
import {
    CalendarDays,
    GraduationCap,
    Languages,
    MapPin,
    ShieldCheck,
} from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <Header />
      <main className="flex-1 py-8 sm:py-12 pb-28 lg:pb-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-lg border p-4 sm:p-6">
                {/* Mobile View Skeleton */}
                <div className="sm:hidden">
                    <div className="flex flex-row items-start gap-3">
                        <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                           <Skeleton className="h-5 w-3/4" />
                           <Skeleton className="h-3 w-1/2" />
                           <Skeleton className="h-4 w-1/3 mt-2" />
                           <div className="text-xs text-muted-foreground mt-3 space-y-1.5">
                               <div className="flex items-center gap-1.5">
                                   <GraduationCap className="w-3.5 h-3.5 text-primary" />
                                   <Skeleton className="h-3 w-20" />
                               </div>
                               <div className="flex items-center gap-1.5">
                                   <Languages className="w-3.5 h-3.5 text-primary" />
                                   <Skeleton className="h-3 w-24" />
                               </div>
                               <div className="flex items-center gap-1.5">
                                   <MapPin className="w-3.5 h-3.5 text-primary" />
                                   <Skeleton className="h-3 w-28" />
                               </div>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Desktop View Skeleton */}
                 <div className="hidden sm:block">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <Skeleton className="w-28 h-28 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-8 w-3/5" />
                            <Skeleton className="h-5 w-2/5" />
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-6 w-28 rounded-full" />
                                <Skeleton className="h-6 w-32 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Languages className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">Language</p>
                                        <Skeleton className="h-4 w-20 mt-1" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">Experience</p>
                                        <Skeleton className="h-4 w-20 mt-1" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">Location</p>
                                        <Skeleton className="h-4 w-24 mt-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="bg-card rounded-lg border p-6">
                <Skeleton className="h-6 w-1/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="hidden lg:block bg-card rounded-lg border p-6">
                 <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
                 <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                 <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-11 w-full rounded-md" />
                    <Skeleton className="h-11 w-full rounded-md" />
                 </div>
              </div>
              <div className="bg-card rounded-lg border p-6">
                 <Skeleton className="h-6 w-1/3 mb-4" />
                 <Skeleton className="h-8 w-1/2 mb-4" />
                 <div className="space-y-2">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                 </div>
              </div>
              <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
                 <ShieldCheck className="w-8 h-8 text-primary" />
                 <div>
                    <p className="font-semibold">Money Back Guarantee</p>
                    <p className="text-sm text-muted-foreground">
                      100% refund if you're not satisfied.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Sticky Bottom Bar Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
