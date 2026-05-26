import Head from "next/head";


export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — CEO Square</title>
      </Head>
      <main className="min-h-screen bg-[#070706] pt-24 text-white">
        <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
          <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Join CEO Square
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
                Be among the first to join.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                CEO Square is arriving in Dubai. Share your details and we will reach out with exclusive early access to the world&apos;s most powerful entrepreneurial ecosystem.
              </p>
            </div>
            <form className="space-y-5 border border-white/10 bg-white/[0.03] p-6 text-white">
              <div>
                <label className="text-sm font-semibold text-white/80" htmlFor="name">Name</label>
                <input id="name" className="mt-2 h-12 w-full border border-white/10 bg-transparent px-4 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white/80" htmlFor="email">Email</label>
                <input id="email" type="email" className="mt-2 h-12 w-full border border-white/10 bg-transparent px-4 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white/80" htmlFor="role">Your Role</label>
                <input id="role" className="mt-2 h-12 w-full border border-white/10 bg-transparent px-4 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30" placeholder="Founder, CEO, Investor…" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white/80" htmlFor="message">What are you building?</label>
                <textarea id="message" rows="4" className="mt-2 w-full border border-white/10 bg-transparent px-4 py-3 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30" placeholder="Tell us about your vision." />
              </div>
              <button className="h-12 w-full bg-[#D4AF37] px-6 text-sm font-semibold text-black transition hover:opacity-85" type="submit">
                Request early access
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
