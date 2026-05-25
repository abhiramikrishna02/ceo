import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";

const navLinks = [
  { label: "Home", href: "/home", isActive: true },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export default function HomeHeroSection() {
  return (
    <ResponsiveHeroBanner
      badgeLabel="New"
      badgeText="First Commercial Flight to Mars 2026"
      title="Journey Beyond Earth"
      titleLine2="Into the Cosmos"
      description="Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable."
      primaryButtonText="Book Your Journey"
      primaryButtonHref="#"
      secondaryButtonText="Watch Launch"
      secondaryButtonHref="#"
      ctaButtonText=""
      ctaButtonHref=""
      partnersTitle="Partnering with leading space agencies worldwide"
      logoUrl="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/febf2421-4a9a-42d6-871d-ff4f9518021c_1600w.png"
      backgroundImageUrl="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg"
      navLinks={navLinks}
      partners={[
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f7466370-2832-4fdd-84c2-0932bb0dd850_800w.png",
          href: "#",
        },
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0a9a71ec-268b-4689-a510-56f57e9d4f13_1600w.png",
          href: "#",
        },
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a9ed4369-748a-49f8-9995-55d6c876bbff_1600w.png",
          href: "#",
        },
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0d8966a4-8525-4e11-9d5d-2d7390b2c798_1600w.png",
          href: "#",
        },
        {
          logoUrl:
            "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2ed33c8b-b8b2-4176-967f-3d785fed07d8_1600w.png",
          href: "#",
        },
      ]}
    />
  );
}
import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <nav className="relative z-10 flex justify-center pt-8">
        <div className="flex items-center gap-12 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
          <span className="font-bold text-xl tracking-tight">SecuNet</span>
          <div className="flex gap-8 text-sm opacity-80">
            <a href="#" className="hover:text-green-400">Home</a>
            <a href="#" className="hover:text-green-400">Services</a>
            <a href="#" className="hover:text-green-400">Blog</a>
            <a href="#" className="hover:text-green-400">About</a>
          </div>
          <div className="flex gap-4">
            <button className="text-sm">Login</button>
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-400 transition">Signup</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center pt-24 text-center px-4">
        <h1 className="text-6xl font-bold mb-6">
          Ensuring Your <br /> Network's <span className="text-green-400">Safety</span>
        </h1>
        <p className="max-w-md opacity-70 mb-10">
          SecuNet's advanced data encryption is a critical component of its network security solution.
        </p>
        
        <div className="flex gap-6 items-center">
          <button className="bg-green-400 text-black px-8 py-3 rounded-full font-bold hover:bg-white transition">
            Get Started
          </button>
          <a href="#" className="hover:underline">Learn more →</a>
        </div>

        {/* Placeholder for the Lock Icon/Graphics */}
        <div className="mt-20 w-48 h-48 border-2 border-white/20 rounded-2xl flex items-center justify-center bg-white/5">
           <span className="text-white/30 text-xs">Lock Visual Here</span>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;