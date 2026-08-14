"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp, requestOtp, ApiError } from "@/lib/api";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await verifyOtp(phone, code);
      router.push("/apply");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    setResendMessage(null);
    try {
      await requestOtp(phone);
      setResendMessage("A new code has been sent.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't resend the code. Try again shortly.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 block font-display text-xl font-bold text-savanna">
          Hakiba
        </a>

        <h1 className="mb-2 font-display text-2xl font-semibold text-ink">Enter your code</h1>
        <p className="mb-8 font-body text-sm text-ink/60">
          We sent a 6-digit code to <span className="font-medium text-ink">{phone || "your phone"}</span>.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="code" className="mb-2 block font-body text-sm text-ink/70">
            Verification code
          </label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            autoFocus
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            required
            className="mb-4 w-full rounded-md border border-mist bg-white px-4 py-3 text-center font-mono text-2xl tracking-[0.5em] text-ink placeholder:text-ink/20 focus:border-savanna"
          />

          {error && (
            <p className="mb-4 rounded-md bg-clay/10 px-3 py-2 font-body text-sm text-clay">{error}</p>
          )}
          {resendMessage && (
            <p className="mb-4 rounded-md bg-savanna/10 px-3 py-2 font-body text-sm text-savanna">{resendMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full rounded-md bg-savanna py-3 font-display text-sm font-semibold text-paper transition-colors hover:bg-savanna-dark disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify and continue"}
          </button>
        </form>

        <button
          onClick={handleResend}
          className="mt-6 font-body text-sm text-savanna underline underline-offset-2"
        >
          Didn&apos;t get a code? Resend
        </button>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyForm />
    </Suspense>
  );
}