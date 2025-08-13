import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShopPage } from "@/components/shop-page";

export default function Shop() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ShopPage />
      </main>
      <Footer />
    </div>
  );
}
