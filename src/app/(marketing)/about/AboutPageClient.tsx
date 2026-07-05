"use client";

import { motion } from "framer-motion";
import { Services } from "@/components/sections/Services";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { StickyStack } from "@/components/ui/StickyStack";
import { TeamMember } from "@/components/ui/TeamMember";

const TEAM = [
  {
    name: "Alex Morgan",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&auto=format&fit=crop",
    bio: "A visionary creative director with 12+ years in digital design. Alex leads every project with an obsession for craft and a belief that the web is the ultimate creative medium.",
    expertise: ["Creative Direction", "Brand Strategy", "Art Direction"],
    socials: {
      twitter: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Jordan Lee",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&auto=format&fit=crop",
    bio: "Jordan brings editorial precision to every interface. With a background in print design and a love for systems thinking, she creates designs that feel both timeless and cutting-edge.",
    expertise: ["UI/UX Design", "Design Systems", "Typography"],
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Sam Chen",
    role: "Lead Engineer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&auto=format&fit=crop",
    bio: "Sam is an engineering purist who believes performance is a feature. He architects scalable, accessible web applications that push the boundaries of what browsers can do.",
    expertise: ["React/Next.js", "WebGL", "Performance"],
    socials: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Riley Kim",
    role: "Motion Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&auto=format&fit=crop",
    bio: "Riley transforms static designs into living, breathing experiences. Her motion work is rooted in storytelling—every animation serves the narrative and elevates the emotional impact.",
    expertise: ["Motion Design", "3D Animation", "Lottie"],
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
];

const VALUES = [
  {
    title: "Craft First",
    description: "Every pixel, every interaction, every line of code—obsessively refined. We believe the difference between good and great lives in the details most people never notice.",
  },
  {
    title: "Push Boundaries",
    description: "We don't follow trends. We set them through fearless innovation. Every project is an opportunity to prove what the web is capable of.",
  },
  {
    title: "Deep Partnership",
    description: "Your vision is our canvas. We collaborate to elevate it beyond imagination, working alongside your team as creative equals, not vendors.",
  },
  {
    title: "Lasting Impact",
    description: "We build digital experiences that endure and inspire for years to come. Not flashy for the moment—foundational for the future.",
  },
];

export default function AboutPageClient() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="pt-40 md:pt-52 pb-24 md:pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-8 block">
              About Nexus
            </span>
            <h1 className="text-[clamp(3rem,9vw,8rem)] font-black uppercase italic tracking-tighter leading-none mb-12">
              The Intersection of <br />
              <span className="text-foreground/20 italic">Art & Code.</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/70">
                We are a team of visionary designers and engineering purists who believe that
                digital products should be as beautiful as they are functional.
              </p>
              <div className="flex flex-col gap-6 text-foreground/50 text-base md:text-lg">
                <p>
                  Founded in 2021, Nexus was born out of a desire to break the mold of
                  corporate digital design. We partner with companies that want to make a
                  statement and define the future of their industry.
                </p>
                <p>
                  Our process is immersive, research-driven, and focused on creating
                  emotional connections through high-end digital experiences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Studio Image */}
      <section className="pb-24 md:pb-40">
        <div className="container mx-auto px-6 md:px-12">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
            alt="Nexus Studio"
            aspectRatio="aspect-[21/9]"
            className="opacity-60"
          />
        </div>
      </section>

      {/* Values — Sticky Stack */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
              Our Philosophy
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              Core <span className="text-foreground/20 italic">Values</span>
            </h2>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          <StickyStack
            cards={VALUES.map((v) => ({
              title: v.title,
              description: v.description,
            }))}
          />
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
              The Team
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              Meet <span className="text-foreground/20 italic">The Minds</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TEAM.map((member, i) => (
              <TeamMember
                key={member.name}
                {...member}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <Services />
    </div>
  );
}
