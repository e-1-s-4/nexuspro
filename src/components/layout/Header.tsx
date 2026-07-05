"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled ? "py-3 bg-background/80 backdrop-blur-md border-b border-muted/30" : "py-6 md:py-8"
      )}
      role="banner"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left z-10"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 relative z-[60]"
          aria-label="Nexus - Home"
        >
          <div className="w-8 h-8 bg-accent rounded-sm rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">
            Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors relative py-2",
                  pathname === link.href
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </Magnetic>
          ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:block">
          <Magnetic>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-widest border border-accent/40 px-5 py-2.5 rounded-full hover:bg-accent hover:text-background transition-all duration-300 font-bold"
            >
              Let&apos;s Talk
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="relative z-[60] group flex flex-col items-end gap-1.5 md:hidden w-10 h-10 justify-center"
        >
          <span
            className={cn(
              "w-7 h-[2px] bg-foreground transition-all duration-500 origin-center",
              isOpen && "-rotate-45 translate-y-[8px] bg-background"
            )}
          />
          <span
            className={cn(
              "w-5 h-[2px] bg-foreground transition-all duration-500",
              isOpen && "opacity-0 scale-0"
            )}
          />
          <span
            className={cn(
              "w-7 h-[2px] bg-foreground transition-all duration-500 origin-center",
              isOpen && "rotate-45 -translate-y-[8px] bg-background"
            )}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-accent text-background z-50 flex flex-col justify-between py-12 px-8 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Top section */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-background rounded-sm rotate-45" />
                  <span className="font-display font-bold text-2xl tracking-tighter uppercase text-background">
                    Nexus
                  </span>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-5xl font-display font-black uppercase italic tracking-tighter hover:text-background/70 transition-colors block",
                        pathname === link.href ? "text-background" : "text-background/50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <a
                  href="mailto:hello@nexus-agency.com"
                  className="text-sm uppercase tracking-widest text-background/60 hover:text-background transition-colors"
                >
                  hello@nexus-agency.com
                </a>
                <p className="text-xs uppercase tracking-widest text-background/40">
                  San Francisco, CA
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
