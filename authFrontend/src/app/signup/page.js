"use client";


import BrandShowcase from "@/components/BrandShowcase";
import SignupCard from "@/components/SignupCard";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#070b14] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">
      {/* Background ambient pattern */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-50 dark:opacity-25" />

      {/* Ambient background blur spheres for mobile & desktop */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container: Split-screen desktop, single-column responsive mobile */}
      <main className="relative flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto items-stretch justify-center min-h-screen">
        {/* Left Side: Brand & Visual Showcase (Desktop & Ultrawide) */}
        <section className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative border-r border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-indigo-50/40 via-transparent to-transparent dark:from-indigo-950/20 dark:via-transparent dark:to-transparent">
          <BrandShowcase />
        </section>

        {/* Right Side: Authentication Hub (Fluid responsive across all screens) */}
        <section className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-12 xl:p-16 relative z-10 my-auto py-16 sm:py-20 lg:py-12">
          <SignupCard />
        </section>
      </main>
    </div>
  );
}
