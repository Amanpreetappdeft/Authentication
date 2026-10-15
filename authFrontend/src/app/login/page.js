"use client";

import BrandShowcase from "@/components/BrandShowcase";
import AuthCard from "@/components/AuthCard";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#070b14] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">
      {/* Background ambient pattern */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-50 dark:opacity-25" />

      {/* Ambient background blur spheres for mobile & desktop */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top right floating theme switcher & system status */}
      {/* <header className="absolute top-4 right-4 sm:top-6 sm:right-8 z-50 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md text-zinc-600 dark:text-zinc-400 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All systems operational</span>
        </div>
        <ThemeToggle />
      </header> */}

      {/* Main Container: Split-screen desktop, single-column responsive mobile */}
      <main className="relative flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto items-stretch justify-center min-h-screen">
        {/* Left Side: Brand & Visual Showcase (Desktop & Ultrawide) */}
        <section className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative border-r border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-indigo-50/40 via-transparent to-transparent dark:from-indigo-950/20 dark:via-transparent dark:to-transparent">
          <BrandShowcase />
        </section>

        {/* Right Side: Authentication Hub (Fluid responsive across all screens) */}
        <section className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-12 xl:p-16 relative z-10 my-auto py-16 sm:py-20 lg:py-12">
          <AuthCard />
        </section>
      </main>
    </div>
  );
}
