import Hero from "@/components/common/Hero/hero";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero/>
      <Card/>
    </main>
  );
}
