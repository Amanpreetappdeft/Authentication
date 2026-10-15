"use client";

import { ShieldCheck, Fingerprint, Lock, Zap, CheckCircle2, Globe, Sparkles } from "lucide-react";

export default function BrandShowcase() {
  return (
    <div className="relative flex flex-col justify-between h-full p-8 lg:p-12 xl:p-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-600/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-80 h-80 bg-cyan-500/20 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-violet-500/15 dark:bg-violet-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/25">
          <div className="flex items-center justify-center w-full h-full bg-zinc-950 rounded-2xl">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-xl text-zinc-900 dark:text-white">
              Nexus
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              v2.4
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Identity & Cloud Security
          </p>
        </div>
      </div>

      {/* Centerpiece Hero & Floating Dynamic Cards */}
      <div className="relative z-10 my-auto py-10">
        <div className="max-w-lg mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 backdrop-blur-md text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-6 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="h-2 w-2 rounded-full bg-emerald-500 -ml-4" />
            <span>Hardware-level Zero-Trust Architecture</span>
          </div>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            Secure access for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">
              high-velocity teams
            </span>
            .
          </h1>

          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Eliminate passwords, resist phishing threats, and unify SSO credentials with enterprise hardware telemetry.
          </p>
        </div>

        {/* Floating Glassmorphic Cards Stack */}
        <div className="relative space-y-4 max-w-md">
          {/* Card 1: Passkey & Hardware Security */}
          <div className="animate-float-slow p-4 rounded-2xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl shadow-xl shadow-indigo-950/5 dark:shadow-black/40 transition-transform hover:scale-[1.02] duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    FIDO2 WebAuthn Ready
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Touch ID • Face ID • YubiKey
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </div>

          {/* Card 2: Security & Encryption Telemetry */}
          <div className="animate-float-reverse p-4 rounded-2xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl shadow-xl shadow-indigo-950/5 dark:shadow-black/40 transition-transform hover:scale-[1.02] duration-300">
            <div className="grid grid-cols-3 gap-3 divide-x divide-zinc-200 dark:divide-zinc-800 text-center">
              <div className="px-1">
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Encryption
                </p>
                <div className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <Lock className="w-3 h-3 text-indigo-500" />
                  AES-256
                </div>
              </div>
              <div className="px-1">
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Auth Latency
                </p>
                <div className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-3 h-3" />
                  9.2 ms
                </div>
              </div>
              <div className="px-1">
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Compliance
                </p>
                <div className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <ShieldCheck className="w-3 h-3 text-cyan-500" />
                  SOC-2 / ISO
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-4 rounded-2xl border border-white/40 dark:border-white/5 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md">
            <p className="text-xs text-zinc-600 dark:text-zinc-300 italic">
              “Nexus streamlined our workforce login security across 38 global hubs while dropping auth friction to zero.”
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                SC
              </div>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Sarah Chen
              </span>
              <span className="text-xs text-zinc-400">
                • Head of SecOps, HyperGrid
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Trust Ticker */}
      {/* <div className="relative z-10 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-zinc-400" />
          Securing 40,000+ teams and developer platforms
        </p>
        <div className="flex items-center gap-6 text-zinc-400 dark:text-zinc-500 text-xs font-semibold tracking-wider uppercase opacity-80">
          <span>Acme Inc</span>
          <span>Vercel</span>
          <span>Linear</span>
          <span>Stripe</span>
          <span>Raycast</span>
        </div>
      </div> */}
    </div>
  );
}
