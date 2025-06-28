import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExpertiseAstrologerList } from "@/components/expertise-astrologer-list";

export default function AstrologersByExpertisePage({
  params,
}: {
  params: { expertise: string };
}) {
  const expertiseName = decodeURIComponent(params.expertise);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ExpertiseAstrologerList expertise={expertiseName} />
      </main>
      <Footer />
    </div>
  );
}
