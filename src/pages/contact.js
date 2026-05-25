import Head from "next/head";

import SiteNavbar from "@/components/layout/site-navbar";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <SiteNavbar />
      <main className="min-h-screen bg-[#161616] pt-24 text-white">
        <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">

          <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e6b35a]">
                Contact
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
                Let us talk about the next move.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Share a little about the company, the challenge, and what you
                want to unlock. We will reply with a practical next step.
              </p>
            </div>

            <form className="space-y-5 border border-white/15 bg-white p-6 text-[#161616]">
              <div>
                <label className="text-sm font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="mt-2 h-12 w-full border border-zinc-300 px-4 outline-none focus:border-[#2f6f68]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 h-12 w-full border border-zinc-300 px-4 outline-none focus:border-[#2f6f68]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="mt-2 w-full border border-zinc-300 px-4 py-3 outline-none focus:border-[#2f6f68]"
                  placeholder="Tell us what you are building."
                />
              </div>
              <button
                className="h-12 w-full bg-[#2f6f68] px-6 text-sm font-semibold text-white transition hover:bg-[#245851]"
                type="submit"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
