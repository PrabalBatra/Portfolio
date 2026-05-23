import React, { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../Reveal";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { SectionDissolve } from "../SectionDissolve";
import { CosmicBackdrop } from "../CosmicBackdrop";

function ContactForm({ formspreeId }: { formspreeId: string }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Spatial Systems", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    console.log("Submit initiated to Formspree endpoint: https://formspree.io/f/xredzdqg", formData);
    try {
      const response = await fetch("https://formspree.io/f/xredzdqg", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "Spatial Systems", message: "" });
      } else {
        const data = await response.json();
        setErrorMessage(data.errors?.[0]?.message || "Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network issue detected. Please check your internet connection.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-cyan-500/30 bg-[#0d0b12]/80 backdrop-blur-lg p-8 shadow-2xl space-y-6 text-left max-w-xl mx-auto">
        <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs tracking-widest pb-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>MESSAGE SENT SUCCESSFULLY</span>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-light text-white tracking-tight">Thank You!</h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-light">
            Your message has been sent successfully. Prabal Batra has received your submission through Formspree and will reply to you as soon as possible.
          </p>
          <div className="rounded-lg bg-cyan-950/20 border border-cyan-500/20 p-4 font-mono text-[10px] space-y-1 text-cyan-300">
            <div>&gt; STATUS: MESSAGE DELIVERED</div>
            <div>&gt; TARGET: PRABAL BATRA</div>
            <div>&gt; ROUTE: FORMSPREE SECURED</div>
          </div>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="w-full py-3.5 rounded-full bg-cyan-500 text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#0d0b12]/80 backdrop-blur-lg p-8 shadow-2xl space-y-6 text-left max-w-xl mx-auto">
      <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs tracking-widest pb-3 border-b border-white/10">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>SEND A MESSAGE</span>
      </div>

      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-950/20 border border-red-500/20 text-xs font-mono text-red-400">
          &gt; ERROR: {errorMessage}
        </div>
      )}

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="[ENTER YOUR FULL NAME]"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-cyan-500/50 focus:outline-none transition-all focus:bg-white/[0.05]"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="[ENTER YOUR CONTACT EMAIL]"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-cyan-500/50 focus:outline-none transition-all focus:bg-white/[0.05]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-[#0d0b12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-all focus:bg-white/[0.05]"
          >
            <option value="Spatial Systems" className="bg-[#0d0b12] text-white">Geospatial AI & Spatial Systems</option>
            <option value="Autonomous Agents" className="bg-[#0d0b12] text-white">LangGraph & Autonomous Agents</option>
            <option value="Deep Learning & Vision" className="bg-[#0d0b12] text-white">Deep Learning & Vision</option>
            <option value="General Collaboration" className="bg-[#0d0b12] text-white">General Collaboration</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Message</label>
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="[TYPE YOUR MESSAGE BELOW]"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-cyan-500/50 focus:outline-none transition-all focus:bg-white/[0.05] resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 rounded-full bg-primary text-primary-foreground font-mono text-xs font-bold tracking-widest uppercase hover:shadow-[0_0_25px_#38bdf8] hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <span className="w-3 h-3 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <span>Send Message</span>
        )}
      </button>
    </form>
  );
}

export function Contact() {
  const { links, metadata } = usePortfolioData();

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden bg-[#04060b]">
      {/* Dynamic Cosmic Space Backdrop (GPU composite-accelerated, lag-free) */}
      <CosmicBackdrop />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <SectionDissolve className="max-w-6xl mx-auto z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-start text-left">
          {/* Left Column: Title & Info */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <div className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono">Final Scene · 07</div>
            </Reveal>
            
            <Reveal delay={0.1} variant="dissolve">
              <h2 className="text-5xl md:text-7xl font-light leading-[0.95] tracking-tighter text-white">
                Let&apos;s build
                <br />
                <span className="italic font-extralight text-gradient text-glow">the future</span>.
              </h2>
            </Reveal>
            
            <Reveal delay={0.2} variant="dissolve">
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                Interested in AI, geospatial intelligence, multi-agent systems, or intelligent automation? Let&apos;s create something impactful.
              </p>
            </Reveal>

            <Reveal delay={0.3} variant="dissolve">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-sm font-mono text-cyan-300">TELEMETRY LINK ACTIVE</span>
                </div>
                <div className="text-sm font-mono text-muted-foreground bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-1.5 shadow-lg">
                  <div><span className="text-white/40">PHONE:</span> +91 9413829248</div>
                  <div><span className="text-white/40">EMAIL:</span> {links.email || "batraprabal04@gmail.com"}</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4} variant="dissolve">
              <div className="flex flex-wrap gap-3">
                {[
                  { l: "Email", h: `mailto:${links.email || "batraprabal04@gmail.com"}` },
                  { l: "LinkedIn", h: "https://www.linkedin.com/in/prabal-batra" },
                  { l: "GitHub", h: links.github || "https://github.com/prabal-batra" },
                  { l: "Resume PDF", h: links.resume_PDF || "/Prabal Batra Resume (1).pdf" }
                ].map((b, i) => (
                  <a
                    key={b.l}
                    href={b.h}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative px-5 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-500 font-mono flex items-center gap-2 shadow-lg ${
                      i === 0
                        ? "bg-primary text-primary-foreground hover:shadow-[0_0_25px_#38bdf8] hover:scale-105"
                        : "glass hover:border-primary/50 text-white hover:text-cyan-300 hover:scale-105"
                    }`}
                  >
                    <span className="relative z-10">{b.l}</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <Reveal delay={0.3} variant="dissolve">
              <ContactForm formspreeId={links.formspree_ID || "xredzdqg"} />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.7}>
          <div className="mt-24 pt-8 border-t border-white/5 text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-mono text-center">
            Designed &amp; Engineered by {metadata.userName || "Prabal Batra"} · 2026
          </div>
        </Reveal>
      </SectionDissolve>
    </section>
  );
}
