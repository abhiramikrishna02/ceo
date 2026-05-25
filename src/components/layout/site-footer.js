import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">CEO Square</p>
            <p className="max-w-md text-sm leading-6 text-neutral-300">
              Premium digital strategy, bespoke UI systems, and immersive motion design for visionary brands navigating the next phase of growth.
            </p>
          </div>

          <div className="grid gap-4 text-sm text-neutral-300">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">Explore</h3>
            <Link href="/home" className="transition hover:text-white">Home</Link>
            <Link href="/about" className="transition hover:text-white">About</Link>
            <Link href="/benefits" className="transition hover:text-white">Benefits</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>

          <div className="grid gap-4 text-sm text-neutral-300">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">Contact</h3>
            <a href="mailto:hello@ceosquare.com" className="transition hover:text-white">hello@ceosquare.com</a>
            <a href="tel:+18005551234" className="transition hover:text-white">+1 (800) 555-1234</a>
            <p className="text-sm text-neutral-500">123 Stellar Avenue, Suite 900<br/>Mumbai, MH 400001</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/5 pt-6 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} CEO Square. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms of Service</Link>
            <Link href="/sitemap.xml" className="transition hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
