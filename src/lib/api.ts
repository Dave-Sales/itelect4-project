import { useAuthStore } from "../stores/auth";
import type { Claim, Item, User } from "../types/index";

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000/api";

export type ClaimInput = {
  itemId: number;
  claimedByUserId: number;
  notes?: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string | number;
    name: string;
    email: string;
    role: string;
  };
};

function normalizeNumericId(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }

    const digits = value.replace(/\D+/g, "");
    if (digits) {
      return Number(digits.slice(-9)) || fallback;
    }
  }

  return fallback;
}

async function fetchJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = useAuthStore.getState().token;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function loginUser(credentials: { email: string; password: string }): Promise<AuthResponse> {
  return fetchJson<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function registerUser(credentials: {
  name: string;
  email: string;
  password: string;
  role?: "student" | "security_admin";
}): Promise<AuthResponse> {
  return fetchJson<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function fetchUsers(): Promise<User[]> {
  const users = await fetchJson<Array<User & { _id?: string }>>("/users");
  return users.map((user) => ({
    ...user,
    id: normalizeNumericId(user.id ?? user._id, 0),
    isActive: user.isActive ?? true,
  }));
}

export async function fetchItems(): Promise<Item[]> {
  const items = await fetchJson<Array<Item & { _id?: string }>>("/items");
  return items.map((item) => ({
    ...item,
    id: normalizeNumericId(item.id ?? item._id, 0),
    isResolved: Boolean(item.isResolved),
  }));
}

export async function fetchClaims(): Promise<Claim[]> {
  const claims = await fetchJson<Array<Claim & { _id?: string }>>("/claims");
  return claims.map((claim) => ({
    ...claim,
    id: normalizeNumericId(claim.id ?? claim._id, 0),
    itemId: normalizeNumericId(claim.itemId, 0),
    claimedByUserId: normalizeNumericId(claim.claimedByUserId, 0),
    claimedAt: new Date(claim.claimedAt),
  }));
}

export async function createClaim(input: ClaimInput): Promise<Claim> {
  const payload = {
    ...input,
    claimedAt: new Date().toISOString(),
  };

  const claim = await fetchJson<Claim & { _id?: string }>("/claims", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    ...claim,
    id: normalizeNumericId(claim.id ?? claim._id, 0),
    itemId: normalizeNumericId(claim.itemId, 0),
    claimedByUserId: normalizeNumericId(claim.claimedByUserId, 0),
    claimedAt: new Date(claim.claimedAt),
  };
}
