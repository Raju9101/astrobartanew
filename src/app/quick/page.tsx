// This is a new file created by App Prototyper.
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, CalendarDays, ArrowRight } from "lucide-react";
import { CallRequestDialog } from "@/components/call-request-dialog";
import Link from "next/link";


export default function QuickPage() {
    // A dummy astrologer object for the booking dialog.
    // In a real app, you might fetch a featured astrologer or let the user choose.
    const dummyAstrologer = {
        id: 1,
        name: "a featured astrologer"
    };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto max-w-2xl px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
                    Quick Actions
                </h1>
                <p className="mt-3 text-lg text-foreground/60">
                    Get instant access to what you need.
                </p>
            </div>
            <div className="space-y-4">
                 <Card className="hover:border-primary/50 hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Phone className="w-6 h-6 text-primary" />
                            <span>Request a Call</span>
                        </CardTitle>
                        <CardDescription>
                            Need to talk to someone right away? Get a call back from an available astrologer.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <CallRequestDialog
                            trigger={
                               <Button className="w-full sm:w-auto">
                                    Get a Callback <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            }
                        />
                    </CardContent>
                </Card>
                 <Card className="hover:border-primary/50 hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                           <CalendarDays className="w-6 h-6 text-primary" />
                           <span>View All Astrologers</span>
                        </CardTitle>
                        <CardDescription>
                            Browse our list of expert astrologers and book a session with the one that's right for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/astrologers">
                            <Button className="w-full sm:w-auto">
                                Find an Astrologer <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
