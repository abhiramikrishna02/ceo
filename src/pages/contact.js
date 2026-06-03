import Head from "next/head";
import { useEffect, useState } from "react";

const contactInbox = "ceosquareofficial@gmail.com";

const initialFormState = {
  name: "",
  email: "",
  role: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const resetAfterGmailReturn = () => {
      if (sessionStorage.getItem("ceoSquareContactSent") === "true") {
        setFormData(initialFormState);
        sessionStorage.removeItem("ceoSquareContactSent");
      }

      setIsSubmitting(false);
    };

    window.addEventListener("pageshow", resetAfterGmailReturn);

    return () => {
      window.removeEventListener("pageshow", resetAfterGmailReturn);
    };
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanRole = formData.role.trim() || "Not provided";
    const cleanMessage = formData.message.trim();

    const subject = `CEO Square early access request from ${cleanName}`;
    const body = [
      "New CEO Square contact request",
      "",
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Role: ${cleanRole}`,
      "",
      "Message:",
      cleanMessage,
    ].join("\n");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactInbox)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    sessionStorage.setItem("ceoSquareContactSent", "true");
    window.location.assign(gmailUrl);
  };

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
            <form className="space-y-5 border border-white/10 bg-white/[0.03] p-6 text-white" autoComplete="off" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-semibold text-white/80" htmlFor="name">Name</label>
                <input id="name" name="name" value={formData.name} onChange={updateField} required autoComplete="off" className="mt-2 h-12 w-full border border-white/10 bg-transparent px-4 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white/80" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={updateField} required autoComplete="off" className="mt-2 h-12 w-full border border-white/10 bg-transparent px-4 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white/80" htmlFor="role">Your Role</label>
                <input id="role" name="role" value={formData.role} onChange={updateField} autoComplete="off" className="mt-2 h-12 w-full border border-white/10 bg-transparent px-4 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30" placeholder="Founder, CEO, Investor..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-white/80" htmlFor="message">What are you building?</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={updateField} required className="mt-2 w-full border border-white/10 bg-transparent px-4 py-3 outline-none focus:border-[#D4AF37] text-white placeholder:text-white/30" placeholder="Tell us about your vision." />
              </div>
              <button className="h-12 w-full bg-[#D4AF37] px-6 text-sm font-semibold text-black transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Opening Gmail..." : "Open Gmail to send request"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
