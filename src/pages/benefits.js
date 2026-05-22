import Head from "next/head";
import Link from "next/link";

const benefits = [
  "Sharper company priorities",
  "Better leadership communication",
  "Cleaner decision ownership",
  "Weekly execution rhythm",
  "More useful team meetings",
  "Founder time spent on higher-value work",
];

export default function Benefits() {
  return (
    <>
      <Head>
        <title>Benefits</title>
      </Head>
      <main className="min-h-screen bg-[#f7f5ef] text-[#161616]">
        <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 lg:px-12">
          <nav className="flex items-center justify-between border-b border-[#d8d1c2] pb-5">
            <Link href="/home" className="text-xl font-semibold tracking-tight">
              CEO Studio
            </Link>
            <Link className="text-sm font-semibold hover:text-[#7c5234]" href="/home">
              Home
            </Link>
          </nav>

          <div className="py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7c5234]">
              Benefits
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Turn leadership pressure into operating momentum.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d584f]">
              The work is designed to make your next stage of growth feel less
              reactive and more deliberate.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div key={benefit} className="flex gap-5 border border-[#d8d1c2] bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#2f6f68] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-xl font-semibold">{benefit}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5d584f]">
                    A focused system for reducing ambiguity and helping the team
                    make progress without waiting for constant escalation.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
