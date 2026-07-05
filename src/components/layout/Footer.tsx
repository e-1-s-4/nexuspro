import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowUpRight } from "lucide-react";

const SOCIAL_LINKS = [
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Dribbble", href: "#" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-muted/30">
      {/* CTA Banner */}
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
              Let&apos;s Work <br />
              <span className="text-accent">Together</span>
            </h3>
            <p className="text-foreground/40 max-w-md">
              Ready to elevate your digital presence? Let&apos;s create something extraordinary.
            </p>
          </div>
          <Magnetic>
            <Link
              href="/contact"
              className="group flex items-center gap-3 text-lg font-bold uppercase tracking-widest hover:text-accent transition-colors"
            >
              Start a Project
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </Magnetic>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-muted/30">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-sm rotate-45" />
              <span className="font-display font-bold text-2xl uppercase tracking-tighter">
                Nexus
              </span>
            </Link>
            <p className="text-foreground/40 text-base max-w-sm mb-8 leading-relaxed">
              Architecting the future of digital interaction. High-end design for
              forward-thinking brands.
            </p>
            {/* Social */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <Magnetic key={social.name}>
                  <a
                    href={social.href}
                    className="px-3 py-1.5 rounded-full border border-muted/50 text-[10px] uppercase tracking-widest font-bold hover:border-accent hover:bg-accent/5 hover:text-accent transition-all duration-300"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.name}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold uppercase tracking-widest text-[10px] mb-6 text-foreground/30">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 hover:text-accent transition-colors w-fit"
                  >
                    <span className="uppercase text-sm font-medium tracking-widest text-foreground/50 group-hover:text-accent">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-display font-bold uppercase tracking-widest text-[10px] mb-6 text-foreground/30">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@nexus-agency.com"
                  className="text-foreground/50 hover:text-accent transition-colors text-sm"
                >
                  hello@nexus-agency.com
                </a>
              </li>
              <li>
                <span className="text-foreground/40 text-sm">+1 (555) 0123 4567</span>
              </li>
              <li>
                <span className="text-foreground/40 text-sm">
                  San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-[10px] text-foreground/30 uppercase tracking-widest">
            &copy; {currentYear} Nexus Digital Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] text-foreground/30 uppercase tracking-widest hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] text-foreground/30 uppercase tracking-widest hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="text-[10px] text-foreground/30 uppercase tracking-widest">
            Designed for Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
