import Head from "next/head";
import HomeAuthoritySection from "@/components/home/home-authority-section";
import HomeClosingSection from "@/components/home/home-closing-section";
import HomeHeroSection from "@/components/home/home-hero-section";
import HomeOfferSection from "@/components/home/home-offer-section";
import HomeOrbitalSection from "@/components/home/home-orbital-section";

export default function Home() {
  return (
    <>
      <Head>
        <title>CEO2 | Home</title>
      </Head>

      <main className="bg-black text-white">
        <HomeHeroSection />
        <HomeOrbitalSection />
        <HomeAuthoritySection />
        <HomeOfferSection />
        <HomeClosingSection />
      </main>
    </>
  );
}
