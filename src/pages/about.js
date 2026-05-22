import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <main className="min-h-screen bg-white text-[#161616]">
        <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 lg:px-12">
          <nav className="flex items-center justify-between border-b border-zinc-200 pb-5">
            <Link href="/home" className="text-xl font-semibold tracking-tight">
              CEO Studio
            </Link>
            <Link className="text-sm font-semibold hover:text-[#7c5234]" href="/home">
              Home
            </Link>
          </nav>

          <div className="grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2f6f68]">
                About
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
                Built for leaders who are moving fast.
              </h1>
            </div>
            <div className="space-y-6 text-lg leading-8 text-zinc-700">
              <p>
                CEO Studio brings structure to the moments when growth gets
                noisy. We work with founders and senior teams to clarify the
                strategy, tighten priorities, and make execution easier to trust.
              </p>
              <p>
                The approach is practical and direct: fewer vague workshops,
                more useful decisions, cleaner operating rhythms, and a plan
                your team can actually use on Monday morning.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {["Clarity", "Cadence", "Confidence"].map((item) => (
              <div key={item} className="border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold">{item}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Simple leadership systems that help teams choose, communicate,
                  and execute with less friction.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
