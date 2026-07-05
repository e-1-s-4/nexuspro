"use client";

import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  asChild?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
  asChild = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 uppercase tracking-widest font-bold cursor-pointer group";

  const variants = {
    primary:
      "bg-accent text-background border border-accent hover:bg-transparent hover:text-accent",
    secondary:
      "bg-foreground text-background border border-foreground hover:bg-transparent hover:text-foreground",
    outline:
      "border border-muted hover:border-accent hover:text-accent bg-transparent",
    ghost: "text-foreground hover:text-accent bg-transparent",
  };

  const sizes = {
    sm: "text-[10px] py-2 px-4",
    md: "text-xs py-4 px-8",
    lg: "text-sm py-5 px-10",
  };

  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </span>
      {/* Shimmer effect on hover */}
      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
    </>
  );

  if (asChild) {
    return (
      <Magnetic>
        <span
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
          )}
          {...(props as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {buttonContent}
        </span>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <motion.button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        whileTap={{ scale: 0.97 }}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        disabled={props.disabled}
        type={props.type || "button"}
        aria-label={props["aria-label"]}
        aria-expanded={props["aria-expanded"]}
        aria-controls={props["aria-controls"]}
      >
        {buttonContent}
      </motion.button>
    </Magnetic>
  );
}
