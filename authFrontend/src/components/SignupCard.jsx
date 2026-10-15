"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/app/lib/api";
import SocialButtons from "./SocialButtons";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Check, Loader2, AlertCircle } from "lucide-react";

export default function SignupCard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");

  if (password.length < 8) {
    setErrorMessage("Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    setErrorMessage("Passwords do not match. Please verify and try again.");
    return;
  }

  if (!agreeTerms) {
    setErrorMessage(
      "Please accept the Terms of Service and Privacy Policy to continue."
    );
    return;
  }

  setIsSubmitting(true);
  setSubmittedSuccess(false);

  try {
    const response = await fetch(
      `${API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Signup failed. Please try again.");
    }

    setSubmittedSuccess(true);

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    setErrorMessage(
      error.message || "Unable to create your account. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Mobile-Only Brand Header */}
      <div className="lg:hidden flex flex-col items-center text-center mb-8">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/25 mb-3">
          <div className="flex items-center justify-center w-full h-full bg-zinc-950 rounded-2xl">
            <Sparkles className="w-6 h-6 text-indigo-300" />
          </div>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Nexus Identity
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Secure, effortless authentication
        </p>
      </div>

      {/* Main Form Card */}
      <div className="relative rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/90 p-7 sm:p-9 shadow-2xl shadow-indigo-950/10 dark:shadow-black/60 backdrop-blur-2xl">
        {/* Subtle Top Gradient Accent */}
        <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

        {/* Card Header */}
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Create an account
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Start your 30-day free trial. No credit card required.
          </p>
        </div>

        {/* Google Authentication Button */}
        <SocialButtons text="Sign up with Google" />

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-900 px-3 text-zinc-400 font-semibold tracking-wider">
              or sign up with email
            </span>
          </div>
        </div>

        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sign up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="name-input"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
            >
              Full name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
                <User className="w-4 h-4" />
              </div>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="signup-email-input"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
            >
              Email address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="signup-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="signup-password-input"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
            >
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="signup-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirm-password-input"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
            >
              Confirm password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="confirm-password-input"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 cursor-pointer"
              />
              <span className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I agree to the{" "}
                <a
                  href="#terms"
                  onClick={(e) => e.preventDefault()}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  onClick={(e) => e.preventDefault()}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] shadow-lg shadow-indigo-600/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 cursor-pointer overflow-hidden disabled:opacity-80"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : submittedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Account created successfully!</span>
              </>
            ) : (
              <>
                <span>Create account</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Card Footer: Sign in prompt */}
        <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
          <span>Already have an account? </span>
          <Link
            href="/login"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Auxiliary Footer Links */}
      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            Terms of Service
          </a>
          <span>•</span>
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            Privacy Policy
          </a>
        </div>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
          © 2026 Nexus Identity. All rights reserved.
        </p>
      </div>
    </div>
  );
}
