import Head from "next/head";
import HomeHeroSection from "@/components/home/home-hero-section";
import HomeOfferSection from "@/components/home/home-offer-section";
import SiteNavbar from "@/components/layout/site-navbar";
import {
  BenefitsGridSection,
  CommunityBenefitsBlock,
  CTASection,
  GlobalStyle,
  Particles,
  QuotesSection,
  StatsSection,
  StatementSection,
  StorySection,
} from "@/pages/benefits";

export default function Home() {
  return (
    <>
      <Head>
        <title>CEO2 | Home</title>
      </Head>

      <GlobalStyle />
      <div className="noise-overlay" />
      <Particles />
      <SiteNavbar />

      <main className="relative z-10 bg-black text-white">
        <HomeHeroSection />
        <HomeOfferSection />
        <CommunityBenefitsBlock />
        <StatementSection />
        <BenefitsGridSection />
        <StatsSection />
        <StorySection />
        <QuotesSection />
        <CTASection />
      </main>
    </>
  );
}
