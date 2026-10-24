import { useAuthStore } from "../stores/auth";
import type { AiReview, Category, Claim, Item, User, UserRole } from "../types";

const API_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:4000"
).replace(/\/+$/, "");

type AuthResponse = {
  token: string;
  user: Pick<User, "id" | "name" | "email" | "role">;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type ClaimInput = {
  itemId: string;
  claimedByUserId: string;
  notes?: string;
};

type ClaimResponse = Omit<Claim, "claimedAt"> & {
  claimedAt: string | Date;
};

async function request<T>(
  path: string,
  options: RequestInit = {},
  authenticated = false
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (authenticated) {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("Log in before making this request.");
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = (await response.json()) as { message?: string };
    throw new Error(body.message ?? `Request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function registerUser(credentials: RegisterInput): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function fetchCategories(): Promise<Category[]> {
  return request<Category[]>("/categories");
}

export function fetchUsers(): Promise<User[]> {
  return request<User[]>("/users", {}, true);
}

export function fetchItems(): Promise<Item[]> {
  return request<Item[]>("/items", {}, true);
}

export async function fetchClaims(): Promise<Claim[]> {
  const claims = await request<ClaimResponse[]>("/claims", {}, true);
  return claims.map((claim) => ({
    ...claim,
    claimedAt: new Date(claim.claimedAt),
  }));
}

export async function createClaim(input: ClaimInput): Promise<Claim> {
  const claim = await request<ClaimResponse>(
    "/claims",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    true
  );

  return { ...claim, claimedAt: new Date(claim.claimedAt) };
}

export function askAi(prompt: string): Promise<AiReview> {
  return request<AiReview>(
    "/ai",
    {
      method: "POST",
      body: JSON.stringify({ prompt }),
    },
    true
  );
}

export type { AuthResponse, UserRole };
