import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiSend, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

// Sophisticated Scroll Reveal Variants
const smoothReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const frameGlow = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
  }
};

export default function LuxuryMinimalContact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  const menuItems = ["HOME", "PAGES", "SERVICES", "SHOP", "BLOG", "CONTACTS"];

  const footerCompanyLinks = ["About", "Expertise", "Sustainability", "News & Media", "Team", "Contacts"];
  const footerServicesLinks = ["Deep learning solutions", "Development", "Model evaluation", "Data Science Consult", "Neural integration", "Real-time prediction"];

  return (
    <>
      <Head>
        <title>Contacts // Neural Networks</title>
      </Head>

      <main className="min-h-screen bg-[#0A0A0A] text-[#E5E2DA] font-sans antialiased selection:bg-[#D4AF37]/20 selection:text-[#D4AF37] p-4 sm:p-8 lg:p-12 relative overflow-x-hidden">
        
        {/* TOP ACCENT DECORATIVE GRADIENT LINE */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#AA7C11]" />

        <div className="max-w-6xl mx-auto space-y-16">

          {/* HEADER LAYER */}
          <nav className="flex items-center justify-between py-6 border-b border-white/5 relative">
            <motion.div 
              variants={frameGlow}
              className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-[#D4AF37]/40 via-transparent to-transparent origin-left"
            />
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37]">[ Neural Networks ]</span>
            </div>
            <div className="flex items-center gap-6">
              {menuItems.map((item) => (
                <a key={item} href="#" className={`text-[11px] font-mono uppercase tracking-wider ${item === 'CONTACTS' ? 'text-[#D4AF37]' : 'text-[#E5E2DA]/80'} hover:text-white transition-colors`}>
                  {item}
                </a>
              ))}
            </div>
            <button className="h-10 px-6 bg-[#E5E2DA] text-[#111111] font-mono text-[11px] uppercase tracking-wider font-semibold hover:bg-white transition-colors">
              Get in touch
            </button>
          </nav>
          
          {/* HERO TITLE SECTION */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={smoothReveal}
            className="pb-16"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-light tracking-tight text-white leading-none">
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#AA7C11] font-normal drop-shadow-sm">
                Contacts
              </span>
            </h1>
          </motion.section>

          {/* SPLIT LAYOUT CORE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch">
            
            {/* LEFT FRAME: CONTACT PATHS */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={smoothReveal}
              className="lg:col-span-5 flex flex-col justify-between space-y-12"
            >
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">01 / Introduction</span>
                  <h2 className="text-3xl font-light tracking-tight text-white leading-tight">We are always ready to help you and answer your questions</h2>
                </div>

                <p className="text-sm text-[#E5E2DA]/60 font-light leading-relaxed max-w-sm">
                  Pacific hake false trevally queen parrotfish black prickleback mosshead warbonnet sweeper! Greenling sleeper.
                </p>

                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/5">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]/80">Call Center</span>
                    <p className="text-xs text-[#E5E2DA]/70 font-light leading-relaxed">800 100 975 20 34<br/>+ (123) 1800 - 234 - 5678</p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]/80">Our Location</span>
                    <p className="text-xs text-[#E5E2DA]/70 font-light leading-relaxed">USA, New York - 1060<br/>Str. First Avenue 1</p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]/80">Email</span>
                    <p className="text-xs text-[#E5E2DA]/70 font-light">neurosn@mail.co</p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]/80">Social network</span>
                    <div className="flex gap-4">
                      {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, idx) => (
                        <a key={idx} href="#" className="text-white/60 hover:text-[#D4AF37] transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* RIGHT FRAME: INTAKE FORM */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={smoothReveal}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-2 border-b border-white/5 pb-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">02 / Transmission Path</span>
                    <h2 className="text-2xl font-light tracking-tight text-white leading-tight">Get in Touch</h2>
                  </div>

                  <p className="text-sm text-[#E5E2DA]/60 font-light max-w-lg leading-relaxed">Define your goals and identify areas where AI can add value to your business</p>

                  <div className="space-y-10">
                    {/* Input Nodes Identity */}
                    {[
                      { id: "name", label: "Full identity name", placeholder: "e.g. J. SMITH" },
                      { id: "email", label: "Secure email coordinate", placeholder: "name@domain.com" },
                      { id: "subject", label: "Subject matrix", placeholder: "Nature of inquiry" }
                    ].map((field) => (
                      <div key={field.id} className="flex flex-col space-y-2 relative group">
                        <label htmlFor={field.id} className="text-[11px] font-mono uppercase tracking-wider text-[#E5E2DA]/40 group-focus-within:text-[#D4AF37] transition-colors font-semibold">
                          {field.label}
                        </label>
                        <input 
                          id={field.id}
                          type={field.id === 'email' ? 'email' : 'text'} 
                          required 
                          placeholder={field.placeholder}
                          value={form[field.id]}
                          onChange={(e) => setForm({...form, [field.id]: e.target.value})}
                          className="h-12 bg-transparent border-b border-white/5 text-white outline-none focus:border-[#D4AF37] placeholder:text-white/10 text-base font-light rounded-none transition-colors"
                        />
                        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    ))}

                    {/* Input Node Message */}
                    <div className="flex flex-col space-y-2 relative group">
                      <label htmlFor="message" className="text-[11px] font-mono uppercase tracking-wider text-[#E5E2DA]/40 group-focus-within:text-[#D4AF37] transition-colors font-semibold">
                        Message Summary
                      </label>
                      <textarea 
                        id="message"
                        rows="3" 
                        required 
                        placeholder="Detail objectives, scope matrix, or floor optimization timelines..."
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                        className="resize-none bg-transparent py-2 border-b border-white/5 text-white outline-none focus:border-[#D4AF37] placeholder:text-white/10 text-base font-light rounded-none transition-colors leading-relaxed"
                      />
                      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </div>

                  {/* Gradient-bordered Button Layout */}
                  <div className="relative p-[1px] inline-block bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#AA7C11] group active:scale-[0.99] transition-transform">
                    <button 
                      type="submit"
                      className="bg-[#0A0A0A] text-white hover:text-black hover:bg-gradient-to-r hover:from-[#B8860B] hover:via-[#D4AF37] hover:to-[#AA7C11] px-10 h-14 font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 rounded-none flex items-center gap-3"
                    >
                      Transmit Dispatch Secured <FiSend className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                /* SUCCESS STATE */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative p-[2px] bg-gradient-to-br from-[#B8860B] via-[#D4AF37] to-[#AA7C11]"
                >
                  <div className="bg-[#0F0F0F] p-8 sm:p-12 space-y-6 text-center">
                    <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                      <FiCheck className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-3xl text-white font-serif tracking-tight font-light">Dispatch Secured.</h3>
                      <p className="text-sm text-[#E5E2DA]/60 font-light leading-relaxed max-w-md mx-auto">
                        Thank you for your transmission. The inquiry from <span className="text-white font-medium underline decoration-[#D4AF37]">{form.name}</span> has reached our desk. Protocols initiate within 12 hours.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button 
                        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                        className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] border-b border-[#D4AF37]/30 pb-0.5 hover:text-white hover:border-white transition-colors"
                      >
                        Reset Ledger Field
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

          </div>

          {/* GEOSPATIAL MAP NODE */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={smoothReveal}
            className="space-y-3 pt-6"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E5E2DA]/40">[ Geospatial Map Node // London Eye ]</span>
            
            {/* 1px Golden Gradient Border Wrapper */}
            <div className="relative p-[1px] bg-gradient-to-br from-[#B8860B]/30 via-transparent to-[#AA7C11]/20 group transition-all duration-500 hover:from-[#B8860B]/60 hover:to-[#AA7C11]/50">
              <div className="w-full h-80 border border-white/5 relative filter grayscale invert contrast-125 opacity-30 group-hover:opacity-80 transition-opacity duration-700 bg-[#0F0F0F]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.6459345794833!2d-0.12136322304913223!3d51.5033005718105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409f92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2suk!4v1714241728269!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="London Eye Map Node"
                />
              </div>
            </div>
          </motion.div>

          {/* FOOTER SECTION */}
    

        </div>
      </main>
    </>
  );
}