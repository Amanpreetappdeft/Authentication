"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  User,
  Lock,
  Key,
  Users,
  Activity,
  ArrowRight,
} from "lucide-react";

const DEFAULT_USER = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  lastLogin: "Just now",
};

const subscribeStorage = (callback) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getClientSnapshot = () => {
  try {
    return localStorage.getItem("nexus_user");
  } catch {
    return null;
  }
};

const getServerSnapshot = () => null;

export default function WelcomePage() {
  const router = useRouter();
  const rawUser = useSyncExternalStore(subscribeStorage, getClientSnapshot, getServerSnapshot);

  const user = (() => {
    if (!rawUser) return DEFAULT_USER;
    try {
      return { ...DEFAULT_USER, ...JSON.parse(rawUser) };
    } catch {
      return DEFAULT_USER;
    }
  })();

  const handleSignOut = () => {
    try {
      localStorage.removeItem("nexus_user");
    } catch {
      // ignore
    }
    router.push("/login");
  };

  const getInitials = (name) => {
    if (!name) return "US";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#070b14] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">
      {/* Background ambient pattern */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-50 dark:opacity-25" />

      {/* Ambient background blur spheres */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-md shadow-indigo-500/25">
              <div className="flex items-center justify-center w-full h-full bg-zinc-950 rounded-xl">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </div>
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg text-zinc-900 dark:text-white">
                Nexus Identity
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                Active Session
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* User Profile Pill */}
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-[11px] font-bold text-white shadow-xs">
                {getInitials(user.name)}
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
                  {user.name}
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight mt-0.5 truncate max-w-[130px]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 border border-zinc-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900/50 bg-white/80 dark:bg-zinc-900/80 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer shadow-xs"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Welcome Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-8 sm:p-10 shadow-xl shadow-indigo-950/5 dark:shadow-black/40 backdrop-blur-2xl mb-8">
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authentication Successful • Live Session</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">
                  {user.name}
                </span>
                !
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                You are securely connected to the Nexus Identity Enterprise Platform. Your credentials and zero-trust policies are verified and active.
              </p>
            </div>

            {/* Quick Status Pill Stack */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Zero-Trust Shield</p>
                  <p className="text-[11px] text-zinc-400">AES-256 GCM Enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs">
                <Activity className="w-4 h-4 text-emerald-500" />
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Session Latency</p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">9.2 ms (Optimal)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature & Quick Actions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1: Identity & Profile */}
          <div className="group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 p-6 backdrop-blur-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
              Identity Profile
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Manage your personal credentials, multi-tenant roles, and single sign-on preferences.
            </p>
          </div>

          {/* Card 2: Security & Passkeys */}
          <div className="group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 p-6 backdrop-blur-xl hover:border-purple-500/40 dark:hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-100 dark:border-purple-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Configure <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
              Security & Passkeys
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Configure WebAuthn biometric keys, YubiKeys, and hardware 2-factor authentication.
            </p>
          </div>

          {/* Card 3: API & Token Vault */}
          <div className="group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 p-6 backdrop-blur-xl hover:border-cyan-500/40 dark:hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-100 dark:border-cyan-500/20">
                <Key className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Generate <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
              API & Secrets Vault
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Create scoped OAuth access tokens and cryptographic signing keys for your services.
            </p>
          </div>

          {/* Card 4: Team Workspaces */}
          <div className="group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 p-6 backdrop-blur-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Manage <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
              Team Workspaces
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Invite team members, assign fine-grained RBAC roles, and inspect group policies.
            </p>
          </div>
        </div>

        {/* Account Details & Session Info */}
        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/50 p-6 backdrop-blur-md">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
            Session Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
              <p className="text-zinc-400">Authenticated Email</p>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200 mt-1">{user.email}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
              <p className="text-zinc-400">Security Protocol</p>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200 mt-1">FIDO2 / WebAuthn Level 3</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
              <p className="text-zinc-400">Session Status</p>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-1">Active & Validated</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-200/80 dark:border-zinc-800/80 py-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
        <p>© 2026 Nexus Identity Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
