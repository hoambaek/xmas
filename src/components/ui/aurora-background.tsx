"use client";

import { HTMLAttributes } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  showRadialGradient?: boolean;
  containerClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function AuroraBackground({
  className,
  containerClassName,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050816]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25)_0%,_transparent_60%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.3)_0%,_transparent_55%)]",
          showRadialGradient && "[mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
        )}
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0.25 }}
        animate={{
          opacity: [0.25, 0.4, 0.25],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-[-30%] bg-[radial-gradient(circle_at_25%_20%,_rgba(99,102,241,0.45),_transparent_55%),radial-gradient(circle_at_80%_30%,_rgba(14,165,233,0.35),_transparent_60%),radial-gradient(circle_at_50%_80%,_rgba(236,72,153,0.35),_transparent_65%)] blur-3xl"
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0.18, rotate: 0 }}
        animate={{ opacity: [0.18, 0.32, 0.18], rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(59,130,246,0.35),_rgba(236,72,153,0.25),_rgba(56,189,248,0.35),_rgba(59,130,246,0.35))] blur-[120px]"
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0.12, scale: 1 }}
        animate={{ opacity: [0.12, 0.28, 0.12], scale: [1, 1.04, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,_rgba(236,72,153,0.2),_transparent_55%),radial-gradient(circle_at_75%_75%,_rgba(139,92,246,0.25),_transparent_60%)]"
      />

      <div className={cn("relative z-10 w-full", containerClassName)}>{children}</div>
    </div>
  );
}

