"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { requestOtp, ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await requestOtp(phone);
      router.push(`/verify?phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 block font-display text-xl font-bold text-savanna">
          Hakiba
        </a>

        <h1 className="mb-2 font-display text-2xl font-semibold text-ink">Log in</h1>
        <p className="mb-8 font-body text-sm text-ink/60">
          Enter your phone number and we&apos;ll send you a one-time code.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="phone" className="mb-2 block font-body text-sm text-ink/70">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="0712 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mb-4 w-full rounded-md border border-mist bg-white px-4 py-3 font-body text-ink placeholder:text-ink/30 focus:border-savanna"
          />

          {error && (
            <p className="mb-4 rounded-md bg-clay/10 px-3 py-2 font-body text-sm text-clay">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-savanna py-3 font-display text-sm font-semibold text-paper transition-colors hover:bg-savanna-dark disabled:opacity-50"
          >
            {isLoading ? "Sending code..." : "Send code"}
          </button>
        </form>

        <p className="mt-6 font-body text-xs text-ink/40">
          By continuing, you agree to Hakiba&apos;s{" "}
          <a href="/terms" className="underline">Terms</a> and{" "}
          <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}