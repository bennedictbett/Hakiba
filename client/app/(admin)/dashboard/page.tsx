"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  staffLogin,
  listApplications,
  getStaffToken,
  clearStaffToken,
  ApiError,
  AdminApplication,
} from "@/lib/api";

function formatKES(amount: string): string {
  return new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(Number(amount));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_STYLES: Record<string, string> = {
  submitted: "bg-marigold/20 text-marigold-dark",
  under_review: "bg-savanna/10 text-savanna",
  approved: "bg-savanna text-paper",
  rejected: "bg-clay/10 text-clay",
  sent_to_servicing: "bg-mist text-ink/70",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-2.5 py-1 font-mono text-xs ${STATUS_STYLES[status] || "bg-mist text-ink/70"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await staffLogin(email, password);
      onSuccess();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <span className="mb-8 block font-display text-xl font-bold text-savanna">Hakiba Staff</span>
        <h1 className="mb-6 font-display text-2xl font-semibold text-ink">Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block font-body text-sm text-ink/70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-mist bg-white px-4 py-3 font-body text-ink focus:border-savanna"
            />
          </div>
          <div>
            <label className="mb-2 block font-body text-sm text-ink/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-mist bg-white px-4 py-3 font-body text-ink focus:border-savanna"
            />
          </div>

          {error && (
            <p className="rounded-md bg-clay/10 px-3 py-2 font-body text-sm text-clay">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-savanna py-3 font-display text-sm font-semibold text-paper transition-colors hover:bg-savanna-dark disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listApplications()
      .then(setApplications)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load applications."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-display text-xl font-bold text-savanna">Hakiba Staff</span>
        <button
          onClick={onLogout}
          className="font-body text-sm text-ink/50 underline underline-offset-2 hover:text-ink"
        >
          Log out
        </button>
      </div>

      <h1 className="mb-1 font-display text-2xl font-semibold text-ink">Applications</h1>
      <p className="mb-8 font-body text-sm text-ink/60">
        {applications.length} application{applications.length !== 1 ? "s" : ""} on record
      </p>

      {isLoading && <p className="font-body text-sm text-ink/50">Loading...</p>}
      {error && <p className="rounded-md bg-clay/10 px-3 py-2 font-body text-sm text-clay">{error}</p>}

      {!isLoading && !error && applications.length === 0 && (
        <p className="font-body text-sm text-ink/50">No applications yet.</p>
      )}

      {!isLoading && applications.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-mist">
          <table className="w-full">
            <thead>
              <tr className="border-b border-mist bg-white/50 text-left">
                <th className="px-4 py-3 font-body text-xs font-medium uppercase tracking-wide text-ink/50">Reference</th>
                <th className="px-4 py-3 font-body text-xs font-medium uppercase tracking-wide text-ink/50">Product</th>
                <th className="px-4 py-3 font-body text-xs font-medium uppercase tracking-wide text-ink/50">Amount</th>
                <th className="px-4 py-3 font-body text-xs font-medium uppercase tracking-wide text-ink/50">Status</th>
                <th className="px-4 py-3 font-body text-xs font-medium uppercase tracking-wide text-ink/50">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-mist last:border-0 hover:bg-white/40">
                  <td className="px-4 py-3 font-mono text-sm text-savanna">{app.reference_number}</td>
                  <td className="px-4 py-3 font-body text-sm text-ink">{app.loan_product}</td>
                  <td className="px-4 py-3 font-mono text-sm text-ink">KES {formatKES(app.amount_requested)}</td>
                  <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-4 py-3 font-body text-sm text-ink/60">{formatDate(app.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default function AdminDashboardPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setIsAuthed(!!getStaffToken());
    setChecked(true);
  }, []);

  function handleLogout() {
    clearStaffToken();
    setIsAuthed(false);
  }

  if (!checked) return null;

  return isAuthed ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <LoginForm onSuccess={() => setIsAuthed(true)} />
  );
}