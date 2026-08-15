"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { getToken, submitApplication, ApiError } from "@/lib/api";

const LOAN_PRODUCTS = ["Quick Cash", "Business Boost", "School Fees Advance"];

export default function ApplyPage() {
  const router = useRouter();
  const isSubmittingRef = useRef(false);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ reference_number: string } | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [loanProduct, setLoanProduct] = useState(LOAN_PRODUCTS[0]);
  const [amount, setAmount] = useState("5000");
  const [purpose, setPurpose] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      return;
    }
    setCheckingAuth(false);
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    setError(null);
    setIsLoading(true);

    try {
      const response = await submitApplication({
        applicant: {
          full_name: fullName,
          email: email || undefined,
          national_id_number: nationalId,
        },
        loan_product: loanProduct,
        amount_requested: Number(amount),
        purpose: purpose || undefined,
        data_consent_given: consentGiven,
        terms_accepted: termsAccepted,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong submitting your application.");
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  }

  if (checkingAuth) {
    return null;
  }

  if (result) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 font-mono text-4xl font-semibold text-savanna">{result.reference_number}</div>
          <h1 className="mb-3 font-display text-2xl font-semibold text-ink">Application received</h1>
          <p className="font-body text-ink/60">
            We&apos;ll review your application and get back to you shortly. Keep your reference number handy.
          </p>
          
            href="/"
            className="mt-8 inline-block rounded-md border border-savanna px-6 py-3 font-display text-sm font-semibold text-savanna transition-colors hover:bg-savanna hover:text-paper"
          >
            Back to home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <a href="/" className="mb-8 block font-display text-xl font-bold text-savanna">
        Hakiba
      </a>

      <h1 className="mb-2 font-display text-2xl font-semibold text-ink">Apply for a loan</h1>
      <p className="mb-8 font-body text-sm text-ink/60">
        Takes about two minutes. You&apos;ll get a reference number as soon as you submit.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-savanna">
            About you
          </h2>
          <div className="space-y-4">
            <Field label="Full name" required>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputClass}
              />
            </Field>
            <Field label="National ID number" required>
              <input
                type="text"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                required
                minLength={6}
                className={inputClass}
              />
            </Field>
            <Field label="Email (optional)">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-savanna">
            Loan details
          </h2>
          <div className="space-y-4">
            <Field label="Loan product" required>
              <select
                value={loanProduct}
                onChange={(e) => setLoanProduct(e.target.value)}
                className={inputClass}
              >
                {LOAN_PRODUCTS.map((product) => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </Field>
            <Field label="Amount requested (KES)" required>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={1000}
                max={50000}
                step={500}
                className={`${inputClass} font-mono`}
              />
            </Field>
            <Field label="What's this loan for? (optional)">
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        <div className="space-y-3 rounded-md border border-mist bg-white/50 p-4">
          <Checkbox
            checked={consentGiven}
            onChange={setConsentGiven}
            label="I consent to Hakiba processing my personal data to assess this application, in line with the Data Protection Act."
          />
          <Checkbox
            checked={termsAccepted}
            onChange={setTermsAccepted}
            label={
              <>
                I accept Hakiba&apos;s{" "}
                <a href="/terms" className="underline">Terms</a> and understand the facilitation fee is deducted from my disbursement.
              </>
            }
          />
        </div>

        {error && (
          <p className="rounded-md bg-clay/10 px-3 py-2 font-body text-sm text-clay">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !consentGiven || !termsAccepted}
          className="w-full rounded-md bg-marigold py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-marigold-dark disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit application"}
        </button>
      </form>
    </main>
  );
}

const inputClass =
  "w-full rounded-md border border-mist bg-white px-4 py-3 font-body text-ink placeholder:text-ink/30 focus:border-savanna";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block font-body text-sm text-ink/70">
        {label} {required && <span className="text-clay">*</span>}
      </label>
      {children}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-savanna"
      />
      <span className="font-body text-sm text-ink/70">{label}</span>
    </label>
  );
}