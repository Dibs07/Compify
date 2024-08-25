import Footer from "@/components/common/Footer/Footer";
import Hero from "@/components/common/Hero/hero";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <main className="min-h-screen flex items-center justify-center">
          <Hero />
        </main>
        <Footer />
      </div>
    </>
  );
}
