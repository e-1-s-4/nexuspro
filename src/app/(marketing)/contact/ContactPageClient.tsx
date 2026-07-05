"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-40 md:pt-52 pb-24 md:pb-40 bg-background overflow-hidden relative">
      {/* Background gradient */}
      <div
        className="absolute top-0 right-0 w-[60vw] h-[60vh] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"
        style={{ background: "radial-gradient(circle, rgba(204,255,0,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-10">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-6 block">
                  Get In Touch
                </span>
                <h1 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase italic tracking-tighter leading-none mb-8">
                  Let&apos;s <br />
                  <span className="text-foreground/20 italic">Create.</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground/50 leading-relaxed max-w-md">
                  Have a project in mind? We&apos;d love to hear about your vision and explore how
                  we can bring it to life.
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-8 mt-6">
                {[
                  {
                    icon: Mail,
                    label: "Email Us",
                    value: "hello@nexus-agency.com",
                    href: "mailto:hello@nexus-agency.com",
                  },
                  {
                    icon: Phone,
                    label: "Call Us",
                    value: "+1 (555) 0123 4567",
                    href: "tel:+15550123456",
                  },
                  {
                    icon: MapPin,
                    label: "Visit Us",
                    value: "San Francisco, CA",
                    href: "#",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-14 h-14 rounded-full border border-muted flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-500">
                      <item.icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold mb-1">
                        {item.label}
                      </p>
                      <p className="text-lg font-medium group-hover:text-accent transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-6">
                {["Instagram", "Twitter", "LinkedIn", "Dribbble"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[10px] uppercase tracking-widest border border-muted px-4 py-2.5 rounded-full hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 font-bold"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-muted/5 p-8 md:p-12 lg:p-14 border border-muted/50 min-h-[500px]">
              {!isSubmitted ? (
                <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
                  {[
                    { id: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
                    { id: "email", label: "Your Email", placeholder: "john@example.com", type: "email" },
                    { id: "company", label: "Company (Optional)", placeholder: "Your Company", type: "text" },
                  ].map((field) => (
                    <div key={field.id} className="flex flex-col gap-2">
                      <label
                        htmlFor={field.id}
                        className="text-[10px] uppercase tracking-[0.25em] font-bold text-foreground/40"
                      >
                        {field.label}
                      </label>
                      <input
                        required={field.id !== "company"}
                        type={field.type}
                        id={field.id}
                        placeholder={field.placeholder}
                        className="bg-transparent border-b border-muted py-4 focus:border-accent outline-none transition-colors text-lg placeholder:text-foreground/20"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="budget"
                      className="text-[10px] uppercase tracking-[0.25em] font-bold text-foreground/40"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      className="bg-transparent border-b border-muted py-4 focus:border-accent outline-none transition-colors text-lg text-foreground/60 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-background">Select a range</option>
                      <option value="25-50k" className="bg-background">$25,000 - $50,000</option>
                      <option value="50-100k" className="bg-background">$50,000 - $100,000</option>
                      <option value="100-250k" className="bg-background">$100,000 - $250,000</option>
                      <option value="250k+" className="bg-background">$250,000+</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-[10px] uppercase tracking-[0.25em] font-bold text-foreground/40"
                    >
                      Your Message
                    </label>
                    <textarea
                      required
                      id="message"
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="bg-transparent border-b border-muted py-4 focus:border-accent outline-none transition-colors text-lg resize-none placeholder:text-foreground/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 rounded-full py-6 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center text-center gap-6 py-12"
                >
                  <div className="w-20 h-20 bg-accent text-background rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold uppercase italic tracking-tighter">
                    Message Received
                  </h3>
                  <p className="text-foreground/40 uppercase tracking-widest text-sm max-w-xs">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-full py-6 text-sm px-12"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
