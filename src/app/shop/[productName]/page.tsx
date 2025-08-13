// This is a new file created by App Prototyper.
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductDetailPage } from "@/components/product-detail-page";
import { notFound } from "next/navigation";


// In a real app, you would fetch product data based on the slug
const products = [
    {
      slug: "raw-pyrite-bracelet",
      name: "Raw Pyrite Bracelet",
    }
  ];

export default function ProductPage({ params }: { params: { productName: string } }) {
    const product = products.find(p => p.slug === params.productName);

    if (!product) {
        notFound();
    }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-4 sm:py-8">
        <ProductDetailPage product={product} />
      </main>
      <Footer />
    </div>
  );
}
