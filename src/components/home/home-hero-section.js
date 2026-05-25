import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";

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
      partnersTitle="Partnering with leading space agencies worldwide"
      backgroundImageUrl="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg"
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
