import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AstrologerList } from "@/components/astrologer-list";

export default function AstrologersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <AstrologerList />
      </main>
      <Footer />
    </div>
  );
}
