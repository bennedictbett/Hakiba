const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}, authToken?: string | null): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body.detail || `Request failed (${response.status})`;
    throw new ApiError(typeof message === "string" ? message : "Request failed", response.status);
  }

  return response.json();
}

// ---- Token storage ----
// Applicant and staff tokens are kept under separate keys since they're
// structurally different JWTs (different roles) and should never be confused.

const TOKEN_KEY = "hakiba_token";
const STAFF_TOKEN_KEY = "hakiba_staff_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getStaffToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STAFF_TOKEN_KEY);
}
export function setStaffToken(token: string): void {
  localStorage.setItem(STAFF_TOKEN_KEY, token);
}
export function clearStaffToken(): void {
  localStorage.removeItem(STAFF_TOKEN_KEY);
}

// ---- Applicant auth ----

export function requestOtp(phoneNumber: string): Promise<{ message: string }> {
  return apiFetch("/auth/otp/request", {
    method: "POST",
    body: JSON.stringify({ phone_number: phoneNumber }),
  });
}

export async function verifyOtp(phoneNumber: string, code: string): Promise<string> {
  const data = await apiFetch<{ access_token: string; token_type: string }>("/auth/otp/verify", {
    method: "POST",
    body: JSON.stringify({ phone_number: phoneNumber, code }),
  });
  setToken(data.access_token);
  return data.access_token;
}

// ---- Applications (applicant-facing) ----

interface ApplicationPayload {
  applicant: {
    full_name: string;
    email?: string;
    national_id_number: string;
  };
  loan_product: string;
  amount_requested: number;
  purpose?: string;
  data_consent_given: boolean;
  terms_accepted: boolean;
}

export function submitApplication(payload: ApplicationPayload) {
  return apiFetch<{ reference_number: string; status: string; message: string }>(
    "/applications",
    { method: "POST", body: JSON.stringify(payload) },
    getToken()
  );
}

// ---- Staff / admin ----

export interface StaffLoginResponse {
  access_token: string;
  token_type: string;
  full_name: string;
  role: string;
}

export async function staffLogin(email: string, password: string): Promise<StaffLoginResponse> {
  const data = await apiFetch<StaffLoginResponse>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setStaffToken(data.access_token);
  return data;
}

export interface AdminApplication {
  id: string;
  reference_number: string;
  loan_product: string;
  amount_requested: string;
  status: string;
  created_at: string;
}

export function listApplications(): Promise<AdminApplication[]> {
  return apiFetch<AdminApplication[]>("/admin/applications", { method: "GET" }, getStaffToken());
}